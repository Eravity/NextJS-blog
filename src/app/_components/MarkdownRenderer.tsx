'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-slate max-w-none dark:prose-invert"
      components={{
        // Handle code blocks with syntax highlighting
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'text';

          // If this is an inline code block, render it normally
          if (!className) {
            return <code {...rest}>{children}</code>;
          }

          // For code blocks, render with syntax highlighting
          return (
            <SyntaxHighlighter
              style={dracula}
              language={language}
              PreTag="pre"
              customStyle={{
                margin: '1.5em 0',
                padding: '1em',
                borderRadius: '0.375rem',
                overflowX: 'auto',
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
        // Handle images with Next.js Image component
        img(props) {
          return (
            <Image
              src={props.src || ''}
              alt={props.alt || ''}
              width={720}
              height={400}
              className="rounded-lg"
            />
          );
        },
        // Handle links with Next.js Link component
        a(props) {
          const href = props.href || '';
          const isInternal = href.startsWith('/');

          if (isInternal) {
            return (
              <Link href={href} className="text-blue-500 hover:text-blue-700">
                {props.children}
              </Link>
            );
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {props.children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
