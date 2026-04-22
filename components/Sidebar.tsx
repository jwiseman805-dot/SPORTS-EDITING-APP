"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { USERS } from "@/lib/data";
import SportIcon from "./SportIcon";

const NAV_ITEMS = [
  { href: "/", label: "Home Feed", icon: HomeIcon },
  { href: "/explore", label: "Explore", icon: ExploreIcon },
  { href: "/upload", label: "Post Edit", icon: UploadIcon },
  { href: "/profile/cutmaster_cole", label: "My Profile", icon: ProfileIcon },
];

const SPORT_CATEGORIES = [
  { sport: "football", label: "Football" },
  { sport: "basketball", label: "Basketball" },
  { sport: "soccer", label: "Soccer" },
  { sport: "mma", label: "MMA" },
  { sport: "motorsport", label: "Motorsport" },
  { sport: "hockey", label: "Hockey" },
];

const TRENDING_EDITORS = USERS.slice(0, 4);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full w-64 flex flex-col z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ backgroundColor: "var(--bg-secondary)", borderRight: "1px solid var(--border)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex-1 flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ background: "linear-gradient(135deg, #00e5ff, #00ff87)", color: "#000" }}
            >
              WS
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
              Wise<span style={{ color: "var(--accent)" }}>Sport</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 pt-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  backgroundColor: active ? "var(--bg-hover)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  borderLeft: active ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <Icon active={active} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 my-4" style={{ borderTop: "1px solid var(--border)" }} />

        {/* Sport Categories */}
        <div className="px-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
            Categories
          </p>
          <div className="space-y-0.5">
            {SPORT_CATEGORIES.map(({ sport, label }) => (
              <Link
                key={sport}
                href={`/?sport=${sport}`}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-hover)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                <SportIcon sport={sport} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-3 my-4" style={{ borderTop: "1px solid var(--border)" }} />

        {/* Top Editors */}
        <div className="px-4 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
            Top Editors
          </p>
          <div className="space-y-3">
            {TRENDING_EDITORS.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                onClick={onClose}
                className="flex items-center gap-3 group"
              >
                <div className="relative shrink-0">
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
                      style={{ background: "var(--accent)", color: "#000" }}
                    >
                      ✓
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold truncate group-hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user.displayName}
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                    @{user.username}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto px-4 pb-4 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 WiseSport
          </p>
        </div>
      </aside>
    </>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}
function UploadIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}
function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
