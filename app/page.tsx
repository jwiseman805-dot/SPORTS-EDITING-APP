import { Suspense } from "react";
import FeedPage from "@/components/FeedPage";

export default function Home() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedPage />
    </Suspense>
  );
}

function FeedSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="h-10 rounded-full w-full mb-6" style={{ backgroundColor: "var(--bg-card)" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--bg-card)" }}>
            <div className="aspect-video bg-gray-800 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-800 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
