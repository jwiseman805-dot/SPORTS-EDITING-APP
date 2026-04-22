"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use, useState } from "react";
import { VIDEOS, getUserById, getVideosBySport, formatNumber } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

interface Props {
  params: Promise<{ id: string }>;
}

export default function VideoPage({ params }: Props) {
  const { id } = use(params);
  const video = VIDEOS.find((v) => v.id === id);
  if (!video) notFound();

  const user = getUserById(video.userId)!;
  const related = getVideosBySport(video.sport)
    .filter((v) => v.id !== video.id)
    .slice(0, 4);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(video.comments);

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments((prev) => [
      {
        id: `new-${Date.now()}`,
        userId: "u1",
        username: "cutmaster_cole",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cole",
        text: comment.trim(),
        likes: 0,
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setComment("");
  }

  const sportColors: Record<string, string> = {
    football: "#00ff87",
    basketball: "#ff8c00",
    soccer: "#00e5ff",
    hockey: "#60c0f0",
    mma: "#ff3b5c",
    motorsport: "#c0c0c0",
  };
  const sportColor = sportColors[video.sport] ?? "var(--accent)";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex gap-8 flex-col xl:flex-row">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Video player area */}
          <div
            className="relative rounded-2xl overflow-hidden mb-5"
            style={{ aspectRatio: "16/9", backgroundColor: "#000" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(0, 229, 255, 0.9)", backdropFilter: "blur(4px)" }}
              >
                <svg className="w-8 h-8 ml-1.5" fill="#000" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-sm font-semibold" style={{ backgroundColor: "rgba(0,0,0,0.8)", color: "var(--text-primary)" }}>
              {video.duration}
            </div>
          </div>

          {/* Title & meta */}
          <h1 className="text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
            {video.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
              <span>{formatNumber(video.views)} views</span>
              <span>•</span>
              <span>{new Date(video.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>•</span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold uppercase"
                style={{ color: sportColor, border: `1px solid ${sportColor}40`, backgroundColor: `${sportColor}10` }}
              >
                {video.sport}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setLiked(!liked); setLikeCount(liked ? likeCount - 1 : likeCount + 1); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: liked ? "rgba(255,59,92,0.15)" : "var(--bg-card)",
                  border: `1px solid ${liked ? "var(--accent-red)" : "var(--border)"}`,
                  color: liked ? "var(--accent-red)" : "var(--text-secondary)",
                }}
              >
                <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {formatNumber(likeCount)}
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {formatNumber(video.shares)}
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-card)", color: "var(--accent)", border: "1px solid rgba(0,229,255,0.2)" }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Creator card */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl mb-6"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <Link href={`/profile/${user.username}`}>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.avatar} alt={user.displayName} className="w-12 h-12 rounded-full border-2" style={{ borderColor: "var(--accent)" }} />
                {user.verified && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--accent)", color: "#000", fontSize: "9px" }}>✓</span>
                )}
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/profile/${user.username}`}>
                <p className="font-semibold hover:underline" style={{ color: "var(--text-primary)" }}>{user.displayName}</p>
              </Link>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>@{user.username} · {formatNumber(user.followers)} followers</p>
            </div>
            <button
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-green))", color: "#000" }}
            >
              Follow
            </button>
          </div>

          {/* Description */}
          <div
            className="p-4 rounded-xl mb-6 text-sm"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            {video.description}
            <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
              Software: <span style={{ color: "var(--accent)" }}>{video.software}</span>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-bold mb-4 text-lg" style={{ color: "var(--text-primary)" }}>
              Comments ({comments.length})
            </h3>

            {/* Comment input */}
            <form onSubmit={submitComment} className="flex gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=cole"
                alt="You"
                className="w-9 h-9 rounded-full shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 rounded-full text-sm outline-none"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: "var(--accent)", color: "#000" }}
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comment list */}
            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatar} alt={c.username} className="w-8 h-8 rounded-full shrink-0" />
                  <div
                    className="flex-1 p-3 rounded-xl text-sm"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold" style={{ color: "var(--text-primary)" }}>@{c.username}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{c.createdAt}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)" }}>{c.text}</p>
                    <button className="flex items-center gap-1 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — Related */}
        <div className="w-full xl:w-80 shrink-0">
          <h3 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            More {video.sport.charAt(0).toUpperCase() + video.sport.slice(1)} Edits
          </h3>
          <div className="space-y-4">
            {related.map((rv) => {
              const ru = getUserById(rv.userId)!;
              return <VideoCard key={rv.id} video={rv} user={ru} compact />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
