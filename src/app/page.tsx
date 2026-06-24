"use client";

import { useState } from "react";
import StackedCards from "@/components/StackedCards";
import Workspace from "@/components/Workspace";
import HeroSection from "@/components/HeroSection";
import { Terminal } from "lucide-react";

export default function Home() {
  const [activeTool, setActiveTool] = useState<string>("readme");

  return (
    // full viewport, flex column, page background
    <div className="w-screen min-h-screen bg-page-bg text-gray-200 font-sans flex flex-col overflow-x-hidden">
      {/* ─── HEADER (full width) ─── */}
      <header className="w-full border-b border-border-subtle py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-brand-slate">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 stroke-[2.5] text-accent-cyan" />
            <span className="text-xs font-mono tracking-wider font-bold uppercase text-white">
              Syntax<span className="text-accent-cyan">Pad_</span>
            </span>
          </div>
          <div className="text-[10px] font-mono tracking-widest opacity-60 bg-brand-slate/5 px-2 py-0.5 border border-border-subtle rounded-sm">
            SYS_DECK: CYLINDRICAL // MVP v1.0
          </div>
        </div>
      </header>

      {/* ─── MAIN (centered container) ─── */}
      <main className="flex-1 flex flex-col py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          {/* Hero Section */}
          <HeroSection />

          {/* Grid: StackedCards | Workspace */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start">
            {/* Left: Carousel */}
            <div className="flex justify-center items-center h-full">
              <StackedCards
                activeTool={activeTool}
                onSelectTool={setActiveTool}
              />
            </div>
            {/* Right: Workspace */}
            <div className="h-full w-full">
              <Workspace activeTool={activeTool} />
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER (full width) ─── */}
      <footer className="w-full border-t border-border-subtle py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-brand-slate text-xs font-mono gap-4">
          <div className="flex items-center gap-2 max-w-md">
            <span className="text-[8px] border border-brand-slate/40 text-brand-slate px-1 font-mono rounded font-bold uppercase tracking-tight">
              AD
            </span>
            <p className="text-[11px] font-sans text-brand-slate/80 truncate">
              Deploy instant apps seamlessly onto the global edge network using
              Vercel.
            </p>
          </div>
          <div>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-brand-slate text-page-bg font-bold uppercase text-[10px] tracking-wider border border-transparent hover:bg-transparent hover:text-brand-slate hover:border-brand-slate/30 transition-all duration-200"
            >
              [ Sponsor Node ]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
