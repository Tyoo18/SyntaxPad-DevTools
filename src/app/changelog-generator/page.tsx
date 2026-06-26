import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Changelog Generator — Create Markdown Changelog Online",
  description:
    "Generate a structured CHANGELOG.md for your project releases. Free online changelog builder following Keep a Changelog format.",
};

export default function ChangelogGeneratorPage() {
  redirect("/");
}
