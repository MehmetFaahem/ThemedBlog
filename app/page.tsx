import { Suspense } from "react";
import { PostList } from "@/components/post-list";
import { PostListSkeleton } from "@/components/post-list-skeleton";

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
      <Suspense fallback={<PostListSkeleton />}>
        <PostList initialPosts={posts} />
      </Suspense>
    </div>
  );
}
