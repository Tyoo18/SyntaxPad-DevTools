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
    <div className="relative w-screen min-h-screen bg-(--color-bg) text-text font-sans flex flex-col">
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* ─── HEADER ─── */}
      {/* [RENDER]: Main Navigation Bar with Fixed Layout Viewports */}
      <header className="relative z-50 w-full border-b border-border px-6 md:px-10 bg-(--color-bg) lg:fixed lg:top-0 lg:left-0 lg:right-0 h-14 flex items-center">
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
      <main className="relative z-10 flex-1 flex flex-col lg:pt-14">
        {/* Hero Section - Full Viewport */}
        <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center px-6 lg:pt-14">
          <HeroSection />
        </section>

        {/* Workspace Section - Scroll target */}
        <section
          id="workspace"
          className="min-h-screen px-6 md:px-10 py-20 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-center">
              {/* [RENDER]: Centered container node for stacked utility tool selection cards */}
              <div className="flex justify-center items-center h-full">
                <StackedCards
                  activeTool={activeTool}
                  onSelectTool={setActiveTool}
                />
              </div>
              {/* [RENDER]: Workspace viewport component container rendering selected node layout */}
              <div className="h-full w-full">
                <Workspace activeTool={activeTool} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      {/* [RENDER]: Application Footer Band with Support Call-To-Action */}
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
