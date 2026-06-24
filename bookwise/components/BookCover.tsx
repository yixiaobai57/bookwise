"use client";

const categoryStyles: Record<
  string,
  { bg: string; accent: string; pattern: string }
> = {
  小说: {
    bg: "from-blue-600 via-blue-700 to-indigo-800",
    accent: "rgba(255,255,255,0.15)",
    pattern: "✦",
  },
  科幻: {
    bg: "from-violet-600 via-purple-700 to-fuchsia-800",
    accent: "rgba(255,255,255,0.12)",
    pattern: "◆",
  },
  历史: {
    bg: "from-amber-600 via-orange-700 to-red-800",
    accent: "rgba(255,255,255,0.1)",
    pattern: "❖",
  },
  哲学: {
    bg: "from-emerald-600 via-teal-700 to-cyan-800",
    accent: "rgba(255,255,255,0.12)",
    pattern: "◈",
  },
  传记: {
    bg: "from-rose-600 via-pink-700 to-red-800",
    accent: "rgba(255,255,255,0.1)",
    pattern: "✧",
  },
  科普: {
    bg: "from-cyan-600 via-sky-700 to-blue-800",
    accent: "rgba(255,255,255,0.12)",
    pattern: "⬡",
  },
  教材: {
    bg: "from-slate-600 via-gray-700 to-zinc-800",
    accent: "rgba(255,255,255,0.1)",
    pattern: "▣",
  },
};

interface BookCoverProps {
  title: string;
  author: string;
  category: string;
  className?: string;
}

export function BookCover({
  title,
  author,
  category,
  className = "",
}: BookCoverProps) {
  const style = categoryStyles[category] || categoryStyles["小说"];

  return (
    <div
      className={`relative bg-gradient-to-br ${style.bg} flex flex-col items-center justify-center p-6 overflow-hidden ${className}`}
    >
      {/* Decorative pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-6xl">{style.pattern}</div>
        <div className="absolute bottom-4 right-4 text-4xl rotate-45">
          {style.pattern}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-30">
          {style.pattern}
        </div>
      </div>

      {/* Book spine effect */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="text-white/60 text-xs font-medium tracking-widest uppercase mb-3">
          {category}
        </div>
        <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-3">
          {title}
        </h3>
        <div className="w-12 h-0.5 bg-white/30 mx-auto mb-2" />
        <p className="text-white/70 text-sm">{author}</p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
