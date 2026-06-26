"use client";

// [INIT]: Import required React hooks and UI icons
import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function CommitBuilder() {
  // [STATE]: Commit form fields managing token parameters
  const [type, setType] = useState<string>("feat");
  const [scope, setScope] = useState<string>("");
  const [desc, setDesc] = useState<string>("add new feature");
  const [withGitCommand, setWithGitCommand] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  // [CALC]: Generate raw formatted commit message string
  const commitMessage = useMemo(() => {
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    return `${type}${scopePart}: ${desc.trim() || "add new feature"}`.toLowerCase();
  }, [type, scope, desc]);

  // [CALC]: Finalize compiled syntax string based on format configuration
  const output = useMemo(() => {
    return withGitCommand ? `git commit -m "${commitMessage}"` : commitMessage;
  }, [commitMessage, withGitCommand]);

  // [HANDLER]: Execute secure native browser clipboard copying actions
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    // [STYLE]: Fixed structural grid perfectly standardizing layout behavior across tools
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col space-y-4 h-full overflow-y-auto scrollbar-none">
        <span className="text-sm font-medium text-(--color-muted) block mb-0.5">
          Git Commit Builder
        </span>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) appearance-none cursor-pointer"
          >
            <option value="feat">feat</option>
            <option value="fix">fix</option>
            <option value="docs">docs</option>
            <option value="chore">chore</option>
          </select>
        </div>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Scope
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g., auth, ui"
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent)"
          />
        </div>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Message
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="short summary of changes"
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent)"
          />
        </div>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Format
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setWithGitCommand(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                !withGitCommand
                  ? "bg-(--color-accent) text-white"
                  : "bg-(--color-elevated) text-(--color-muted) border border-(--color-border)"
              }`}
            >
              Message only
            </button>
            <button
              onClick={() => setWithGitCommand(true)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                withGitCommand
                  ? "bg-(--color-accent) text-white"
                  : "bg-(--color-elevated) text-(--color-muted) border border-(--color-border)"
              }`}
            >
              Git command
            </button>
          </div>
        </div>
      </div>

      {/* Right Column – Symmetrical Output Box perfectly matching the layout baseline */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
            Preview
          </span>
        </div>

        <div className="flex-1 min-h-0 relative">
          <pre className="w-full h-full font-mono text-xs text-(--color-text) whitespace-pre-wrap bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden pr-16">
            {output}
          </pre>

          <button
            onClick={handleCopy}
            className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-(--color-elevated) border border-(--color-border) text-(--color-text) rounded-md text-xs font-medium hover:text-(--color-accent) transition-colors shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copyStatus}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
