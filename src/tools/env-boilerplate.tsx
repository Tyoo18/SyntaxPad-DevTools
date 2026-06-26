"use client";

// [INIT]: Import required React hooks and UI icons
import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function EnvBoilerplate() {
  // [STATE]: Active framework structural key value
  const [framework, setFramework] = useState<"next" | "expo">("next");
  // [STATE]: Integration checkbox dataset collection parameters
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    supabase: false,
    firebase: false,
    prisma: false,
    nextauth: false,
    stripe: false,
  });
  const [copyStatus, setCopyStatus] = useState<string>("Copy");

  // [CALC]: Process dynamic key parameters into plain environment configurations
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
    if (integrations.nextauth) {
      vars.push(`NEXTAUTH_SECRET=your_nextauth_secret_here`);
    }
    if (integrations.stripe) {
      vars.push(`STRIPE_API_KEY=your_stripe_api_key_here`);
    }
    if (vars.length === 0) {
      vars.push("# Select integrations to populate boilerplate variables.");
    }
    return vars.join("\n");
  }, [framework, integrations]);

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
    // [STYLE]: Shared design framework ensuring identical heights across tools
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column – Inputs */}
      <div className="p-6 border-b md:border-b-0 md:border-r border-(--color-border) flex flex-col space-y-4 h-full overflow-y-auto scrollbar-none">
        <span className="text-sm font-medium text-(--color-muted) block mb-0.5">
          .env Boilerplate
        </span>

        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
            Framework
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm font-mono text-(--color-text) cursor-pointer select-none">
              <input
                type="radio"
                value="next"
                checked={framework === "next"}
                onChange={() => setFramework("next")}
                className="accent-(--color-accent)"
              />
              Next.js
            </label>
            <label className="flex items-center gap-2 text-sm font-mono text-(--color-text) cursor-pointer select-none">
              <input
                type="radio"
                value="expo"
                checked={framework === "expo"}
                onChange={() => setFramework("expo")}
                className="accent-(--color-accent)"
              />
              Expo
            </label>
          </div>
        </div>

        <div className="grid grid-cols-[100px_1fr] items-start gap-3">
          <label className="text-xs font-medium text-(--color-muted) uppercase tracking-wider pt-0.5">
            Integrations
          </label>
          <div className="space-y-2">
            {Object.entries(integrations).map(([key, checked]) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm font-mono text-(--color-text) cursor-pointer select-none"
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
                  className="accent-(--color-accent)"
                />
                {key === "nextauth" ? "NextAuth" : key.toUpperCase()}
              </label>
            ))}
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
          <pre className="w-full h-full font-mono text-xs text-(--color-text) whitespace-pre-wrap break-all bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden pr-16">
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
