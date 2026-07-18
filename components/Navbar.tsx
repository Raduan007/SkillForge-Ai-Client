"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Compass,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Map,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "@/providers/AppProviders";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "react-hot-toast";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

// Route Types
interface NavRoute {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  // Scrolled state for sticky header transitions
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Authentication State dynamically resolved
  const isLoggedIn = !!user;

  // Simple profile details mapped to user session with fallbacks
  const mockProfile = {
    name: user?.name || "Developer Pathfinder",
    email: user?.email || "pathfinder@skillforge.ai",
    level: "Beginner",
    streak: 3,
    badgesCount: 2,
  };

  // Logged Out Routes
  const loggedOutRoutes: NavRoute[] = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Logged In Routes
  const loggedInRoutes: NavRoute[] = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "My Roadmaps", href: "/roadmaps", icon: Map },
    { label: "AI Assistant", href: "/ai/chat", icon: MessageSquare },
  ];

  const currentRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  // Track window scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on click away
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Accessibility: close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 w-full transition-all duration-300 z-50 select-none border-b",
        isScrolled
          ? "bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md shadow-sm border-border-color/60 dark:border-slate-800/50 py-3"
          : "bg-white dark:bg-[#090d16] border-border-color dark:border-slate-800/30 py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= Logo Segment ================= */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md shadow-primary/10 transition-transform group-hover:scale-[1.03]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#090d16] transition-colors group-hover:bg-transparent">
              <Compass className="h-5.5 w-5.5 text-primary group-hover:text-white dark:group-hover:text-dark-text transition-colors duration-300" />
            </div>
          </div>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            SkillForge AI
          </span>
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <nav className="hidden md:flex items-center gap-1.5 relative">
          {currentRoutes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.label}
                href={route.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800/40",
                  isActive
                    ? "text-primary dark:text-primary-light font-bold"
                    : "text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20"
                )}
              >
                <span>{route.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ================= Action Widgets Segment ================= */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border-color dark:border-slate-800 text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 transition-all"
            aria-label="Toggle visual theme"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* User Auth Widgets */}
          {isLoggedIn ? (
            /* Logged In Widget */
            <div className="relative flex items-center gap-2.5" ref={dropdownRef}>



              {/* Profile Selector Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-border-color dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 transition-all"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-label="User navigation dropdown"
              >
                <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 text-primary dark:text-primary-light font-bold text-sm">
                  {mockProfile.name.charAt(0)}
                </div>
                <ChevronDown className={cn("h-4 w-4 text-secondary-text transition-transform", isProfileOpen && "rotate-185")} />
              </button>

              {/* Profile Dropdown Panel */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2.5 w-64 rounded-xl border border-border-color dark:border-slate-800 bg-white dark:bg-[#090d16] p-4 shadow-xl z-55 flex flex-col gap-3"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {/* Header info */}
                    <div className="flex flex-col border-b border-border-color dark:border-slate-800 pb-3">
                      <span className="text-sm font-bold text-dark-text leading-snug">{mockProfile.name}</span>
                      <span className="text-xxs text-secondary-text truncate">{mockProfile.email}</span>

                    </div>



                    {/* Links & Logout */}
                    <div className="flex flex-col gap-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-semibold rounded-lg text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all"
                        role="menuitem"
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile Settings</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                          toast.success("Successfully logged out.");
                        }}
                        className="flex items-center gap-2 px-2.5 py-2 text-xs font-bold rounded-lg text-red-650 hover:text-red-700 hover:bg-red-50/30 transition-all w-full text-left"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout Session</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Logged Out CTA Widget */
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-semibold text-secondary-text hover:text-dark-text transition-colors"
              >
                Login
              </Link>
              <Link href="/register">
                <Button
                  variant="primary"
                  size="medium"
                  className="text-xs font-bold px-5"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* ================= Mobile Menu Toggle Trigger ================= */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-border-color dark:border-slate-800 text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 transition-all"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-drawer"
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* ================= Mobile Navigation Drawer Menu ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[65px] bg-slate-950/20 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Menu Slide-down Drawer Panel */}
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 top-[65px] bg-white dark:bg-[#090d16] border-b border-border-color dark:border-slate-800 shadow-xl overflow-hidden z-45 md:hidden flex flex-col"
            >
              <div className="px-4 py-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">

                {/* Navigation Links */}
                <div className="flex flex-col gap-1.5">
                  {currentRoutes.map((route) => {
                    const isActive = pathname === route.href;
                    return (
                      <Link
                        key={route.label}
                        href={route.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all",
                          isActive
                            ? "text-primary dark:text-primary-light bg-indigo-50/30 dark:bg-indigo-950/20 font-bold"
                            : "text-secondary-text hover:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-850/20"
                        )}
                      >
                        {route.icon && <route.icon className="h-4.5 w-4.5" />}
                        <span>{route.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-border-color dark:bg-slate-800" />

                {/* Profile detail or Action button */}
                {isLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    {/* User profile card */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border-color/60 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-850/10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20 text-primary dark:text-primary-light font-black">
                        {mockProfile.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-dark-text leading-snug">{mockProfile.name}</span>
                        <span className="text-xxs text-secondary-text truncate">{mockProfile.email}</span>
                      </div>
                    </div>



                    {/* Profile Settings & Logout */}
                    <div className="flex flex-col gap-1.5 mt-1">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-secondary-text hover:text-dark-text"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                          toast.success("Successfully logged out.");
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-650 hover:text-red-700 text-left w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout Session</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="primary"
                        size="large"
                        className="w-full text-xs font-bold"
                      >
                        Register
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="large"
                        className="w-full text-xs font-bold bg-white dark:bg-transparent"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
