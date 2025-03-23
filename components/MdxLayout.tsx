interface MdxLayoutProps {
  children: React.ReactNode;
}

export default function MdxLayout({ children }: MdxLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </article>
  );
}
