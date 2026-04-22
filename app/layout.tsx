import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ReelSport — Social Platform for Sport Video Editors",
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
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 ml-64">
            <Header />
            <main className="flex-1 overflow-y-auto" style={{ paddingTop: "64px" }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
