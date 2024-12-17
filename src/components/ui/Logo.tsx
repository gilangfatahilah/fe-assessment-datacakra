import { useThemeStore } from "@/stores/useThemeStore";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  const { theme } = useThemeStore();

  return (
    <Link to={"/"}>
      <img src={theme === "light" ? logoDark : logoLight} alt="Logo" />
    </Link>
  );
};

export default Logo;
