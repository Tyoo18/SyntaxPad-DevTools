"use client";

// [INIT]: Import tool components and icons
import ReadmeBuilder from "@/tools/readme-builder";
import CommitBuilder from "@/tools/commit-builder";
import EnvBoilerplate from "@/tools/env-boilerplate";
import { Copy } from "lucide-react";

interface WorkspaceProps {
  activeTool: string;
}

// [INIT]: List of tools that are not yet available
const COMING_SOON_TOOLS = ["json-env", "changelog", "cron"];

export default function Workspace({ activeTool }: WorkspaceProps) {
  // [RENDER]: Coming Soon placeholder for unreleased tools
  const renderComingSoon = () => {
    const toolName = activeTool
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-(--color-surface) p-8 text-center rounded-2xl">
        <span className="font-mono text-2xl font-bold text-(--color-text)/80 tracking-tight">
          {toolName}
        </span>
        <div className="mt-3 inline-block border border-(--color-accent)/30 px-3 py-1 rounded-full">
          <span className="text-[10px] font-mono text-(--color-accent) tracking-widest uppercase">
            [ PIPELINE NODE // UNDER DEVELOPMENT ]
          </span>
        </div>
        <p className="mt-4 max-w-sm text-sm text-(--color-muted) font-sans leading-relaxed">
          This utility is currently in the pipeline and will be available in the
          next version rollout. Stay tuned for instant text generation magic.
        </p>
      </div>
    );
  };

  // [RENDER]: Choose the active tool or coming soon placeholder
  const renderContent = () => {
    if (COMING_SOON_TOOLS.includes(activeTool)) {
      return renderComingSoon();
    }

    switch (activeTool) {
      case "readme":
        return <ReadmeBuilder />;
      case "commit":
        return <CommitBuilder />;
      case "env":
        return <EnvBoilerplate />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-(--color-muted) font-mono text-sm">
            Select a tool from the carousel.
          </div>
        );
    }
  };

  return (
    // [STYLE]: Fixed height container with rounded-2xl surface
    <div className="w-full h-135 bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden">
      {renderContent()}
    </div>
  );
}
