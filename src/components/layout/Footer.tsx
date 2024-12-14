import Logo from "../ui/Logo";

export const Footer = () => {
  return (
    <footer className="w-full mt-10 pb-20 bg rounded-t-xl bg-secondary">
      <div className="p-10 border-t border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Logo />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Github
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Instagram
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Platforms</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                iOS
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Android
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Web
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Help</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Contact Us
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                FAQ
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Feedback
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Socials</h3>
            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Twitch
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Discord
              </a>
            </div>

            <div>
              <a href="#" className="opacity-60 hover:opacity-100">
                Dribbble
              </a>
            </div>
          </div>
        </div>

        {/* <div className="block border-b border-black w-1/4 h-2 my-6" /> */}

        <h3 className="mt-6 font-medium">
          &copy; developed by
          <a
            target="_blank"
            href="https://github.com/gilangfatahilah"
            className="text-primary transition-all border-primary hover:border-b-2 ml-1"
          >
            Gilang Fatahilah
          </a>
        </h3>
      </div>
    </footer>
  );
};
