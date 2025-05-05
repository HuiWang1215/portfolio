import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  children,
  language = "javascript",
  className = "",
}: CodeBlockProps) {
  return (
    <div className={className}>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          padding: "1rem",
          fontSize: "0.9rem",
          height: "100%",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
