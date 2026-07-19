"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "react-hot-toast";
import { 
  Menu, 
  LogOut, 
  User, 
  ChevronDown
} from "lucide-react";
import { cn } from "@/utils/cn";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard Overview";
      case "/dashboard/roadmaps":
        return "My Enrolled Roadmaps";
      case "/dashboard/progress":
        return "Learning Progress Tracker";
      case "/dashboard/profile":
        return "Profile Settings";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out.");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border-color dark:border-slate-800/40 bg-white dark:bg-[#0c1220] px-6 select-none shadow-xxs">
      {/* Page Title & Mobile Toggle Menu Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-color dark:border-slate-800/60 text-secondary-text hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-dark-text transition-all lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-sm font-black text-dark-text uppercase tracking-wider">
          {getPageTitle()}
        </h1>
      </div>

      {/* User profile actions dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "SP"}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-dark-text leading-tight">
              {user?.name || "Developer Pathfinder"}
            </span>
            <span className="text-[10px] text-secondary-text leading-none">
              Student account
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-secondary-text" />
        </button>

        {/* Dropdown Menu block */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-border-color dark:border-slate-800 bg-white dark:bg-[#090d16] p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header info */}
            <div className="px-3.5 py-2.5 border-b border-border-color dark:border-slate-800/40 flex flex-col gap-0.5">
              <span className="text-xs font-bold text-dark-text leading-tight">{user?.name}</span>
              <span className="text-[10px] text-secondary-text truncate leading-none">{user?.email}</span>
            </div>
            
            {/* Menu Items */}
            <div className="mt-1.5 flex flex-col gap-0.5">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/dashboard/profile");
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-900/40 text-left transition-all"
              >
                <User className="h-4 w-4" />
                <span>My Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg text-red-650 hover:text-red-700 hover:bg-red-50/30 text-left transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
