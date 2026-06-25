import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://syntaxpad.vercel.app"), // ganti domain kalau sudah custom
  title: {
    default: "SyntaxPad — Free Developer Utility Tools Online",
    template: "%s | SyntaxPad",
  },
  description:
    "SyntaxPad is a free minimalist toolkit for developers. Generate README files, .env boilerplates, and conventional commit messages — all in one place.",
  openGraph: {
    siteName: "SyntaxPad",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased lg:overflow-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
