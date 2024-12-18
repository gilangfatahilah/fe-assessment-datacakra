import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[800px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url(/hero.jpg)",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
      </div>

      <div className="container relative z-10 max-w-screen-xl px-4">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex text-sm py-1 px-3 bg-gradient-to-r from-primary/80 to-primary rounded-full text-primary-foreground font-semibold">
            ✨ Find or add your own destination.
          </div>

          <div className="text-4xl md:text-6xl text-white font-bold">
            <h1>
              Your Next Adventure Starts Here, Discover the World's Best
              Destinations
            </h1>
          </div>

          <p className="max-w-2xl mx-auto text-xl text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
            dolorem omnis suscipit explicabo repudiandae debitis ducimus!
          </p>

          <div className="pt-6">
            <Button className="w-full md:w-auto font-bold group/arrow">
              <Link to={"/login"}>Get started</Link>
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
