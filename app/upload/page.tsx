"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SPORT_FILTERS } from "@/lib/data";

export default function UploadPage() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("football");
  const [software, setSoftware] = useState("Premiere Pro");
  const [tags, setTags] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFileSelected(true);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !fileSelected) return;
    setSubmitted(true);
    setTimeout(() => router.push("/"), 2000);
  }

  const softwareOptions = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro", "Avid Media Composer", "CapCut", "Vegas Pro"];
  const sports = SPORT_FILTERS.filter((s) => s.id !== "all");

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-3xl"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-green))" }}
        >
          ✓
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
          Edit Posted!
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>Redirecting to feed…</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
        Post Your Edit
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Share your sport highlight reel with the ReelSport community
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className="relative flex flex-col items-center justify-center rounded-2xl p-12 text-center cursor-pointer"
          style={{
            border: `2px dashed ${dragging ? "var(--accent)" : fileSelected ? "var(--accent-green)" : "var(--border)"}`,
            backgroundColor: dragging ? "rgba(0,229,255,0.05)" : fileSelected ? "rgba(0,255,135,0.05)" : "var(--bg-card)",
            transition: "all 0.2s",
          }}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={() => setFileSelected(true)}
          />

          {fileSelected ? (
            <>
              <div className="text-5xl mb-3">🎬</div>
              <p className="font-semibold" style={{ color: "var(--accent-green)" }}>Video file selected!</p>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Click to change file</p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">📤</div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Drop your video here</p>
              <p className="text-sm mt-1 mb-4" style={{ color: "var(--text-muted)" }}>or click to browse</p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                MP4, MOV, AVI · Max 4GB
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Title <span style={{ color: "var(--accent-red)" }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Champions League Final — Cinematic Edit 4K"
            required
            className="w-full px-4 py-3 rounded-xl outline-none text-sm"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Tell the community about this edit — tools used, time spent, techniques…"
            className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Sport & Software row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
              Sport
            </label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full px-4 py-3 rounded-xl outline-none text-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {sports.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
              Editing Software
            </label>
            <select
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              className="w-full px-4 py-3 rounded-xl outline-none text-sm"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {softwareOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="cinematic, 4K, slowmo, colorgrade (comma separated)"
            className="w-full px-4 py-3 rounded-xl outline-none text-sm"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title || !fileSelected}
            className="px-8 py-3 rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-green))",
              color: "#000",
            }}
          >
            Post Edit 🚀
          </button>
        </div>
      </form>
    </div>
  );
}
