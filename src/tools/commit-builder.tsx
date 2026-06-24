"use client";

import { useState, useMemo } from "react";

export default function CommitBuilder() {
  // [STATE]: Commit form fields
  const [type, setType] = useState<string>("feat");
  const [scope, setScope] = useState<string>("");
  const [desc, setDesc] = useState<string>("add new feature");

  const [copyStatus, setCopyStatus] = useState<string>("[ Copy to Clipboard ]");

  // [CALC]: Generate commit message
  const output = useMemo(() => {
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    return `${type}${scopePart}: ${desc.trim() || "add new feature"}`.toLowerCase();
  }, [type, scope, desc]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("[ Copied! ]");
      setTimeout(() => setCopyStatus("[ Copy to Clipboard ]"), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between h-full overflow-y-auto">
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-brand-slate uppercase block mb-4">
            // 01. Input Configuration
          </span>
          {/* Type Dropdown */}
          <div>
            <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors appearance-none"
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
            <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
              Scope (optional)
            </label>
            <input
              type="text"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="e.g., auth, ui, api"
              className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
              Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="short summary of changes"
              className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-slate/40 mt-4">
          CTRL_SYS_READY
        </div>
      </div>

      {/* Right Column */}
      <div className="p-6 bg-page-bg/40 flex flex-col justify-between h-full relative">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase block">
              // 02. Live Preview Output
            </span>
            <span className="text-[10px] font-mono text-brand-slate">
              FORMAT: COMMIT_MSG
            </span>
          </div>
          <pre className="font-mono text-xs text-brand-slate/80 whitespace-pre-wrap bg-page-bg/50 p-4 border border-border-subtle rounded-sm h-[calc(100%-3rem)] overflow-y-auto">
            {output}
          </pre>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCopy}
            className="px-3 py-1 border border-brand-accent/40 text-brand-accent font-mono text-[10px] uppercase hover:bg-brand-accent/10 transition-all duration-200"
          >
            {copyStatus}
          </button>
        </div>
      </div>
    </div>
  );
}
