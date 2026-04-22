"use client";

import { useSearchParams } from "next/navigation";
import { VIDEOS, USERS, getFeaturedVideos, getVideosBySport, getUserById } from "@/lib/data";
import { SportCategory } from "@/lib/types";
import VideoCard from "./VideoCard";
import SportFilterBar from "./SportFilterBar";

export default function FeedPage() {
  const searchParams = useSearchParams();
  const sport = (searchParams.get("sport") ?? "all") as SportCategory;

  const videos = getVideosBySport(sport);
  const featured = getFeaturedVideos().slice(0, 1)[0];
  const featuredUser = featured ? getUserById(featured.userId) : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero — Featured Edit */}
      {sport === "all" && featured && featuredUser && (
        <div
          className="relative rounded-2xl overflow-hidden mb-8"
          style={{ aspectRatio: "21/8", minHeight: "240px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.thumbnail}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)" }} />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "var(--accent)", color: "#000" }}
                >
                  Featured Edit
                </span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {featured.software}
                </span>
              </div>

              <h1 className="text-3xl font-black mb-2 leading-tight" style={{ color: "var(--text-primary)" }}>
                {featured.title}
              </h1>

              <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {featured.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredUser.avatar} alt={featuredUser.displayName} className="w-8 h-8 rounded-full border-2" style={{ borderColor: "var(--accent)" }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{featuredUser.displayName}</span>
                  {featuredUser.verified && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "var(--accent)", color: "#000" }}>✓</span>}
                </div>

                <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span>👁 {(featured.views / 1_000_000).toFixed(1)}M</span>
                  <span>❤️ {(featured.likes / 1_000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sport Filter Bar */}
      <div className="mb-6">
        <SportFilterBar active={sport} />
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          {sport === "all" ? "Latest Edits" : `${sport.charAt(0).toUpperCase() + sport.slice(1)} Edits`}
          <span className="ml-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>
            ({videos.length})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <select
            className="text-sm px-3 py-1.5 rounded-lg outline-none"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            defaultValue="recent"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-24" style={{ color: "var(--text-muted)" }}>
          <p className="text-5xl mb-4">🎬</p>
          <p className="text-lg font-medium">No edits for this sport yet</p>
          <p className="text-sm mt-1">Be the first to post one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {videos.map((video) => {
            const user = getUserById(video.userId);
            if (!user) return null;
            return <VideoCard key={video.id} video={video} user={user} />;
          })}
        </div>
      )}

      {/* Suggested Editors */}
      {sport === "all" && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
            Top Editors to Follow
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {USERS.map((user) => (
              <a
                key={user.id}
                href={`/profile/${user.username}`}
                className="flex flex-col items-center p-4 rounded-xl text-center group"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="relative mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full border-2"
                    style={{ borderColor: "var(--border)" }}
                  />
                  {user.verified && (
                    <span
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "var(--accent)", color: "#000" }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold group-hover:underline" style={{ color: "var(--text-primary)" }}>
                  {user.displayName}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  @{user.username}
                </p>
                <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
                  {(user.followers / 1000).toFixed(1)}K followers
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
