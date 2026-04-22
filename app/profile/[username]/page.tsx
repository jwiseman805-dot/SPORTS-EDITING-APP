import { notFound } from "next/navigation";
import Link from "next/link";
import { getUserByUsername, getVideosByUser, getUserById, formatNumber } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const user = getUserByUsername(username);
  if (!user) notFound();

  const videos = getVideosByUser(user.id);
  const totalLikes = videos.reduce((acc, v) => acc + v.likes, 0);

  const sportColors: Record<string, string> = {
    football: "#00ff87",
    basketball: "#ff8c00",
    soccer: "#00e5ff",
    hockey: "#60c0f0",
    mma: "#ff3b5c",
    motorsport: "#c0c0c0",
  };
  const accentColor = sportColors[user.sport] ?? "var(--accent)";

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Profile Header */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {/* Banner */}
        <div
          className="h-40 relative"
          style={{
            background: `linear-gradient(135deg, ${accentColor}33, #0a0a0f)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, ${accentColor} 0, ${accentColor} 1px, transparent 0, transparent 50%)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-24 h-24 rounded-2xl border-4 object-cover"
                style={{ borderColor: "var(--bg-card)", backgroundColor: "var(--bg-secondary)" }}
              />
              {user.verified && (
                <span
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--accent)", color: "#000" }}
                >
                  ✓
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-14">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                  {user.displayName}
                </h1>
                {user.verified && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}
                  >
                    Verified Editor
                  </span>
                )}
              </div>
              <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                @{user.username}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-16">
              <button
                className="px-5 py-2 rounded-full text-sm font-semibold"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #00e5ff)`, color: "#000" }}
              >
                Follow
              </button>
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "var(--bg-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                Message
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm mb-4 max-w-lg" style={{ color: "var(--text-secondary)" }}>
            {user.bio}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            <span>📍 {user.location}</span>
            <span>📅 Joined {new Date(user.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            <span>🏷️ {user.sport.charAt(0).toUpperCase() + user.sport.slice(1)}</span>
          </div>

          {/* Software tags */}
          <div className="flex gap-2 flex-wrap">
            {user.software.map((sw) => (
              <span
                key={sw}
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              >
                {sw}
              </span>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-4 divide-x"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { label: "Edits", value: formatNumber(videos.length) },
            { label: "Followers", value: formatNumber(user.followers) },
            { label: "Following", value: formatNumber(user.following) },
            { label: "Total Views", value: formatNumber(user.totalViews) },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center py-4" style={{ borderColor: "var(--border)" }}>
              <span className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                {value}
              </span>
              <span className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          Edits
          <span className="ml-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>
            ({videos.length})
          </span>
        </h2>
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          {formatNumber(totalLikes)} total likes
        </span>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
          <p className="text-4xl mb-3">🎬</p>
          <p>No edits yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {videos.map((video) => {
            const u = getUserById(video.userId)!;
            return <VideoCard key={video.id} video={video} user={u} />;
          })}
        </div>
      )}
    </div>
  );
}
