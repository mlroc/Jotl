// src/app/page.tsx

import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchForm } from '@/components/search-form';
import { Tag } from '@/components/ui/tag';
import { PaginationControls } from '@/components/pagination-controls';

export const metadata = {
  title: 'Home | Jotl',
};

// Define props for the Home component to accept searchParams
interface HomePageProps {
  searchParams?: Promise<{
    query?: string; // Expect a search query string
    page?: string;
  }>;
}

const POSTS_PER_PAGE = 6;

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const allPosts = await getSortedPostsData();

  const query = params?.query?.toLowerCase() || '';

  // Filter posts based on the query. Now, we only have metadata here.
  const filteredPosts = allPosts.filter(post => {
    const searchableContent = [
      post.title,
      post.tags.join(' '),
      post.date,
    ].join(' ').toLowerCase();
    return searchableContent.includes(query);
  });

  const page = params?.page ? parseInt(params.page, 10) : 1;
  const pageNumber = isNaN(page) || page < 1 ? 1 : page;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (pageNumber - 1) * POSTS_PER_PAGE,
    pageNumber * POSTS_PER_PAGE
  );

  // Server Action 'searchPosts' is removed from here as client component handles form submission

  return (
    <div className="container mx-auto p-4 md:p-8">
      <section className="text-center my-8 md:my-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
          Jotl
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A local-first, file-based publishing engine.
        </p>
      </section>

      {/* Search Filter Section: Now uses the Client Component */}
      <section className="mb-8 flex items-center justify-center">
        <SearchForm /> {/* Render the new Client Component here */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map(({ id, title, date, tags, slug }) => (
            <Link href={`/posts/${slug}`} key={id} className="block group">
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
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
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            No posts found matching your search.
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <PaginationControls currentPage={pageNumber} totalPages={totalPages} />
      )}
    </div>
  );
}