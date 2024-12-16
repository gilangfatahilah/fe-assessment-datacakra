import { PropsWithChildren, useState } from "react";
import cookies from "js-cookie";
import { LogOut, Menu, User, UserRound } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

import Sidebar from "./Sidebar";
import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import ModeToggle from "../components/ui/ModeToggle";
import DropdownMenu from "../components/ui/Dropdown";
import Dialog from "../components/ui/Dialog";

type Props = PropsWithChildren;

const AuthenticatedLayout = ({ children }: Props) => {
  // const navigate = useNavigate();
  const { setUser } = useAuthStore();
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

  const handleLogout = () => {
    cookies.remove("jwt_token");
    setUser(null);
  };

  return (
    <>
      <Dialog
        title="Are you sure ?"
        confirmText="Yes"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onConfirm={handleLogout}
      >
        You will redirected to home page.
      </Dialog>

      <div className="flex h-full min-h-screen">
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

            <div className="flex items-center space-x-2">
              <ModeToggle />
              <DropdownMenu items={menuItems}>
                {/* <img
                  src="/api/placeholder/40/40"
                  alt="User"
                  className="w-10 h-10 border border-border rounded-full"
                /> */}
                <Button size={"icon"} variant={"ghost"}>
                  <UserRound className="w-[1.2rem] h-[1.2rem]" />
                </Button>
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
