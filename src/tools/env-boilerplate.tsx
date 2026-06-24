"use client";

import { useState, useMemo } from "react";
import { Copy } from "lucide-react";

export default function EnvBoilerplate() {
  const [framework, setFramework] = useState<"next" | "expo">("next");
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    supabase: false,
    firebase: false,
    prisma: false,
    nextauth: false,
    stripe: false,
  });

  const [copyStatus, setCopyStatus] = useState<string>("Copy");

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
      vars.push(`# NextAuth`);
      vars.push(`NEXTAUTH_URL=http://localhost:3000`);
      vars.push(`NEXTAUTH_SECRET=your-secret-here`);
    }
    if (integrations.stripe) {
      vars.push(`# Stripe`);
      vars.push(`STRIPE_SECRET_KEY=sk_test_...`);
      vars.push(`STRIPE_PUBLISHABLE_KEY=pk_test_...`);
      vars.push(`STRIPE_WEBHOOK_SECRET=whsec_...`);
    }
    if (vars.length === 0) {
      vars.push("# Select at least one integration to see variables.");
    }
    return vars.join("\n");
  }, [framework, integrations]);

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
          {/* Framework Toggle */}
          <div>
            <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-2">
              Target Framework
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-mono text-(--color-text)">
                <input
                  type="radio"
                  value="next"
                  checked={framework === "next"}
                  onChange={() => setFramework("next")}
                  className="accent-(--color-accent)"
                />
                Next.js
              </label>
              <label className="flex items-center gap-2 text-sm font-mono text-(--color-text)">
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
          {/* Integrations */}
          <div>
            <span className="block text-xs font-medium text-(--color-muted) uppercase tracking-wider mb-2">
              Integrations
            </span>
            <div className="space-y-1.5">
              {Object.entries(integrations).map(([key, checked]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-sm font-mono text-(--color-text)"
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
                  {key === "nextauth"
                    ? "NextAuth"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
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
          <span className="text-xs text-(--color-muted)">.env</span>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
          <pre className="font-mono text-sm text-(--color-text) whitespace-pre-wrap break-all bg-(--color-bg)/50 p-4 border border-(--color-border) rounded-lg h-full">
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
