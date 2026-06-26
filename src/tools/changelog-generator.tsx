"use client";

import { useState, useMemo, useRef } from "react";
import { Copy, Plus, Trash2 } from "lucide-react";

type ChangeType = "feat" | "fix" | "docs" | "chore" | "refactor" | "breaking";

interface ChangeEntry {
  id: number;
  type: ChangeType;
  message: string;
}

const TYPE_LABELS: Record<ChangeType, string> = {
  feat: "Added",
  fix: "Fixed",
  docs: "Documentation",
  chore: "Chore",
  refactor: "Refactored",
  breaking: "Breaking Changes",
};

export default function ChangelogGenerator() {
  const [version, setVersion] = useState<string>("1.0.0");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [entries, setEntries] = useState<ChangeEntry[]>([
    { id: 1, type: "feat", message: "Initial release" },
  ]);
  const [copyStatus, setCopyStatus] = useState<string>("Copy");
  let nextId = useRef(2);

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      { id: nextId.current++, type: "feat", message: "" },
    ]);
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: number, field: keyof ChangeEntry, value: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const output = useMemo(() => {
    const grouped = entries.reduce(
      (acc, entry) => {
        if (!entry.message.trim()) return acc;
        if (!acc[entry.type]) acc[entry.type] = [];
        acc[entry.type].push(entry.message.trim());
        return acc;
      },
      {} as Record<ChangeType, string[]>,
    );

    const sections = (Object.keys(TYPE_LABELS) as ChangeType[])
      .filter((type) => grouped[type]?.length)
      .map((type) => {
        const items = grouped[type].map((m) => `- ${m}`).join("\n");
        return `### ${TYPE_LABELS[type]}\n${items}`;
      })
      .join("\n\n");

    if (!sections) return "# Add some entries to generate changelog.";

    return `## [${version}] - ${date}\n\n${sections}`;
  }, [version, date, entries]);

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
          Changelog Generator
        </span>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
              Version
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
              Entries
            </label>
            <button
              onClick={addEntry}
              className="flex items-center gap-1 text-xs font-medium text-(--color-accent) hover:opacity-70 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-none flex-1">
            {entries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-2">
                <select
                  value={entry.type}
                  onChange={(e) =>
                    updateEntry(entry.id, "type", e.target.value)
                  }
                  className="bg-(--color-elevated) border border-(--color-border) rounded-lg px-2 py-1.5 text-xs font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) cursor-pointer"
                >
                  {(Object.keys(TYPE_LABELS) as ChangeType[]).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={entry.message}
                  onChange={(e) =>
                    updateEntry(entry.id, "message", e.target.value)
                  }
                  placeholder="describe the change"
                  className="flex-1 bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-xs font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
                />
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-(--color-muted) hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
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
