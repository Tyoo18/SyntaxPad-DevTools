"use client";

export default function HeroSection() {
  const handleExplore = () => {
    document.getElementById("workspace")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="mb-8 lg:mb-10 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-(--color-text) leading-tight max-w-2xl mx-auto">
        Text tools that don’t waste your time.
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
  );
}
