import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  showBorder?: boolean;
}

export default function Footer({ showBorder = true }: FooterProps) {
  return (
    <footer
      className={`${
        showBorder
          ? "py-8 border-t border-light-neutral dark:border-dark-neutral"
          : ""
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <Link
            href="https://www.linkedin.com/in/hui-wang-3aba98104"
            target="_blank"
            className="flex items-center space-x-2 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="mailto:jonnywang1215@gmail.com"
            className="flex items-center space-x-2 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            <Image src="/gmail.png" alt="Email" width={24} height={24} />
            <span>Email</span>
          </Link>
          <Link
            href="https://github.com/HuiWang1215"
            target="_blank"
            className="flex items-center space-x-2 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
