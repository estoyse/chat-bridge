import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
    a: ["href", "title", "target", "rel"],
  },
};

type Props = {
  content: string;
};

export function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, [rehypeSanitize, sanitizeSchema]]}
      skipHtml
      components={{
        code({ className, children, ...props }) {
          const isCodeBlock = className?.startsWith("language-");
          if (isCodeBlock) {
            return (
              <pre className='code-block overflow-x-scroll bg-accent p-2 rounded'>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
          return (
            <code className='bg-accent px-1 rounded' {...props}>
              {children}
            </code>
          );
        },
        a({ href, children }) {
          return (
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
