"use client";

export default function HeroSection() {
  const handleExplore = () => {
    document.getElementById("workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative mb-8 lg:mb-10 text-center">
      {/* Grid fade overlay — tengah lebih gelap dari grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-bg) 30%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--color-text) leading-tight max-w-2xl mx-auto">
          Text tools that don't waste your time.
        </h1>
        <p className="mt-3 text-base sm:text-lg text-(--color-muted) max-w-xl mx-auto">
          Generate commits, READMEs, and .env boilerplates — instantly,
          client‑side, no sign‑up.
        </p>
        <button
          onClick={handleExplore}
          className="mt-6 px-6 py-2.5 rounded-lg bg-(--color-accent) text-white font-medium text-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
        >
          Explore Tools →
        </button>
      </div>
    </div>
  );
}
