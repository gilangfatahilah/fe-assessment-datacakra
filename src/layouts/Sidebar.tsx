import { Home, BarChart2, Users } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";

interface Props {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: Props) => {
  const { pathname } = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/dashboard",
      active: pathname.includes("dashboard"),
    },
    {
      icon: BarChart2,
      label: "Article",
      href: "/article",
      active: pathname.includes("article"),
    },
    {
      icon: Users,
      label: "Category",
      href: "/category",
      active: pathname.includes("category"),
    },
  ];

  return (
    <>
      <div
        className={twMerge(
          "sticky z-40 h-full bg-background shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"
        )}
      >
        <div className="w-full flex items-center p-4">
          <h2 className="text-md font-semibold">Navigation Menu</h2>
        </div>

        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={twMerge(
                "w-full flex items-center hover:bg-primary/40 p-3 transition",
                item.active
                  ? "bg-primary/50 hover:bg-primary/30 text-primary"
                  : "text-foreground"
              )}
            >
              <item.icon className="mr-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;