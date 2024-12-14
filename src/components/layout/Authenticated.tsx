import { PropsWithChildren, useState } from "react";

import Sidebar from "./Sidebar";
import { Bell, Menu, Search } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

type Props = PropsWithChildren;

const AuthenticatedLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}

      {/* <aside>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </aside> */}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b border-border/40 bg-background/30 backdrop-blur dark:border-border shadow-sm px-6 py-4 flex items-center justify-between">
          <div className=" w-48 md:w-72 flex items-center justify-between space-x-6">
            <Logo />

            <Button
              onClick={toggleSidebar}
              variant={"ghost"}
              className="px-1 py-[2px]"
            >
              <Menu />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative hover:bg-gray-100 rounded-full p-2">
              <Bell className="text-gray-600" />
              <span
                className="
                absolute 
                top-0 
                right-0 
                bg-red-500 
                text-white 
                rounded-full 
                w-4 
                h-4 
                flex 
                items-center 
                justify-center 
                text-xs
              "
              >
                3
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <img
                src="/api/placeholder/40/40"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex h-full">
          <aside>
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </aside>

          <section className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-6">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
