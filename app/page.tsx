import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="h-full">
      <Scene />
      <div>
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to my portfolio!
        </h1>
        <p className="text-center mt-4">Scroll down to see more</p>
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to my portfolio!
        </h1>
        <p className="text-center mt-4">Scroll down to see more</p>
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to my portfolio!
        </h1>
        <p className="text-center mt-4">Scroll down to see more</p>
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to my portfolio!
        </h1>
        <p className="text-center mt-4">Scroll down to see more</p>
        <h1 className="text-4xl font-bold text-center mt-10">
          Welcome to my portfolio!
        </h1>
        <p className="text-center mt-4">Scroll down to see more</p>
      </div>
    </main>
  );
}
