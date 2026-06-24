"use client";

import { useState, useMemo } from "react";

export default function EnvBoilerplate() {
  // [STATE]: Framework and integrations
  const [framework, setFramework] = useState<"next" | "expo">("next");
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    supabase: false,
    firebase: false,
    prisma: false,
  });

  const [copyStatus, setCopyStatus] = useState<string>("[ Copy to Clipboard ]");

  // [CALC]: Generate .env content
  const output = useMemo(() => {
    const prefix = framework === "next" ? "NEXT_PUBLIC" : "EXPO_PUBLIC";
    const vars: string[] = [];

    if (integrations.supabase) {
      vars.push(`${prefix}_SUPABASE_URL=your_supabase_url_here`);
      vars.push(`${prefix}_SUPABASE_ANON_KEY=your_supabase_anon_key_here`);
    }
    if (integrations.firebase) {
      vars.push(`${prefix}_FIREBASE_API_KEY=your_firebase_api_key_here`);
      vars.push(
        `${prefix}_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here`,
      );
    }
    if (integrations.prisma) {
      vars.push(`DATABASE_URL=your_database_url_here`);
    }
    if (vars.length === 0) {
      vars.push("# Select at least one integration to see variables.");
    }
    return vars.join("\n");
  }, [framework, integrations]);

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
          {/* Framework Toggle */}
          <div>
            <span className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-2">
              Target Framework
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-mono text-white">
                <input
                  type="radio"
                  value="next"
                  checked={framework === "next"}
                  onChange={() => setFramework("next")}
                  className="accent-brand-accent"
                />
                Next.js
              </label>
              <label className="flex items-center gap-2 text-sm font-mono text-white">
                <input
                  type="radio"
                  value="expo"
                  checked={framework === "expo"}
                  onChange={() => setFramework("expo")}
                  className="accent-brand-accent"
                />
                Expo
              </label>
            </div>
          </div>
          {/* Integrations */}
          <div>
            <span className="block text-[10px] font-mono text-brand-slate uppercase tracking-wider mb-2">
              Integrations
            </span>
            <div className="space-y-1.5">
              {Object.entries(integrations).map(([key, checked]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-xs font-mono text-brand-slate/80"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setIntegrations((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                    className="accent-brand-accent w-3.5 h-3.5"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
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
              FORMAT: ENV
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
