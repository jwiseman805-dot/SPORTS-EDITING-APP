"use client";

import Link from "next/link";
import { useState } from "react";
import { Video, User } from "@/lib/types";
import { formatNumber } from "@/lib/data";

interface VideoCardProps {
  video: Video;
  user: User;
  compact?: boolean;
}

export default function VideoCard({ video, user, compact = false }: VideoCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [isHovered, setIsHovered] = useState(false);

  function toggleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  const sportColors: Record<string, string> = {
    football: "#00ff87",
    basketball: "#ff8c00",
    soccer: "#00e5ff",
    hockey: "#60c0f0",
    mma: "#ff3b5c",
    motorsport: "#c0c0c0",
    tennis: "#a8ff3e",
    baseball: "#ff5555",
    olympics: "#ffd700",
    esports: "#c678dd",
    all: "#ffffff",
  };
  const sportColor = sportColors[video.sport] ?? "#aaaaaa";

  return (
    <Link href={`/video/${video.id}`}>
      <div
        className="rounded-xl overflow-hidden cursor-pointer group"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          transition: "all 0.2s ease",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: isHovered ? `0 8px 32px rgba(0,0,0,0.4)` : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            style={{ transform: isHovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s ease" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 thumbnail-overlay" />

          {/* Duration badge */}
          <div
            className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-semibold"
            style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "var(--text-primary)" }}
          >
            {video.duration}
          </div>

          {/* Sport badge */}
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", color: sportColor, border: `1px solid ${sportColor}40` }}
          >
            {video.sport}
          </div>

          {/* Play button overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 229, 255, 0.9)", backdropFilter: "blur(4px)" }}
              >
                <svg className="w-6 h-6 ml-1" fill="#000" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex gap-2.5">
            {/* Avatar */}
            <Link
              href={`/profile/${user.username}`}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 mt-0.5"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full border"
                  style={{ borderColor: "var(--border)" }}
                />
                {user.verified && (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "var(--accent)", color: "#000", fontSize: "9px" }}
                  >
                    ✓
                  </span>
                )}
              </div>
            </Link>

            <div className="min-w-0 flex-1">
              <h3
                className="font-semibold text-sm line-clamp-2 leading-snug mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {video.title}
              </h3>

              {!compact && (
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                  {user.displayName}
                </p>
              )}

              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{formatNumber(video.views)} views</span>
                <span>•</span>
                <span>{video.software}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-4 mt-3 pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: liked ? "var(--accent-red)" : "var(--text-muted)" }}
            >
              <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {formatNumber(likeCount)}
            </button>

            {/* Comments */}
            <button
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: "var(--text-muted)" }}
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {video.comments.length}
            </button>

            {/* Share */}
            <button
              className="flex items-center gap-1.5 text-xs font-medium ml-auto"
              style={{ color: "var(--text-muted)" }}
              onClick={(e) => e.preventDefault()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {formatNumber(video.shares)}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
