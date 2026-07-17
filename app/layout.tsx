import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillForge AI - AI-Powered Career & Learning Roadmaps",
  description: "Accelerate your career with customized, AI-generated learning roadmaps, interactive skill assessments, and personal AI career co-pilots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
