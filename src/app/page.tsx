// src/app/page.tsx

import { getSortedPostsData, PostData } from '@/lib/posts';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { SearchForm } from '@/components/search-form'; // Import the new Client Component

// Define props for the Home component to accept searchParams
interface HomePageProps {
  searchParams?: {
    query?: string; // Expect a search query string
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const allPostsData: PostData[] = await getSortedPostsData();
  const searchQuery = searchParams?.query?.toLowerCase() || ''; // Get query, convert to lowercase for case-insensitive search

  // Filter posts based on the search query (logic remains the same, as it's pure)
  const filteredPosts = searchQuery
    ? allPostsData.filter((post) => {
        const lowerTitle = post.title.toLowerCase();
        const lowerTags = post.tags.map((tag) => tag.toLowerCase());
        const lowerSlug = post.slug.toLowerCase();
        const postDate = new Date(post.date);
        const monthName = postDate.toLocaleString('en-US', { month: 'long' }).toLowerCase();
        const monthShort = postDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();
        const dayTwoDigit = postDate.toLocaleString('en-US', { day: '2-digit' });
        const yearNumeric = postDate.toLocaleString('en-US', { year: 'numeric' });
        const rawDateStringMatch = post.date.includes(searchQuery);

        return (
          lowerTitle.includes(searchQuery) ||
          lowerTags.some((tag) => tag.includes(searchQuery)) ||
          lowerSlug.includes(searchQuery) ||
          rawDateStringMatch ||
          monthName.includes(searchQuery) ||
          monthShort.includes(searchQuery) ||
          dayTwoDigit.includes(searchQuery) ||
          yearNumeric.includes(searchQuery)
        );
      })
    : allPostsData; // If no query, show all posts

  // Server Action 'searchPosts' is removed from here as client component handles form submission

  return (
    <div className="container mx-auto p-4 md:p-8">
      <section className="text-center my-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Jotl
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Free Open Source Blog Website
        </p>
      </section>

      {/* Search Filter Section: Now uses the Client Component */}
      <section className="mb-8 flex items-center justify-center">
        <SearchForm /> {/* Render the new Client Component here */}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, title, date, tags, slug }) => (
            <Link href={`/posts/${slug}`} key={id} className="block group">
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No posts found matching your search.
          </p>
        )}
      </section>
    </div>
  );
}