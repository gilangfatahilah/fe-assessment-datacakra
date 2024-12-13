import { version as reactVersion } from "react";

export default function App() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <p className="text-emerald-500 font-bold underline">Hellooo!</p>
      <p className="text-cyan-500">{"React v" + reactVersion} </p>
    </div>
  );
}
