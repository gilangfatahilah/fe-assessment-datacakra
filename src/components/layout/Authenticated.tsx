import { PropsWithChildren, useState } from "react";
import { LogOut, Menu, User } from "lucide-react";

import Sidebar from "./Sidebar";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import ModeToggle from "../ui/ModeToggle";
import DropdownMenu from "../ui/Dropdown";
import Dialog from "../ui/Dialog";

type Props = PropsWithChildren;

const AuthenticatedLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const menuItems = [
    {
      label: "Profile",
      icon: <User />,
      navigateTo: "/profile",
    },
    {
      label: "Logout",
      icon: <LogOut />,
      onClick: () => setIsDialogOpen(true),
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Are you sure ?"
      >
        You will redirected to home page.
      </Dialog>

      <div className="flex h-screen">
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
              <ModeToggle />
              <DropdownMenu items={menuItems}>
                <img
                  src="/api/placeholder/40/40"
                  alt="User"
                  className="w-10 h-10 border border-border rounded-full"
                />
              </DropdownMenu>
            </div>
          </header>

          <main className="flex h-full">
            <aside>
              <Sidebar isOpen={isSidebarOpen} />
            </aside>

            <section className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-6">
              {children}
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
