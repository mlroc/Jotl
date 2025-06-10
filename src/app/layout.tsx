// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Import Link for navigation
import { Button } from "@/components/ui/button"; // Optional: Use Shadcn Button for nav

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotl", 
  description: "Free Open Source Blog Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* Header/Navigation */}
          <header className="bg-gray-900 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
                {metadata.title as string}
              </Link>
              <div>
                {/* Example Nav Links */}
                <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
                  <Link href="/">Home</Link>
                </Button>
                {/* Add more links as your site grows, e.g., an "About" page */}
                {/* <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
                  <Link href="/about">About</Link>
                </Button> */}
              </div>
            </nav>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4 text-center text-sm">
            &copy; {new Date().getFullYear()} {metadata.title as string}. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}