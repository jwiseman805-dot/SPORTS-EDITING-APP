"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SPORT_FILTERS } from "@/lib/data";
import { SportCategory } from "@/lib/types";
import SportIcon from "./SportIcon";

interface SportFilterBarProps {
  active: SportCategory;
}

export default function SportFilterBar({ active }: SportFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function select(sport: SportCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (sport === "all") {
      params.delete("sport");
    } else {
      params.set("sport", sport);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
      {SPORT_FILTERS.map((filter) => {
        const isActive = active === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => select(filter.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shrink-0"
            style={{
              backgroundColor: isActive ? "var(--accent)" : "var(--bg-card)",
              color: isActive ? "#000" : "var(--text-secondary)",
              border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
              fontWeight: isActive ? 700 : 500,
            }}
          >
            <SportIcon sport={filter.id} size={16} />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
