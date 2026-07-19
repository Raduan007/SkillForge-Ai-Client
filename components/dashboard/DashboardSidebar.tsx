"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User, 
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Roadmaps",
      href: "/dashboard/roadmaps",
      icon: BookOpen,
    },
    {
      label: "Progress",
      href: "/dashboard/progress",
      icon: Trophy,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r border-border-color dark:border-slate-800/40 bg-white dark:bg-[#0c1220] transition-all duration-300",
        isOpen ? "w-64" : "w-20",
        "lg:static lg:h-[calc(100vh-65px)] lg:z-0"
      )}
    >
      {/* Brand logo container */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border-color dark:border-slate-800/20">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-indigo-600 text-white shadow-md shadow-primary/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          {isOpen && (
            <span className="text-sm font-black text-dark-text tracking-tight uppercase group-hover:text-primary transition-colors">
              SkillForge <span className="text-primary">AI</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1.5 p-4 select-none">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative",
                isActive
                  ? "bg-primary text-white shadow-sm shadow-primary/10"
                  : "text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-secondary-text group-hover:text-primary transition-colors")} />
              {isOpen && <span>{item.label}</span>}
              {!isOpen && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle button */}
      <div className="hidden lg:flex p-4 border-t border-border-color dark:border-slate-800/20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-full items-center justify-center rounded-xl border border-border-color dark:border-slate-800/60 text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text transition-all"
        >
          {isOpen ? <ChevronLeft className="h-4.5 w-4.5" /> : <ChevronRight className="h-4.5 w-4.5" />}
        </button>
      </div>
    </aside>
  );
}
