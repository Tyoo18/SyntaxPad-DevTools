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

  // [STATE]: Temporary user feedback state for clipboard actions
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
# or
yarn install
\`\`\`

## Author
- GitHub: [@${github}](https://github.com/${github})
- Twitter: [@${twitter}](https://twitter.com/${twitter})

## License
MIT`;
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

  // [RENDER]: Main interactive grid interface layout split
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col h-full overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex-1 space-y-4">
          <span className="text-sm font-medium text-(--color-muted) block mb-4">
            Input
          </span>

          {/* Project Title Input Element */}
          <div>
            <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
            />
          </div>

          {/* Project Description Textarea Element */}
          <div>
            <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
              Short Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors resize-y"
            />
          </div>

          {/* Tech Stack Multi-Selection Checkbox Core Grid */}
          <div>
            <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-2">
              Tech Stack
            </span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(tech).map(([t, checked]) => (
                <label
                  key={t}
                  className="flex items-center gap-2 text-sm font-mono text-(--color-text)"
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

          {/* Author Handle Metadata Integration Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
                GitHub Username
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-1">
                Twitter Handle
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full bg-(--color-elevated) border border-(--color-border) rounded-lg px-3 py-2 text-sm font-mono text-(--color-text) focus:outline-none focus:border-(--color-accent) transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column – Output Preview */}
      <div className="p-6 bg-(--color-elevated)/40 flex flex-col h-full relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-(--color-muted)">
            Preview
          </span>
          <span className="text-xs text-(--color-muted)">Markdown</span>
        </div>

        {/* [STYLE]: Structural flexible container managing nested absolute scroll layers */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* [RENDER]: Encapsulated layout block with synchronized design syntax and hidden scroll tracks */}
          <pre className="flex-1 font-mono text-sm text-(--color-text) whitespace-pre-wrap bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
            {output}
          </pre>
        </div>

        {/* [RENDER]: Functional interactive copy trigger component node */}
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
