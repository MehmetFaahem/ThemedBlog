import { Suspense } from "react";
import { PostList } from "@/components/post-list";
import { SearchBar } from "@/components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Latest Posts
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the latest articles and insights from our community of
          writers.
        </p>
      </div>
      <PostList initialPosts={posts} />
    </div>
  );
}

function LoadingPosts() {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <PostListSkeleton />
    </div>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="space-y-3 pb-4">
            <Skeleton className="h-4 w-1/2 animate-pulse" />
            <Skeleton className="h-4 w-3/4 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-20 w-full animate-pulse" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px] animate-pulse" />
                <Skeleton className="h-4 w-[80px] animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
