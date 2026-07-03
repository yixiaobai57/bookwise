"use client";

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-pulse">
      <div className="h-52 bg-gradient-to-br from-border to-accent" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mr-3">
            <div className="h-6 bg-border rounded-lg w-3/4 mb-2" />
            <div className="h-4 bg-border rounded-lg w-1/2" />
          </div>
          <div className="w-14 h-14 bg-border rounded-full" />
        </div>

        <div className="h-4 bg-border rounded-lg w-1/3 mb-4" />

        <div className="flex items-center gap-2">
          <div className="h-6 bg-border rounded-lg w-12" />
          <div className="h-6 bg-border rounded-lg w-12" />
          <div className="h-4 bg-border rounded-lg w-16 ml-auto" />
        </div>
      </div>
    </div>
  );
}
