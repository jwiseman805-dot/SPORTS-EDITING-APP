import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "WiseSport — Social Platform for Sport Video Editors",
  description:
    "The home for sport video editors. Share cinematic highlights, discover amazing edits, connect with creators worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="h-full"
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
