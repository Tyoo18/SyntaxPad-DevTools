"use client";

// [INIT]: Import tool components and props
import ReadmeBuilder from "@/tools/readme-builder";
import CommitBuilder from "@/tools/commit-builder";
import EnvBoilerplate from "@/tools/env-boilerplate";

interface WorkspaceProps {
  activeTool: string;
}

export default function Workspace({ activeTool }: WorkspaceProps) {
  // [RENDER]: Dynamically choose the active tool component
  const renderTool = () => {
    switch (activeTool) {
      case "readme":
        return <ReadmeBuilder />;
      case "commit":
        return <CommitBuilder />;
      case "env":
        return <EnvBoilerplate />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-brand-slate/40 font-mono text-sm">
            Select a tool from the carousel.
          </div>
        );
    }
  };

  return (
    // [STYLE]: Wrapper with card background and border
    <div className="w-full h-full bg-card-bg border border-border-subtle rounded-lg overflow-hidden">
      {renderTool()}
    </div>
  );
}
