import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cron Expression Builder — Visual Cron Job Generator",
  description:
    "Build cron expressions visually with human-readable descriptions. Free online cron job expression builder for developers.",
};

export default function CronBuilderPage() {
  redirect("/");
}
