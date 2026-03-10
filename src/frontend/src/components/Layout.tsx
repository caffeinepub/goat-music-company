import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookOpen,
  Clapperboard,
  LogIn,
  LogOut,
  Mic2,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const location = useLocation();

  const isLoggedIn = !!identity;

  const navLinks = [
    { to: "/", label: "Home", icon: Mic2, ocid: "nav.home.link" },
    {
      to: "/recordings",
      label: "Recordings",
      icon: Mic2,
      ocid: "nav.recordings.link",
    },
    { to: "/comics", label: "Comics", icon: BookOpen, ocid: "nav.comics.link" },
    {
      to: "/actors",
      label: "Actors",
      icon: Clapperboard,
      ocid: "nav.actors.link",
    },
    ...(isAdmin
      ? [
          {
            to: "/admin",
            label: "Admin",
            icon: Settings,
            ocid: "nav.admin.link",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.home.link"
            >
              <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center">
                <span className="font-display font-black text-primary-foreground text-xs leading-none">
                  G
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-xs uppercase tracking-widest text-foreground group-hover:text-ice transition-colors">
                  GOAT
                </span>
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  Enterprise
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    data-ocid={link.ocid}
                    className={`
                      relative px-4 py-2 text-sm font-body font-medium uppercase tracking-wider transition-colors animated-underline
                      ${isActive ? "text-ice" : "text-muted-foreground hover:text-foreground"}
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-ice"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Auth button */}
            <div className="flex items-center gap-3">
              {isInitializing ? (
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
              ) : isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  className="text-muted-foreground hover:text-foreground gap-2 uppercase tracking-wider text-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 uppercase tracking-wider text-xs font-bold"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  {isLoggingIn ? "Connecting..." : "Login"}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-body font-medium uppercase tracking-wider whitespace-nowrap transition-colors
                    ${isActive ? "bg-primary/10 text-ice" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  <link.icon className="w-3 h-3" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center">
                <span className="font-display font-black text-primary-foreground text-[10px] leading-none">
                  G
                </span>
              </div>
              <div>
                <span className="font-display font-black text-xs uppercase tracking-widest text-muted-foreground">
                  GOAT Enterprise
                </span>
                <p className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                  Recordings · Comics · Actors
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ice transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
