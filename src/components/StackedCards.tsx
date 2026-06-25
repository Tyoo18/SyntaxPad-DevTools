"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface StackedCardsProps {
  activeTool: string;
  onSelectTool: (id: string) => void;
}

const TOOLS_REGISTRY = [
  {
    id: "readme",
    title: "Advanced README.md Builder",
    desc: "Interactive markdown configuration utility",
    status: "active",
  },
  {
    id: "commit",
    title: "Conventional Commit",
    desc: "Standardize formatting engine for repository logs",
    status: "active",
  },
  {
    id: "env",
    title: "Smart .env Boilerplate",
    desc: "Automated standard configuration injector block",
    status: "active",
  },
  {
    id: "json-env",
    title: "JSON to .env Converter",
    desc: "Extract objects into flat variable structures",
    status: "soon",
  },
  {
    id: "changelog",
    title: "Changelog Generator",
    desc: "Compile mechanical markdown deployment histories",
    status: "soon",
  },
  {
    id: "cron",
    title: "Cron-Job Expression Builder",
    desc: "Visual schedule validator execution model",
    status: "soon",
  },
  {
    id: "dockerfile",
    title: "Dockerfile Generator",
    desc: "Generate production-ready Dockerfiles for any stack",
    status: "soon",
  },
  {
    id: "githooks",
    title: "Git Hooks Manager",
    desc: "Set up pre-commit and pre-push hooks visually",
    status: "soon",
  },
];

export default function StackedCards({
  activeTool,
  onSelectTool,
}: StackedCardsProps) {
  const [virtualIndex, setVirtualIndex] = useState<number>(0);
  const isAnimating = useRef<boolean>(false);
  const totalItems = TOOLS_REGISTRY.length;

  const wrappedIndex = ((virtualIndex % totalItems) + totalItems) % totalItems;

  useEffect(() => {
    onSelectTool(TOOLS_REGISTRY[wrappedIndex].id);
  }, [wrappedIndex, onSelectTool]);

  const handleStep = (direction: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setVirtualIndex((prev) => prev + direction);
  };

  const handleAnimationComplete = () => {
    isAnimating.current = false;
  };

  const handleWheelRotation = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isAnimating.current) return;
    if (Math.abs(e.deltaY) < 15) return;
    const direction = e.deltaY > 0 ? 1 : -1;
    handleStep(direction);
  };

  const handleDragInteractionEnd = (event: any, info: any) => {
    if (isAnimating.current) return;
    const threshold = 30;
    if (info.offset.y < -threshold) {
      handleStep(1);
    } else if (info.offset.y > threshold) {
      handleStep(-1);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAnimating.current) return;
      if (Math.abs(e.deltaY) < 15) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      handleStep(direction);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  // [STACK]: Show 5 cards at a time (offsets -2 … +2)
  const visibleRange = 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xs mx-auto h-[400px] flex items-center justify-center cursor-ns-resize"
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={handleDragInteractionEnd}
        className="absolute inset-0 z-30 bg-transparent"
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {TOOLS_REGISTRY.map((tool, index) => {
          let offsetDistance = index - wrappedIndex;
          if (offsetDistance > totalItems / 2) offsetDistance -= totalItems;
          if (offsetDistance < -totalItems / 2) offsetDistance += totalItems;

          const isVisible = Math.abs(offsetDistance) <= visibleRange;
          if (!isVisible) return null;

          // [STACK]: 5-card progressive stacking
          const spacing = 62;
          const targetY = offsetDistance * spacing;

          let targetScale = 1;
          let targetOpacity = 1;
          let targetZIndex = 10;

          if (offsetDistance === 0) {
            targetScale = 1;
            targetOpacity = 1;
            targetZIndex = 20;
          } else if (Math.abs(offsetDistance) === 1) {
            targetScale = 0.92;
            targetOpacity = 0.7;
            targetZIndex = 15;
          } else if (Math.abs(offsetDistance) === 2) {
            targetScale = 0.84;
            targetOpacity = 0.4;
            targetZIndex = 10;
          }

          const isActive = offsetDistance === 0;

          return (
            <motion.div
              key={tool.id}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
              animate={{
                y: targetY,
                scale: targetScale,
                opacity: targetOpacity,
                zIndex: targetZIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              onAnimationComplete={
                isActive ? handleAnimationComplete : undefined
              }
              className={`absolute w-full p-4 border rounded-xl transition-colors duration-300 ${
                isActive
                  ? "border-(--color-accent) shadow-(--card-shadow) bg-(--color-surface)"
                  : "border-(--card-border) bg-(--color-surface)/80 backdrop-blur-sm shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-(--color-text)">
                  {tool.title}
                </span>
                {tool.status === "soon" && (
                  <span className="text-[10px] font-mono border border-(--color-border) text-(--color-muted) px-1 rounded-full uppercase scale-90">
                    Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-(--color-muted) font-sans mt-1.5 leading-relaxed truncate">
                {tool.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* fade overlays */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-(--color-bg) to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-(--color-bg) to-transparent pointer-events-none z-20" />
    </div>
  );
}
