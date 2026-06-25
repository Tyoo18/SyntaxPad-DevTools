import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: ".ENV Boilerplate Generator — Environment Variable Template",
  description:
    "Quickly generate .env file templates for Node.js, Laravel, Next.js, and more. Free online .env boilerplate builder for developers.",
};

export default function EnvBoilerplatePage() {
  redirect("/");
}
