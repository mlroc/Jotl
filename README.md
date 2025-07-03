# Jotl - A Local-First, File-Based Publishing Engine

Jotl is a lightweight, developer-focused publishing engine built with Next.js and Tailwind CSS. It empowers you to manage content via local Markdown files in a Git-based workflow, blending the simplicity of Markdown with the power of interactive React components.

## Features

- **Local-First Content:** All posts are stored as local `.mdx` files. No database needed.
- **Git-Based Workflow:** Manage your content with the version control you already use.
- **MDX Support:** Embed interactive React components directly in your posts.
- **Developer-Centric Tooling:** Includes a CLI script to create new posts instantly.
- **Themeable & Responsive:** Dark/light mode and a polished mobile experience out of the box.
- **Fast & SEO-Friendly:** Built with Next.js for static site generation.

## Creating a New Post

You can quickly create a new post using the provided CLI script.

```bash
npm run new-post "Your New Post Title"
```

This command will create a new `.mdx` file in `src/content/posts` with the title, date, and slug pre-filled.

# Project Setup Guide

This guide walks you through setting up your development environment for the project.

---

## 📦 Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [npx](https://docs.npmjs.com/cli/v9/commands/npx?v=true)

### ✅ Verify Installation

Run the following commands to confirm installation:

```bash
node -v
npm -v
npx -v
```

---

## 📂 Navigate to Project Directory

```bash
cd jotl
```

---

## 🔧 Install Dependencies

Install Tailwind CSS and initialize ShadCN UI:

```bash
npm install -D tailwindcss@next
npx shadcn-ui@latest init
```

Add essential ShadCN UI components:

```bash
npx shadcn-ui@latest add button input card
```

Install additional packages:

```bash
npm install remark remark-html
```

---

## 🚀 Run Development Server

```bash
npm run dev
```

---

## 📘 Keeping Your Fork Up to Date

To sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
# Alternatively, you can use:
# git rebase upstream/main
git push origin main
```