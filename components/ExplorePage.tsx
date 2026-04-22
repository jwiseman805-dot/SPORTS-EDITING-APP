"use client";

import { useSearchParams } from "next/navigation";
import { VIDEOS, USERS, getUserById, formatNumber, SPORT_FILTERS } from "@/lib/data";
import VideoCard from "./VideoCard";
import Link from "next/link";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const filteredVideos = query
    ? VIDEOS.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query) ||
          v.sport.toLowerCase().includes(query) ||
          v.tags.some((t) => t.toLowerCase().includes(query)) ||
          v.software.toLowerCase().includes(query)
      )
    : VIDEOS;

  const filteredUsers = query
    ? USERS.filter(
        (u) =>
          u.displayName.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.sport.toLowerCase().includes(query)
      )
    : [];

  // Top videos by views
  const trending = [...VIDEOS].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>
          {query ? `Results for "${query}"` : "Explore"}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {query ? `${filteredVideos.length} edits found` : "Discover the best sport video edits on the platform"}
        </p>
      </div>

      {/* Show matched editors if searching */}
      {query && filteredUsers.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>Editors</h2>
          <div className="flex gap-4 flex-wrap">
            {filteredUsers.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.displayName} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{user.displayName}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>@{user.username}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {query && filteredVideos.length === 0 && filteredUsers.length === 0 && (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>No results found</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Try a different search term</p>
        </div>
      )}

      {/* Trending section when no query */}
      {!query && (
        <>
          {/* Trending */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-black" style={{ color: "var(--text-primary)" }}>Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trending.map((video, i) => {
                const user = getUserById(video.userId)!;
                return (
                  <div key={video.id} className="relative">
                    <div
                      className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black"
                      style={{
                        background: i === 0 ? "linear-gradient(135deg, #FFD700, #FFA500)" : i === 1 ? "linear-gradient(135deg, #C0C0C0, #808080)" : "linear-gradient(135deg, #CD7F32, #8B4513)",
                        color: "#000",
                      }}
                    >
                      {i + 1}
                    </div>
                    <VideoCard video={video} user={user} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Browse by sport */}
          <section className="mb-10">
            <h2 className="text-xl font-black mb-5" style={{ color: "var(--text-primary)" }}>Browse by Sport</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              {SPORT_FILTERS.filter((s) => s.id !== "all").map((s) => {
                const count = VIDEOS.filter((v) => v.sport === s.id).length;
                return (
                  <Link
                    key={s.id}
                    href={`/?sport=${s.id}`}
                    className="flex flex-col items-center p-5 rounded-xl text-center group"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span className="text-4xl mb-2">{s.icon}</span>
                    <p className="font-semibold text-sm group-hover:underline" style={{ color: "var(--text-primary)" }}>{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{count} edits</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* All Editors */}
          <section className="mb-10">
            <h2 className="text-xl font-black mb-5" style={{ color: "var(--text-primary)" }}>All Editors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {USERS.map((user) => (
                <Link
                  key={user.id}
                  href={`/profile/${user.username}`}
                  className="flex items-center gap-4 p-4 rounded-xl group"
                  style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt={user.displayName} className="w-14 h-14 rounded-full border-2" style={{ borderColor: "var(--border)" }} />
                    {user.verified && (
                      <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#000", fontSize: "9px" }}>✓</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold group-hover:underline" style={{ color: "var(--text-primary)" }}>{user.displayName}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>@{user.username}</p>
                    <p className="text-xs mt-1 line-clamp-1" style={{ color: "var(--text-secondary)" }}>{user.bio}</p>
                    <div className="flex gap-3 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span>{formatNumber(user.followers)} followers</span>
                      <span>·</span>
                      <span>{formatNumber(user.totalViews)} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Videos */}
          <section>
            <h2 className="text-xl font-black mb-5" style={{ color: "var(--text-primary)" }}>All Edits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {VIDEOS.map((video) => {
                const user = getUserById(video.userId)!;
                return <VideoCard key={video.id} video={video} user={user} />;
              })}
            </div>
          </section>
        </>
      )}

      {/* Search results */}
      {query && filteredVideos.length > 0 && (
        <div>
          <h2 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            Edits ({filteredVideos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredVideos.map((video) => {
              const user = getUserById(video.userId)!;
              return <VideoCard key={video.id} video={video} user={user} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
