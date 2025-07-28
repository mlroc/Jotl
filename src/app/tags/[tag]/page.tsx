import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags).map(tag => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const awaitedParams = await params;
  const tag = decodeURIComponent(awaitedParams.tag);
  return {
    title: `Posts tagged with "${tag}"`,
    description: `Find all posts tagged with "${tag}".`,
  };
}


export default async function TagPage({ params }: TagPageProps) {
  const allPosts = await getSortedPostsData();
  const awaitedParams = await params;
  const tag = decodeURIComponent(awaitedParams.tag);

  const filteredPosts = allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag)
  );
  
  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-extrabold text-foreground mb-6 capitalize">
        Posts Tagged: <span className="text-primary">{tag}</span>
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredPosts.map(({ id, title, date, tags, slug }) => (
          <Link href={`/posts/${slug}`} key={id} className="block group">
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
} 