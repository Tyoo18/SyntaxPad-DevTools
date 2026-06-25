import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "README Generator — Create GitHub README Online",
  description:
    "Generate a clean, professional README.md for your GitHub project in seconds. Free online README builder with markdown preview — no signup required.",
};

export default function ReadmeGeneratorPage() {
  redirect("/");
}
