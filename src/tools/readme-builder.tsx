"use client";

// [INIT]: React hooks for state management
import { useState, useMemo } from "react";

export default function ReadmeBuilder() {
  // [STATE]: Form fields for README builder
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

  // [STATE]: Copy button feedback
  const [copyStatus, setCopyStatus] = useState<string>("[ Copy to Clipboard ]");

  // [CALC]: Generate Markdown output
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
# or
yarn install
\`\`\`

## Author
- GitHub: [@${github}](https://github.com/${github})
- Twitter: [@${twitter}](https://twitter.com/${twitter})

## License
MIT`;
  }, [title, desc, tech, github, twitter]);

  // [HANDLER]: Copy to clipboard with feedback
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
    // [STYLE]: Split‑screen layout
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between h-full overflow-y-auto">
        <div className="space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-brand-slate uppercase block mb-4">
            // 01. Input Configuration
          </span>
          {/* Project Title */}
          <div>
            <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
              Short Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors resize-y"
            />
          </div>
          {/* Tech Stack */}
          <div>
            <span className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-2">
              Tech Stack
            </span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(tech).map(([t, checked]) => (
                <label
                  key={t}
                  className="flex items-center gap-2 text-xs font-mono text-brand-slate/80"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setTech((prev) => ({ ...prev, [t]: e.target.checked }))
                    }
                    className="accent-brand-accent w-3.5 h-3.5"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
          {/* Author Metadata */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
                GitHub Username
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-1">
                Twitter Handle
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full bg-transparent border border-border-subtle rounded-sm px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-brand-accent transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-slate/40 mt-4">
          CTRL_SYS_READY
        </div>
      </div>

      {/* Right Column – Output Preview */}
      <div className="p-6 bg-page-bg/40 flex flex-col justify-between h-full relative">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-accent uppercase block">
              // 02. Live Preview Output
            </span>
            <span className="text-[10px] font-mono text-brand-slate">
              FORMAT: MARKDOWN
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
