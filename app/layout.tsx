import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/search-bar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Themed Blog",
  description: "A beautiful blog application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="blog-theme"
        >
          <div className="min-h-screen container mx-auto">
            <header className="max-md:px-2 sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <div className="flex flex-1 items-center justify-between gap-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 transition-transform hover:scale-105 md:space-x-3"
                  >
                    <BookOpen className="h-6 w-6 md:h-7 md:w-7" />
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 max-md:hidden">
                      Modern Blog
                    </span>
                  </Link>

                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-full max-w-[200px] md:max-w-md">
                      <SearchBar />
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </header>
            <main className="container py-8 space-y-8">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
