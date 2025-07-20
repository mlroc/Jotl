import { getPostData, getSortedPostsData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Tag } from '@/components/ui/tag';
import { PostActions } from '@/components/post-actions';
import { InteractiveCounter } from '@/components/interactive-counter';
import { Callout } from '@/components/ui/callout';
import { OptimizedImage, ResponsiveImage, ThumbnailImage } from '@/components/ui/image';
import { ImageGallery } from '@/components/image-gallery';

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const post = await getPostData(awaitedParams.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: post.title,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const awaitedParams = await params;
  const post = await getPostData(awaitedParams.slug);

  if (!post) {
    notFound();
  }

  const filePath = `src/content/posts/${post.id}.mdx`;

  const components = {
    InteractiveCounter,
    Callout,
    OptimizedImage,
    ResponsiveImage,
    ThumbnailImage,
    ImageGallery,
    Today: () => (
      <strong>
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </strong>
    ),
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
            {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <PostActions content={post.content} filePath={filePath} />
          <article className="prose prose-blue dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </article>
        </CardContent>
      </Card>
    </div>
  );
}