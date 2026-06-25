"use client";

import { useState } from "react";

const categoryStyles: Record<
  string,
  {
    bg: string;
    textGradient: string;
    pattern: string;
    spine: string;
    shine: string;
  }
> = {
  小说: {
    bg: "from-slate-900 via-blue-950 to-slate-900",
    textGradient: "from-blue-200 to-blue-400",
    pattern: "📚",
    spine: "bg-blue-900",
    shine: "from-blue-400/10 to-transparent",
  },
  科幻: {
    bg: "from-slate-900 via-purple-950 to-slate-900",
    textGradient: "from-purple-200 to-purple-400",
    pattern: "✨",
    spine: "bg-purple-900",
    shine: "from-purple-400/10 to-transparent",
  },
  历史: {
    bg: "from-amber-950 via-stone-900 to-amber-950",
    textGradient: "from-amber-200 to-amber-400",
    pattern: "🏛️",
    spine: "bg-amber-900",
    shine: "from-amber-400/10 to-transparent",
  },
  哲学: {
    bg: "from-emerald-950 via-teal-950 to-emerald-950",
    textGradient: "from-emerald-200 to-emerald-400",
    pattern: "🧠",
    spine: "bg-emerald-900",
    shine: "from-emerald-400/10 to-transparent",
  },
  传记: {
    bg: "from-rose-950 via-slate-900 to-rose-950",
    textGradient: "from-rose-200 to-rose-400",
    pattern: "👤",
    spine: "bg-rose-900",
    shine: "from-rose-400/10 to-transparent",
  },
  科普: {
    bg: "from-cyan-950 via-slate-900 to-cyan-950",
    textGradient: "from-cyan-200 to-cyan-400",
    pattern: "🔬",
    spine: "bg-cyan-900",
    shine: "from-cyan-400/10 to-transparent",
  },
  教材: {
    bg: "from-slate-800 via-zinc-900 to-slate-800",
    textGradient: "from-slate-200 to-slate-400",
    pattern: "📖",
    spine: "bg-slate-700",
    shine: "from-slate-400/10 to-transparent",
  },
};

interface BookCoverProps {
  title: string;
  author: string;
  category: string;
  coverUrl?: string | null;
  className?: string;
}

export function BookCover({
  title,
  author,
  category,
  className = "",
}: BookCoverProps) {
  const [imageError, setImageError] = useState(false);
  const style = categoryStyles[category] || categoryStyles["小说"];

  const apiCoverUrl = `/api/book-cover?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`;
  const showImage = !imageError;

  return (
    <div
      className={`relative bg-gradient-to-br ${style.bg} flex flex-col overflow-hidden ${className} shadow-lg`}
    >
      {showImage && (
        <img
          src={apiCoverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}

      {!showImage && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30" />

          <div className={`absolute left-0 top-0 bottom-0 w-2 ${style.spine} shadow-inner`} />
          <div className="absolute left-2 top-0 bottom-0 w-px bg-black/30" />

          <div className="absolute top-3 right-3 text-lg opacity-40">{style.pattern}</div>
          <div className="absolute bottom-3 left-5 text-sm opacity-20 rotate-12">{style.pattern}</div>

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-10">
            {style.pattern}
          </div>

          <div className={`absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b ${style.shine}`} />

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-6 text-center">
            <div className={`text-xs font-semibold tracking-[0.25em] uppercase mb-4 bg-gradient-to-r ${style.textGradient} bg-clip-text text-transparent`}>
              {category}
            </div>

            <div className="w-10 h-px bg-white/20 mb-4" />

            <h3
              className={`font-serif font-bold text-white leading-tight mb-4 drop-shadow-lg`}
              style={{
                fontSize: title.length > 30 ? "0.95rem" : title.length > 20 ? "1.1rem" : "1.25rem",
                lineHeight: 1.3,
              }}
            >
              {title}
            </h3>

            <div className="w-8 h-px bg-white/15 mb-3" />

            <p className="text-white/60 text-sm font-light tracking-wide">{author}</p>

            <div className="mt-auto pt-4">
              <div className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs opacity-50`}>
                {style.pattern}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        </>
      )}

      {showImage && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      )}
    </div>
  );
}
