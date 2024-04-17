"use client";

export default function Corn({ label }) {
  return (
    <div className="dark:bg-slate-800 bg-white h-full w-full">
      {/* <TemplateLayout /> */}
      {/* <span className="text-xl font-bold pb-2">Corn for {label}</span> */}

      {/* Comming Soon */}
      <div className="h-full bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-white text-lg mb-8">
          We&aposre working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
