"use client";

// [INIT]: Import React hooks, sub-components, and interface icons
import { useState, useEffect } from "react";
import StackedCards from "@/components/StackedCards";
import Workspace from "@/components/Workspace";
import HeroSection from "@/components/HeroSection";
import ThemeToggle from "@/components/ThemeToggle";
import { Terminal } from "lucide-react";

interface MainAppShellProps {
  initialToolKey: string;
  slugToKeyMap: Record<string, string>;
}

export default function MainAppShell({
  initialToolKey,
  slugToKeyMap,
}: MainAppShellProps) {
  // [STATE]: Initialize active utility state bound to hydrated server parameter
  const [activeTool, setActiveTool] = useState<string>(initialToolKey);

  // [HANDLER]: Watch active tool changes and execute zero-flicker URL state synchronization
  useEffect(() => {
    // [UTIL]: Find the correct URL slug matching the current active state string value
    const currentSlug = Object.keys(slugToKeyMap).find(
      (slug) => slugToKeyMap[slug] === activeTool,
    );

    // [VALIDATE]: Calculate next path target or fall back to base layout path index
    const newPath = currentSlug ? `/${currentSlug}` : "/";

    // [UTIL]: Debug log to easily track down mismatches in developer console
    console.log(
      "🛠️ NEXT PATH TRACKER -> State:",
      activeTool,
      "| Resolved URL Path:",
      newPath,
    );

    // [HANDLER]: Inject updated route identifier silently into browser location address bar
    if (window.location.pathname !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
  }, [activeTool, slugToKeyMap]);

  return (
    <div className="relative w-screen min-h-screen bg-(--color-bg) text-text font-sans flex flex-col">
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* ─── HEADER ─── */}
      <header className="relative z-50 w-full border-b border-border px-6 md:px-10 bg-(--color-bg) lg:fixed lg:top-0 lg:left-0 lg:right-0 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 stroke-[2.5] text-accent" />
            <span className="text-lg font-bold tracking-[0.12em] uppercase text-text">
              Syntax<span className="text-accent">Pad_</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ─── MAIN ─── */}
      <main className="relative z-10 flex-1 flex flex-col lg:pt-14">
        <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center px-6 lg:pt-14">
          <HeroSection />
        </section>

        <section
          id="workspace"
          className="min-h-screen px-6 md:px-10 py-20 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-center">
              <div className="flex justify-center items-center h-full">
                <StackedCards
                  activeTool={activeTool}
                  onSelectTool={setActiveTool}
                />
              </div>
              <div className="h-full w-full">
                <Workspace activeTool={activeTool} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-50 w-full border-t border-border px-6 md:px-10 bg-(--color-bg) lg:fixed lg:bottom-0 lg:left-0 lg:right-0 h-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted text-center sm:text-left max-w-xl">
            SyntaxPad is free and always will be. If it saved you time today,
            consider buying me a coffee☕
          </p>
          <a
            href="https://ko-fi.com/tyoshere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-elevated hover:bg-accent hover:text-white transition-colors duration-200"
          >
            ☕ Ko-fi
          </a>
        </div>
      </footer>
    </div>
  );
}
