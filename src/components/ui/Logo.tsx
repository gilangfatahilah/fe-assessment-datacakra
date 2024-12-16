import { useThemeStore } from "@/stores/useThemeStore";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

const Logo = () => {
  const { theme } = useThemeStore();

  return <img src={theme === "light" ? logoDark : logoLight} alt="Logo" />;
};

export default Logo;
