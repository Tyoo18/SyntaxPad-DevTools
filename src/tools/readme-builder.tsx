"use client";

// [INIT]: Import required React hooks and UI icons
import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function ReadmeBuilder() {
  // [STATE]: Reactive states for managing form input parameters
  const [title, setTitle] = useState<string>("My Project");
  const [desc, setDesc] = useState<string>(
    "A brief description of your project.",
  );
  const [tech, setTech] = useState<Record<string, boolean>>({
    React: true,
    Nextjs: false,
    TypeScript: true,
    Tailwind: false,
    Nodejs: false,
    Supabase: false,
  });
  const [github, setGithub] = useState<string>("yourusername");
  const [twitter, setTwitter] = useState<string>("yourhandle");
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  // [CALC]: Compile real-time dynamic markdown text templates
  const output = useMemo(() => {
    const techBadges = Object.entries(tech)
      .filter(([_, checked]) => checked)
      .map(([t]) => `![${t}](https://img.shields.io/badge/${t}-blue)`)
      .join(" ");

    return `# ${title}

${techBadges}

## Description
${desc}

## Tech Stack
${Object.entries(tech)
  .filter(([_, checked]) => checked)
  .map(([t]) => `- ${t}`)
  .join("\n")}

## Installation
\`\`\`bash
npm install
\`\`\`

## Author
- Twitter: [@${twitter}](https://twitter.com/${twitter})`;
  }, [title, desc, tech, github, twitter]);

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
    // [STYLE]: Grid container locked strictly to parent workspace height
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col space-y-3.5 h-full overflow-y-auto scrollbar-none">
        <span className="text-sm font-medium text-(--color-muted) block mb-0.5">
          README.md Builder
        </span>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
        </div>

        <div className="grid grid-cols-[100px_1fr] items-start gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider pt-1.5">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={2}
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) resize-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-[100px_1fr] items-start gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider pt-0.5">
            Tech Stack
          </label>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {Object.entries(tech).map(([t, checked]) => (
              <label
                key={t}
                className="flex items-center gap-2 text-xs font-mono text-(--color-text) cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    setTech((prev) => ({ ...prev, [t]: e.target.checked }))
                  }
                  className="accent-(--color-accent)"
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            GitHub
          </label>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
        </div>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Twitter
          </label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-1.5 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
          />
        </div>
      </div>

      {/* Right Column – Fluid Symmetrical Output matching the bottom baseline padding */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-(--color-muted)">
            Preview
          </span>
        </div>

        {/* [STYLE]: Normalized preview box container that utilizes the remaining height completely */}
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
