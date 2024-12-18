import { PropsWithChildren } from "react";
import Logo from "../components/ui/Logo";

const AuthFormLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section className="relative flex h-32 bg-black items-end lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="/hero.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Hi there !
          </h2>

          <p className="mt-4 leading-relaxed text-white/90">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>
      </section>

      <main className="flex items-center justify-center h-[80vh] md:h-full px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-2xl">
          <div className="w-full flex justify-center">
            <Logo />
          </div>

          <p className="mt-2 text-sm text-center text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            accusamus?
          </p>

          {children}
        </div>
      </main>
    </section>
  );
};

export default AuthFormLayout;
