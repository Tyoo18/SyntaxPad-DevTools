"use client";

import { useState } from "react";
import StackedCards from "@/components/StackedCards";
import Workspace from "@/components/Workspace";
import HeroSection from "@/components/HeroSection";
import ThemeToggle from "@/components/ThemeToggle";
import { Terminal } from "lucide-react";

export default function Home() {
  const [activeTool, setActiveTool] = useState<string>("readme");

  return (
    <div className="w-screen h-screen bg-(--color-bg) text-(--color-text) font-sans flex flex-col overflow-hidden">
      {/* ─── HEADER ─── */}
      <header className="w-full border-b border-(--color-border) px-6 md:px-10 bg-(--color-bg) z-50 lg:fixed lg:top-0 lg:left-0 lg:right-0 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 stroke-[2.5] text-(--color-accent)" />
            <span className="text-base font-bold tracking-tight uppercase text-(--color-text)">
              Syntax<span className="text-(--color-accent)">Pad_</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ─── MAIN ─── */}
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
      <footer className="w-full border-t border-(--color-border) px-6 md:px-10 bg-(--color-bg) z-50 lg:fixed lg:bottom-0 lg:left-0 lg:right-0 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: new text, removed AD label */}
          <p className="text-sm text-(--color-muted) text-center sm:text-left max-w-xl">
            SyntaxPad is free and always will be. If it saved you time today,
            consider buying me a coffee — it helps keep the domain alive. ☕
          </p>
          {/* Right: new CTA button */}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-(--color-elevated) hover:bg-(--color-accent) hover:text-white transition-colors"
          >
            ☕ Buy Me a Coffee
          </a>
        </div>
      </footer>
    </div>
  );
}
