"use client";

import { useEffect, useState } from "react";
import { useBlogStore } from "@/lib/store";
import { PostCard } from "@/components/post-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostListProps {
  initialPosts: any[];
}

export function PostList({ initialPosts }: PostListProps) {
  const { setPosts, filteredPosts } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPosts(initialPosts);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [initialPosts, setPosts]);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  const posts = filteredPosts();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden transition-all hover:shadow-lg"
        >
          <PostCard {...post} />
        </Card>
      ))}
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
