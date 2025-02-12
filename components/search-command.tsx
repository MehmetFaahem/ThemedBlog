"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search, Loader2 } from "lucide-react";
import { useBlogStore } from "@/lib/store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function SearchCommand({ ...props }: DialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const posts = useBlogStore((state) => state.posts);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 9;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredPosts = React.useMemo(() => {
    if (!query) return posts;
    const searchQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.body.toLowerCase().includes(searchQuery)
    );
  }, [query, posts]);

  const paginatedResults = React.useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, page]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handleSelect = React.useCallback(
    async (postId: string) => {
      setIsLoading(true);
      setIsOpen(false);
      await router.push(`/post/${postId}`);
      setIsLoading(false);
      setQuery("");
    },
    [router]
  );

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setQuery("");
    }
  }, []);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative w-full max-w-sm cursor-pointer"
      >
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          className="flex h-10 w-full cursor-pointer rounded-md border border-input bg-background px-8 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search posts... (⌘K)"
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
          readOnly
        />
        {isLoading ? (
          <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin" />
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
        <DialogContent className="overflow-hidden p-0">
          <CommandPrimitive
            className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
            shouldFilter={false}
          >
            <div
              className="flex items-center border-b px-3"
              cmdk-input-wrapper=""
            >
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandPrimitive.Input
                placeholder="Search posts..."
                value={query}
                onValueChange={setQuery}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <CommandPrimitive.Empty className="py-6 text-center text-sm">
                No posts found.
              </CommandPrimitive.Empty>
              {paginatedResults.map((post) => (
                <CommandPrimitive.Item
                  key={post.id}
                  value={post.title}
                  onSelect={() => handleSelect(post.id.toString())}
                  className="relative flex cursor-default select-none flex-col gap-2 rounded-sm px-4 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex flex-col gap-1">
                    <h4 className="font-medium line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.body}
                    </p>
                  </div>
                </CommandPrimitive.Item>
              ))}

              {filteredPosts.length > 0 && (
                <div className="flex items-center justify-center p-4 border-t">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={
                            page === 1 ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((pageNumber, i) => (
                        <PaginationItem key={i}>
                          {pageNumber === "..." ? (
                            <span className="px-4 py-2">...</span>
                          ) : (
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(pageNumber as number);
                              }}
                              isActive={page === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                          className={
                            page === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </DialogContent>
      </Dialog>
    </>
  );
}
