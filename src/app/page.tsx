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
      <header className="w-full border-b border-(--color-border) py-4 px-6 md:px-10 bg-(--color-bg) z-50 lg:fixed lg:top-0 lg:left-0 lg:right-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 stroke-[2.5] text-(--color-accent)" />
            <span className="text-xs font-mono tracking-wider font-bold uppercase text-(--color-text)">
              Syntax<span className="text-(--color-accent)">Pad_</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ─── MAIN ─── */}
      <main className="flex-1 flex flex-col overflow-hidden lg:pt-16 lg:pb-16">
        <div className="flex-1 flex flex-col px-6 md:px-10 py-6 lg:py-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
            <HeroSection />

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start overflow-hidden">
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
      <footer className="w-full border-t border-(--color-border) py-4 px-6 md:px-10 bg-(--color-bg) z-50 lg:fixed lg:bottom-0 lg:left-0 lg:right-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-(--color-muted) text-xs font-mono gap-4">
          <div className="flex items-center gap-2 max-w-md">
            <span className="text-[8px] border border-(--color-border) text-(--color-muted) px-1 font-mono rounded font-bold uppercase tracking-tight">
              AD
            </span>
            <p className="text-[11px] font-sans text-(--color-muted) truncate">
              Deploy instant apps seamlessly onto the global edge network using
              Vercel.
            </p>
          </div>
          <div>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-(--color-accent) text-(--color-bg) font-bold uppercase text-[10px] tracking-wider border border-transparent hover:bg-transparent hover:text-(--color-accent) hover:border-(--color-accent)/30 transition-all duration-200"
            >
              [ Sponsor Node ]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
