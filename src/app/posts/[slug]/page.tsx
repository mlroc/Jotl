// src/app/posts/[slug]/page.tsx
import { getAllPostSlugs, getPostData, PostData } from '@/lib/posts';
import { notFound } from 'next/navigation'; // Import notFound
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // Optional: Shadcn Button

// Dynamic segments are passed as props to the component
interface PostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for pre-rendering
// This function is crucial for Next.js to know which dynamic pages to build at compile time
export async function generateStaticParams() {
  const slugs = getAllPostSlugs(); // Get all slugs from your posts utility
  return slugs.map((post) => ({
    slug: post.slug,
  }));
}

// This is the component that will render your individual post page
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  let postData: PostData;
  try {
    postData = await getPostData(slug);
  } catch (error) {
    // If getPostData throws an error (e.g., file not found, parsing issue),
    // trigger Next.js's 404 page.
    console.error(`Error fetching post for slug "${slug}":`, error);
    notFound();
  }

  return (
    <article className="container mx-auto p-4 md:p-8 max-w-3xl bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        {postData.title}
      </h1>
      <p className="text-md text-gray-600 mb-6 border-b pb-4">
        <time dateTime={postData.date}>
          {new Date(postData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <span className="ml-4">
          {postData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 mr-2"
            >
              {tag}
            </span>
          ))}
        </span>
      </p>

      {/* Render the Markdown content as HTML */}
      {/* The 'prose' classes come from @tailwindcss/typography plugin */}
      <div
        className="prose prose-lg prose-gray max-w-none break-words"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

      <div className="mt-8">
        <Button asChild>
          <Link href="/">← Back to all posts</Link>
        </Button>
      </div>
    </article>
  );
}