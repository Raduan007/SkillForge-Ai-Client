"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User, 
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Brain,
  Shield,
  Users,
  Settings
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

interface DashboardSidebarProps {
  isOpen: boolean;
  isMobileOpen?: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DashboardSidebar({ isOpen, isMobileOpen = false, setIsOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const showLabels = isOpen || isMobileOpen;

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
      label: "Mock Interviews",
      href: "/dashboard/interviews",
      icon: Brain,
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
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        "lg:translate-x-0",
        isOpen ? "lg:w-64" : "lg:w-20",
        "lg:static lg:h-[calc(100vh-65px)] lg:z-0"
      )}
    >
      {/* Brand logo container */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border-color dark:border-slate-800/20">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 transition-transform group-hover:scale-[1.03]">
            <Image 
              src="/assets/logo.png" 
              alt="SkillForge AI Logo" 
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          {showLabels && (
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
              {showLabels && <span>{item.label}</span>}
              {!showLabels && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        {user?.role === "admin" && (
          <>
            {showLabels && (
              <div className="px-3 pt-4 pb-2 text-[10px] font-black text-secondary-text uppercase tracking-widest">
                Admin
              </div>
            )}
            
            <Link
              href="/dashboard/admin"
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative",
                pathname === "/dashboard/admin"
                  ? "bg-primary text-white shadow-sm shadow-primary/10"
                  : "text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text"
              )}
            >
              <Shield className={cn("h-5 w-5 shrink-0", pathname === "/dashboard/admin" ? "text-white" : "text-secondary-text group-hover:text-primary transition-colors")} />
              {showLabels && <span>Admin Stats</span>}
              {!showLabels && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  Admin Stats
                </div>
              )}
            </Link>

            <Link
              href="/dashboard/admin/users"
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative",
                pathname.startsWith("/dashboard/admin/users")
                  ? "bg-primary text-white shadow-sm shadow-primary/10"
                  : "text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text"
              )}
            >
              <Users className={cn("h-5 w-5 shrink-0", pathname.startsWith("/dashboard/admin/users") ? "text-white" : "text-secondary-text group-hover:text-primary transition-colors")} />
              {showLabels && <span>Users</span>}
              {!showLabels && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  Users
                </div>
              )}
            </Link>

            <Link
              href="/dashboard/admin/roadmaps"
              className={cn(
                "flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative",
                pathname.startsWith("/dashboard/admin/roadmaps")
                  ? "bg-primary text-white shadow-sm shadow-primary/10"
                  : "text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text"
              )}
            >
              <Settings className={cn("h-5 w-5 shrink-0", pathname.startsWith("/dashboard/admin/roadmaps") ? "text-white" : "text-secondary-text group-hover:text-primary transition-colors")} />
              {showLabels && <span>Roadmaps</span>}
              {!showLabels && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-md">
                  Roadmaps
                </div>
              )}
            </Link>
          </>
        )}
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
