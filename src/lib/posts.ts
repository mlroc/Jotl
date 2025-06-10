import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

export type PostData = {
  id: string; // Filename without extension
  contentHtml: string;
  title: string;
  date: string;
  tags: string[];
  slug: string; // The slug from frontmatter
};

export async function getSortedPostsData(): Promise<PostData[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises = fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...(matterResult.data as { title: string; date: string; tags: string[]; slug: string; }),
    };
  });

  const allPostsData = await Promise.all(allPostsDataPromises);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    // Use the slug from frontmatter directly, or fallback to filename if needed
    // For simplicity, we'll just use the filename here if slug isn't strictly required
    // If you always define slug in frontmatter, you'd parse each file here
    return {
      slug: fileName.replace(/\.md$/, ''), // For this example, we'll use filename as slug
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id: slug, // The slug is effectively the ID here
    contentHtml,
    ...(matterResult.data as { title: string; date: string; tags: string[]; slug: string; }),
  };
}