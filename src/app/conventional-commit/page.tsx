import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Conventional Commit Generator — Git Commit Message Formatter",
  description:
    "Write proper git commit messages following the Conventional Commits spec. Free online commit message generator with type, scope, and breaking change support.",
};

export default function ConventionalCommitPage() {
  redirect("/");
}
