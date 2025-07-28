// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotl", 
  description: "A local-first, file-based publishing engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {/* Header/Navigation */}
            <header className="bg-background border-b p-4 shadow-sm">
              <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
                  {metadata.title as string}
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Example Nav Links */}
                  <Button variant="ghost" asChild className="hidden sm:inline-flex text-foreground hover:bg-accent hover:text-accent-foreground">
                    <Link href="/">Home</Link>
                  </Button>
                  {/* Add more links as your site grows, e.g., an "About" page */}
                  {/* <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
                    <Link href="/about">About</Link>
                  </Button> */}
                  <ModeToggle />
                </div>
              </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow">
              {children}
            </main>

            {/* Footer */}
            <footer className="bg-background border-t p-4 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {metadata.title as string}. All rights reserved.
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}