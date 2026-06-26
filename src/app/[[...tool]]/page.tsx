// [INIT]: Import type definitions and client application shell element
import type { Metadata } from "next";
import MainAppShell from "./MainAppShell";

// [UTIL]: Unified configuration registry mapping URL slugs to metadata and internal state keys
const TOOL_DATA: Record<
  string,
  { stateKey: string; title: string; description: string }
> = {
  "readme-generator": {
    stateKey: "readme",
    title: "Advanced README.md Builder",
    description:
      "Interactive markdown configuration utility to build professional project documentation instantly.",
  },
  "env-boilerplate": {
    stateKey: "env", // 💡 KALAU di StackedCards lo namanya cuma "env", ganti ini jadi "env"
    title: "Smart .env Boilerplate Generator",
    description:
      "Automated standard configuration injector for setting up environment variables seamlessly.",
  },
  "conventional-commit": {
    stateKey: "commit", // 💡 KALAU di StackedCards lo namanya "commit", ganti jadi "commit"
    title: "Conventional Commit Message Formatter",
    description:
      "Standardize your repository formatting engine with valid conventional commit messages.",
  },
  "json-env-converter": {
    stateKey: "json-env", // 💡 KALAU di StackedCards lo namanya "json", ganti jadi "json"
    title: "JSON to .env Converter",
    description:
      "Transform structured JSON objects into standardized environment variables instantly.",
  },
  "changelog-generator": {
    stateKey: "changelog", // 💡 KALAU di StackedCards lo namanya "changelog", ganti jadi "changelog"
    title: "Automated Changelog Generator",
    description:
      "Generate professional production-ready changelogs for your repository releases.",
  },
  "cron-builder": {
    stateKey: "cron", // 💡 KALAU di StackedCards lo namanya "cron", ganti jadi "cron"
    title: "Interactive CRON Schedule Builder",
    description:
      "Easily build, validate, and understand cron expressions with human-readable descriptions.",
  },
};

interface PageProps {
  params: Promise<{
    tool?: string[];
  }>;
}

// [HANDLER]: Generate dynamic SEO metadata headers based on current active path slug
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.tool?.[0];
  const activeToolConfig = slug ? TOOL_DATA[slug] : null;

  if (activeToolConfig) {
    return {
      title: activeToolConfig.title,
      description: activeToolConfig.description,
    };
  }

  return {};
}

// [HANDLER]: Pre-render static route boundaries for all configured tool slugs at build time
export async function generateStaticParams() {
  const slugs = Object.keys(TOOL_DATA);
  return [
    { tool: [] },
    ...slugs.map((slug) => ({
      tool: [slug],
    })),
  ];
}

// [RENDER]: Server-side core entry controller passing resolved state maps down to the client view
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.tool?.[0];

  // [CALC]: Determine initial active tool key by checking slug parameters
  const activeConfig = slug && TOOL_DATA[slug] ? TOOL_DATA[slug] : null;
  const initialToolKey = activeConfig ? activeConfig.stateKey : "readme";

  // [FORMAT]: Compile a clean slug-to-statekey mirror object for client reverse-lookups
  const slugToKeyMap: Record<string, string> = {};
  Object.keys(TOOL_DATA).forEach((slugKey) => {
    slugToKeyMap[slugKey] = TOOL_DATA[slugKey].stateKey;
  });

  return (
    <MainAppShell initialToolKey={initialToolKey} slugToKeyMap={slugToKeyMap} />
  );
}
