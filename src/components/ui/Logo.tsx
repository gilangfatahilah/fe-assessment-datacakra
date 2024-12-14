import { useTheme } from "next-themes";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

const Logo = () => {
  const { theme } = useTheme();

  return <img src={theme === "light" ? logoDark : logoLight} alt="Logo" />;
};

export default Logo;
