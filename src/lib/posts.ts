import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

export type PostData = {
  id: string; // Filename without extension
  content: string;
  title: string;
  date: string;
  tags: string[];
  slug: string; // The slug from frontmatter
};

export async function getSortedPostsData(): Promise<Omit<PostData, 'content'>[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as { title: string; date: string; tags: string[]; slug: string; }),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { content, data } = matter(fileContents);

  return {
    id: slug,
    content,
    ...(data as { title: string; date: string; tags: string[]; slug: string; }),
  };
}