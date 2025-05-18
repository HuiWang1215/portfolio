import SeriesNavigation from "./SeriesNavigation";

interface MdxLayoutProps {
  children: React.ReactNode;
  metadata?: {
    title: string;
    description: string;
    date: string;
    category: string;
    series?: string;
    slug?: string;
  };
}

export default function MdxLayout({ children, metadata }: MdxLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      <article className="w-full lg:max-w-4xl mx-auto px-4 py-8 pt-20">
        <div className="prose dark:prose-invert max-w-none [&_pre]:max-w-none [&_pre]:overflow-x-auto [&_.flex]:flex-col [&_.flex]:lg:flex-row [&_.flex-1]:w-full [&_.flex-1]:lg:w-auto">
          {children}
        </div>
      </article>
      <SeriesNavigation metadata={metadata} />
    </div>
  );
}
