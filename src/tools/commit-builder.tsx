"use client";

import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function CommitBuilder() {
  // [STATE]: Commit form fields
  const [type, setType] = useState<string>("feat");
  const [scope, setScope] = useState<string>("");
  const [desc, setDesc] = useState<string>("add new feature");
  // [STATE]: Output format toggle
  const [withGitCommand, setWithGitCommand] = useState<boolean>(false);

  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  // [CALC]: Generate commit message
  const commitMessage = useMemo(() => {
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    return `${type}${scopePart}: ${desc.trim() || "add new feature"}`.toLowerCase();
  }, [type, scope, desc]);

  // [CALC]: Final output with optional git command wrapper
  const output = useMemo(() => {
    return withGitCommand ? `git commit -m "${commitMessage}"` : commitMessage;
  }, [commitMessage, withGitCommand]);

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
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col h-full overflow-y-auto">
        <div className="flex-1 space-y-4">
          <span className="text-sm font-medium text-(--color-muted) block mb-4">
            Input
          </span>
          {/* Type Dropdown */}
          <div>
            <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
            >
              <option value="feat">feat</option>
              <option value="fix">fix</option>
              <option value="docs">docs</option>
              <option value="chore">chore</option>
              <option value="style">style</option>
              <option value="refactor">refactor</option>
            </select>
          </div>
          {/* Scope (optional) */}
          <div>
            <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
              Scope (optional)
            </label>
            <input
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="e.g., auth, ui, api"
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
              Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="short summary of changes"
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>

          {/* Output format toggle */}
          <div>
            <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-2">
              Output format
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setWithGitCommand(false)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  !withGitCommand
                    ? "bg-(--color-accent) text-white"
                    : "bg-(--color-elevated) text-(--color-muted)"
                }`}
              >
                Message only
              </button>
              <button
                onClick={() => setWithGitCommand(true)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  withGitCommand
                    ? "bg-(--color-accent) text-white"
                    : "bg-(--color-elevated) text-(--color-muted)"
                }`}
              >
                Git command
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column – Output Preview */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-(--color-muted)">
            Preview
          </span>
          <span className="text-xs text-(--color-muted)">Commit Message</span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <pre className="font-mono text-sm text-(--color-text) whitespace-pre-wrap bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg h-full">
            {output}
          </pre>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-(--color-elevated) text-(--color-text) rounded-md text-sm font-medium hover:text-(--color-accent) transition-colors duration-200"
          >
            <Copy className="w-4 h-4" />
            <span>{copyStatus}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
