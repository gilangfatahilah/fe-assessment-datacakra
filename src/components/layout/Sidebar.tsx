import React, { useState } from "react";
import { Home, BarChart2, Settings, Users, X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" },
  { icon: BarChart2, label: "Analytics", key: "analytics" },
  { icon: Users, label: "Users", key: "users" },
  { icon: Settings, label: "Settings", key: "settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");

  return (
    <>
      <div
        className={twMerge(
          "sticky z-40 h-[80vh] bg-white shadow-md transition-all duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 overflow-hidden",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={onClose}
            className="md:hidden ml-auto hover:bg-gray-100 rounded-full p-2"
          >
            <X />
          </button>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                if (window.innerWidth < 768) {
                  onClose();
                }
              }}
              className={twMerge(
                "w-full flex items-center p-4 hover:bg-gray-100 transition",
                activeMenu === item.key
                  ? "bg-primary/50 text-primary"
                  : "text-primary-foreground"
              )}
            >
              <item.icon className="mr-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
