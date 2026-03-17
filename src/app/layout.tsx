import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "March Edge — NCAA Tournament Analytics by Cosmic Trex",
  description:
    "Every game picked. 67 matchups analyzed. 9 upset calls. Betting edges ranked by confidence. The analytical edge for March Madness 2026.",
  openGraph: {
    title: "March Edge — NCAA Tournament Analytics",
    description:
      "67 games picked. 9 upset calls. Betting edges ranked. The analytical edge for March Madness 2026.",
    siteName: "March Edge by Cosmic Trex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg min-h-screen text-text-body font-body">
        <Header />
        <Nav />
        <main className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
