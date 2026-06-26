import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "JSON to .env Converter — Convert JSON to Environment Variables",
  description:
    "Instantly convert JSON objects to .env format online. Free JSON to dotenv converter for developers — no signup required.",
};

export default function JsonEnvConverterPage() {
  redirect("/");
}
