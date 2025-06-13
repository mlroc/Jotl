// src/app/[slug]/page.tsx
import { getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

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

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
          <div className="text-gray-500 text-sm mb-4">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <article
            className="prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </CardContent>
      </Card>
    </div>
  );
}