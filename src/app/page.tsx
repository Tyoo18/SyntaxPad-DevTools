"use client";

// [INIT]: Import layout management states and core visual elements
import { useState } from "react";
import StackedCards from "@/components/StackedCards";
import Workspace from "@/components/Workspace";
import HeroSection from "@/components/HeroSection";
import ThemeToggle from "@/components/ThemeToggle";
import { Terminal } from "lucide-react";

export default function Home() {
  // [STATE]: Track currently active developer utility tool
  const [activeTool, setActiveTool] = useState<string>("readme");

  return (
    <div className="w-screen h-screen bg-bg text-text font-sans flex flex-col overflow-hidden">
      {/* ─── HEADER ─── */}
      {/* [RENDER]: Main Navigation Bar with Fixed Layout Viewports */}
      <header className="w-full border-b border-border px-6 md:px-10 bg-bg z-50 lg:fixed lg:top-0 lg:left-0 lg:right-0 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* [RENDER]: High-contrast Bold Brand Identity Typography */}
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
      {/* [RENDER]: Core Application Shell Layout Engine */}
      <main className="flex-1 flex flex-col overflow-hidden lg:pt-14 lg:pb-14">
        <div className="flex-1 flex flex-col px-6 md:px-10 py-6 lg:py-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
            <HeroSection />

            {/* Grid with fixed left column width (320px) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start overflow-hidden">
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
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      {/* [RENDER]: Application Footer Band with Support Call-To-Action */}
      <footer className="w-full border-t border-border px-6 md:px-10 bg-bg z-50 lg:fixed lg:bottom-0 lg:left-0 lg:right-0 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted text-center sm:text-left max-w-xl">
            SyntaxPad is free and always will be. If it saved you time today,
            consider buying me a coffee — it helps keep the domain alive. ☕
          </p>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-elevated hover:bg-accent hover:text-white transition-colors duration-200"
          >
            ☕ Buy Me a Coffee
          </a>
        </div>
      </footer>
    </div>
  );
}
