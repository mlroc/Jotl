import fs from 'fs';
import path from 'path';

const title = process.argv[2];

if (!title) {
  console.error('❌ Please provide a title for the post.');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w-]+/g, ''); // Remove all non-word chars

const date = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
const dir = path.join(process.cwd(), 'src', 'content', 'posts');
const filePath = path.join(dir, `${slug}.mdx`);

const content = `---
title: "${title}"
date: "${date}"
tags: []
slug: "${slug}"
---

# ${title}

Start writing your post here.
`;

fs.writeFileSync(filePath, content);

console.log(`✅ Created new post at: ${filePath}`); 