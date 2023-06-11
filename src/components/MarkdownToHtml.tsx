import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

type Props = {
  markdown: string;
};

export default function MarkdownToHtml({ markdown }: Props) {
  return (
    // @ts-expect-error RSC
    <MDXRemote
      source={markdown}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkToc],
          rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            rehypePrism,
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ['anchor'],
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
