# Jotl – Local-First, File-Based Publishing Engine

Jotl is a modern, developer-focused publishing engine built with **Next.js** and **Tailwind CSS**. It empowers you to manage content via local Markdown/MDX files in a Git-based workflow, blending the simplicity of Markdown with the power of interactive React components.

---

## ✨ Features

- **Local-First Content:** All posts are stored as local `.mdx` files. No database needed.
- **Git-Based Workflow:** Manage your content with the version control you already use.
- **MDX Support:** Embed interactive React components directly in your posts.
- **Image System:** Optimized images, responsive galleries, and lightbox support. ([See Image Guide](./IMAGE_GUIDE.md))
- **Developer-Centric Tooling:** Includes a CLI script to create new posts instantly.
- **Themeable & Responsive:** Dark/light mode and a polished mobile experience out of the box.
- **Fast & SEO-Friendly:** Built with Next.js for static site generation.
- **Search & Pagination:** Quickly find posts and browse with pagination.
- **Custom Components:** Use and extend a library of UI components (cards, tags, callouts, etc.).
- **Accessibility:** Designed with accessibility best practices in mind.

---

## 🚀 Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/jotl.git
cd jotl
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Run the Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your site.

---

## 📝 Creating a New Post

You can quickly create a new post using the provided CLI script:

```bash
npm run new-post "Your New Post Title"
```

This command will create a new `.mdx` file in `src/content/posts` with the title, date, and slug pre-filled.

---

## 🖼️ Image System

- **OptimizedImage, ResponsiveImage, ThumbnailImage, ImageGallery** components
- Automatic WebP/AVIF conversion, lazy loading, and responsive sizing
- Lightbox gallery with navigation
- See [IMAGE_GUIDE.md](./IMAGE_GUIDE.md) for full usage and best practices

---

## 🛠️ Project Structure

```
Jotl/
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # UI and custom components
│   ├── content/
│   │   └── posts/          # Your MDX blog posts
│   └── lib/                # Utility functions
├── public/
│   └── images/             # Static images for posts
├── scripts/
│   └── new-post.mjs        # CLI for new posts
├── IMAGE_GUIDE.md          # Full image system documentation
├── README.md               # This file
└── package.json
```

---

## 📚 Example Posts

- `first-post.mdx` – Shows interactive components and MDX power
- `image-demo.mdx` – Demonstrates the advanced image system

---

## 🔌 Extending & Customizing

- Add new React components to `src/components/` and use them in your MDX posts.
- Customize styles via `globals.css` and Tailwind config.
- Add new UI elements using the [ShadCN UI](https://ui.shadcn.com/) system.

---

## 🧑‍💻 Developer Experience

- **TypeScript** throughout for safety and autocompletion
- **ESLint** and **Prettier** for code quality
- **Tailwind CSS** for rapid styling
- **Next.js** for fast, modern SSR/SSG

---

## 🏗️ Keeping Your Fork Up to Date

```bash
git fetch upstream
git checkout main
git merge upstream/main
# Or, to rebase:
# git rebase upstream/main
git push origin main
```

---

## 📖 More Documentation

- [Image System Guide](./IMAGE_GUIDE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)

---

## 💡 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.