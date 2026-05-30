import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EverAfter | Complete Luxury Wedding Planner Workspace",
  description: "Craft your dream wedding details seamlessly. Manage budgets, RSVPs, seating charts, day-of timelines, checklists, inspiration boards, crew, galleries, and a beautiful custom public wedding site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-50">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
