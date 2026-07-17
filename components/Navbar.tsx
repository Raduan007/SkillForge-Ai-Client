"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Compass, Flame, ShieldAlert, Award } from "lucide-react";

interface Profile {
  name: string;
  level: string;
  streak: number;
  badges: string[];
}

export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.warn("Failed to fetch profile in navbar:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-dark-bg transition-colors group-hover:bg-transparent">
              <Compass className="h-5 w-5 text-primary group-hover:text-dark-bg transition-colors" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SkillForge AI
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/generator"
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
          >
            Roadmap Generator
          </Link>
          <Link
            href="/quiz"
            className="text-sm font-medium text-slate-300 hover:text-primary transition-colors"
          >
            Career Quiz
          </Link>
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center gap-4">
          {profile && (
            <>
              {/* Streak */}
              <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-950/20 px-3 py-1 text-sm font-semibold text-orange-400">
                <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
                <span>{profile.streak} Day Streak</span>
              </div>
              {/* Badges count */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                <Award className="h-4 w-4" />
                <span>{profile.badges.length} Badges</span>
              </div>
            </>
          )}

          <Link
            href="/generator"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            New Roadmap
          </Link>
        </div>
      </div>
    </header>
  );
}
