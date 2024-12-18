import { useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/stores/useAuthStore";

import Button from "@/components/ui/Button";
import ModeToggle from "../components/ui/ModeToggle";
import Logo from "../components/ui/Logo";

const mobileNavMenus = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const Navbar = () => {
  const { user } = useAuthStore();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/30 backdrop-blur dark:border-border">
        <div className="container h-14 flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 font-medium">
            {user ? (
              <Button>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant={"secondary"}>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            <ModeToggle />
          </nav>

          <div className="md:hidden flex gap-2 items-center">
            <ModeToggle />

            <button
              onClick={toggleMobileNav}
              className="flex flex-col gap-1.5 z-50 relative"
            >
              <span
                className={twMerge(
                  "block w-6 h-0.5 bg-current transition-transform duration-300",
                  isMobileNavOpen && "rotate-45 translate-y-2"
                )}
              ></span>
              <span
                className={twMerge(
                  "block w-6 h-0.5 bg-current transition-opacity duration-300",
                  isMobileNavOpen && "opacity-0"
                )}
              ></span>
              <span
                className={twMerge(
                  "block w-6 h-0.5 bg-current transition-transform duration-300",
                  isMobileNavOpen && "-rotate-45 -translate-y-2"
                )}
              ></span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={twMerge(
          "fixed block md:hidden top-0 z-50 left-0 w-full bg-background/30 backdrop-blur-sm border-b transform transition-transform duration-500 ease-in-out",
          isMobileNavOpen
            ? "translate-y-14 opacity-100 delay-100"
            : "-translate-y-48 opacity-100 delay-150"
        )}
      >
        <nav className="flex flex-col items-center py-4 gap-4 font-medium">
          {user && <Link to={"/dashboard"}>Dashboard</Link>}

          {!user &&
            mobileNavMenus.map((menu) => (
              <Link key={menu.href} to={menu.href}>
                {menu.label}
              </Link>
            ))}
        </nav>
      </div>

      {/* <div className="pb-20" /> */}
    </>
  );
};

export default Navbar;
