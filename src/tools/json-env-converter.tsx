"use client";

import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function JsonEnvConverter() {
  const [input, setInput] = useState<string>(
    '{\n  "API_KEY": "your_key",\n  "DB_URL": "your_url"\n}',
  );
  const [prefix, setPrefix] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  const output = useMemo(() => {
    try {
      const parsed = JSON.parse(input);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        return "# Error: Input must be a JSON object.";
      }
      return Object.entries(parsed)
        .map(([key, value]) => {
          const envKey = prefix ? `${prefix}_${key}` : key;
          return `${envKey}=${value}`;
        })
        .join("\n");
    } catch {
      return "# Error: Invalid JSON. Please check your input.";
    }
  }, [input, prefix]);

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
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col space-y-4 h-full overflow-hidden">
        <span className="text-sm font-medium text-(--color-muted) block mb-0.5">
          JSON to .env Converter
        </span>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Prefix
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value.toUpperCase())}
            placeholder="e.g. NEXT_PUBLIC"
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) resize-none transition-colors scrollbar-none"
          />
        </div>
      </div>

      {/* Right Column – Output */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
            Preview
          </span>
        </div>

        <div className="flex-1 min-h-0 relative overflow-hidden">
          <pre className="absolute inset-0 font-mono text-xs text-(--color-text) whitespace-pre-wrap bg-(--color-bg)/50 p-4 pb-12 border border-(--color-border) rounded-lg overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden pr-16">
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
