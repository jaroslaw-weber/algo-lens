import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownContent }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 mt-6" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mb-3 mt-5" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mb-2 mt-4" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-xl font-medium mb-2 mt-3" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-lg font-medium mb-2 mt-2" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-base font-medium mb-2 mt-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />,
        code: ({ node, ...props }: any) => {
          const children = node.children;
          const child = children[0]
          console.log("code", child)
          const inline = !child.value.includes("\n")
          return inline ? (
            <code className="inline-block bg-gray-200 px-1 py-0.5 rounded" {...props} />
          ) : (
            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
              <code {...props} />
            </pre>
          );
        },
        table: ({ node, ...props }) => <table className="table-auto w-full mb-4" {...props} />,
        thead: ({ node, ...props }) => <thead className="bg-gray-200" {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr {...props} />,
        th: ({ node, ...props }) => <th className="px-4 py-2 text-left" {...props} />,
        td: ({ node, ...props }) => <td className="border px-4 py-2" {...props} />,
        hr: ({ node, ...props }) => <hr className="my-8 border-gray-300" {...props} />,
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;