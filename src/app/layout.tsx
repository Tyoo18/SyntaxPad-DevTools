import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// [INIT]: Load Geist Sans for general UI components
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// [INIT]: Load JetBrains Mono for output panels and code blocks
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// [INIT]: Set application metadata for SEO and branding
export const metadata: Metadata = {
  title: "SyntaxPad | Minimalist Developer Utilities",
  description:
    "Super fast, polished, and instant code text utility generator for hackers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* [RENDER]: Apply fonts dynamically across the app shell */}
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
