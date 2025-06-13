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