import dashboardLight from "@/assets/dashboard-light.webp";
import dashboardDark from "@/assets/dashboard-dark.webp";

import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";

const Hero = () => {
  const { theme } = useThemeStore();

  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto  pt-10 pb-20 md:pt-16 md:pb-32">
        <div className="text-center space-y-6">
          <div className="inline-flex text-sm py-1 px-3 bg-gradient-to-r from-primary/50  to-primary rounded-full text-primary-foreground font-semibold">
            ✨ Find or add your own Destination.
          </div>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Exploring the World's Largest
              <span className="text-transparent px-2 bg-gradient-to-r from-cyan-500 to-primary bg-clip-text">
                Nature Reserve
              </span>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            dolorem omnis suscipit explicabo repudiandae debitis ducimus!
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              Get started
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-12 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl" />
          <img
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={theme === "light" ? dashboardLight : dashboardDark}
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
