// src/app/[slug]/page.tsx
import { getPostData, getSortedPostsData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Tag } from '@/components/ui/tag';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { InteractiveCounter } from '@/components/interactive-counter';
import { Callout } from '@/components/ui/callout';

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const slug = params.slug;
  let post;
  try {
    post = await getPostData(slug);
  } catch (e) {
    return notFound();
  }

  if (!post) return notFound();

  // A component to render the current date, which we'll make available to MDX.
  const Today = () => (
    <strong>
      {new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </strong>
  );

  const components = {
    InteractiveCounter,
    Callout,
    Today, // Make the Today component available
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">{post.title}</CardTitle>
          <div className="text-muted-foreground text-sm mb-4">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {post.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <article className="prose prose-blue dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </article>
        </CardContent>
      </Card>
    </div>
  );
}