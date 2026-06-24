"use client";

interface WorkspaceProps {
  activeTool: string;
}

export default function Workspace({ activeTool }: WorkspaceProps) {
  return (
    <div className="w-full h-full bg-card-bg border border-border-subtle rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left: Input */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col justify-between h-full">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-brand-slate uppercase block mb-4">
            // 01. Input Configuration
          </span>
          <div className="text-xs text-brand-slate/60 font-mono italic">
            Form fields for [{activeTool}-builder] will instantiate here...
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-slate/40">
          CTRL_SYS_READY
        </div>
      </div>

      {/* Right: Output */}
      <div className="p-6 bg-page-bg/40 flex flex-col justify-between h-full relative">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono tracking-widest text-accent-cyan uppercase block">
              // 02. Live Preview Output
            </span>
            <span className="text-[10px] font-mono text-brand-slate">
              FORMAT: RAW_TEXT
            </span>
          </div>
          <pre className="font-mono text-xs text-brand-slate/50 bg-page-bg/50 p-4 border border-border-subtle rounded-sm">
            {`# Generated outputs for ${activeTool}\n// Ready to be extracted into source file...`}
          </pre>
        </div>

        <div className="flex justify-end">
          <button className="px-3 py-1 border border-accent-cyan/40 text-accent-cyan font-mono text-[10px] uppercase hover:bg-accent-cyan/10 transition-all duration-200">
            [ Copy to Clipboard ]
          </button>
        </div>
      </div>
    </div>
  );
}
