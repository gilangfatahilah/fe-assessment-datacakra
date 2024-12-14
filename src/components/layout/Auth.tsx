import { PropsWithChildren } from "react";
import { useTheme } from "next-themes";

import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo-light.svg";

const AuthFormLayout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <section className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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

      <main className="flex items-center justify-center h-[80vh] px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-2xl">
          <img
            src={theme === "light" ? logoDark : logoLight}
            alt="Logo"
            className="mx-auto"
          />

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
