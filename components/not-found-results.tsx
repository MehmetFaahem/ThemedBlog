import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/lib/store";

export function NotFoundResults() {
  const setSearchQuery = useBlogStore((state) => state.setSearchQuery);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center">
      <h2 className="text-2xl font-bold">No posts found</h2>
      <p className="text-muted-foreground">
        Try searching with different keywords
      </p>
      <Button variant="outline" onClick={() => setSearchQuery("")}>
        Clear Search
      </Button>
    </div>
  );
}
