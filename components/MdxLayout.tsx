export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="px-5 md:px-0 max-w-4xl mx-auto prose dark:prose-invert">
        <div>{children}</div>
      </div>
    </div>
  );
}
