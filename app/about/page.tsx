import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src="/profile.jpeg"
            alt=""
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      </div>

      <div className="prose prose-lg mx-auto dark:prose-invert">
        <p className="text-4xl font-bold mb-6 text-black dark:text-white">
          Hi! I'm Hui. You can call me Jonny.
        </p>

        <p className="mb-6 text-black/80 dark:text-white/80">
          I'm currently a mid-senior frontend developer working at Trip.com,
          where I focus on developing mobile applications and mobile web
          experiences. My work involves creating responsive, user-friendly
          interfaces that help travelers plan and book their trips seamlessly.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-light-neutral dark:bg-dark-neutral rounded-lg">
            <div className="h-24 w-24 flex items-center justify-center mb-2">
              <Image
                src="/react-logo.svg"
                alt="React"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-black dark:text-white">
              React/React Native
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-light-neutral dark:bg-dark-neutral rounded-lg">
            <div className="h-24 w-24 flex items-center justify-center mb-2">
              <Image
                src="/next.svg"
                alt="Next"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-black dark:text-white">Nextjs</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-light-neutral dark:bg-dark-neutral rounded-lg">
            <div className="h-24 w-24 flex items-center justify-center mb-2">
              <Image
                src="/flutter-logo.png"
                alt="Flutter"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-black dark:text-white">Flutter</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
          Connect With Me
        </h2>
        <Footer showBorder={false} />
      </div>
    </div>
  );
}
