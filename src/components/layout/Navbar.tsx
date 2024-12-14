import { useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import Button from "@/components/ui/Button";
import ModeToggle from "../ui/ModeToggle";
import Logo from "../ui/Logo";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Blogs", href: "#blog" },
  { label: "Faqs", href: "#faq" },
];

const Navbar = () => {
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
            {navLinks.map((navLink) => (
              <a
                key={navLink.href}
                href={navLink.href}
                className="relative group"
              >
                <span>{navLink.label}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
            <div className="flex items-center gap-2">
              <Button>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant={"secondary"}>
                <Link to="/register">Register</Link>
              </Button>
            </div>

            <ModeToggle />
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileNav}
            className="md:hidden flex flex-col gap-1.5 z-50 relative"
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
      </header>

      {/* Mobile Navigation */}
      <div
        className={twMerge(
          "absolute block md:hidden top-0 left-0 w-full bg-background/30 backdrop-blur-sm border-b transform transition-transform duration-500 ease-in-out",
          isMobileNavOpen
            ? "translate-y-14 opacity-100 delay-100"
            : "-translate-y-48 opacity-100 delay-150"
        )}
      >
        <nav className="flex flex-col items-center py-4 gap-4 font-medium">
          {navLinks.map((navLink) => (
            <a
              key={navLink.href}
              href={navLink.href}
              className="relative group"
            >
              <span>{navLink.label}</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />{" "}
            </a>
          ))}
        </nav>
      </div>

      <div className="pb-20" />
    </>
  );
};

export default Navbar;
