import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

export function MarkdownResponse({ content, className }: { content: string; className?: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={cn('prose prose-sm dark:prose-invert max-w-none break-words', className)}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-2" {...props} />,
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div className="my-4 rounded-md bg-secondary/50 p-4 overflow-x-auto">
              <code className="text-sm font-mono">{children}</code>
            </div>
          ) : (
            <code className="font-mono bg-muted text-muted-foreground rounded-sm px-1 py-0.5" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
