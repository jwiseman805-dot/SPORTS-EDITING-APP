import { Suspense } from "react";
import ExplorePage from "@/components/ExplorePage";

export default function Explore() {
  return (
    <Suspense fallback={<div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>Loading…</div>}>
      <ExplorePage />
    </Suspense>
  );
}
