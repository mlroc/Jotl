import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
  description: 'Browse all topics and categories.',
};

export default async function TagsPage() {
  const allPosts = await getSortedPostsData();

  const tagCounts: Record<string, number> = {};
  allPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-extrabold text-foreground mb-8">
        All Tags
      </h1>
      <div className="flex flex-wrap gap-4">
        {sortedTags.map(tag => (
          <Link
            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
            key={tag}
            className="flex items-center gap-2 rounded-full border bg-card text-card-foreground p-2 pr-4 transition-colors hover:bg-accent hover:border-primary/50 shadow-sm"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {tag}
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {tagCounts[tag]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 