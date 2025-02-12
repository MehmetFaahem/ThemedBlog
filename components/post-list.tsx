"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/lib/store";
import { PostCard } from "@/components/post-card";
import { Card } from "@/components/ui/card";
import { NotFoundResults } from "@/components/not-found-results";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PostListProps {
  initialPosts: any[];
}

export function PostList({ initialPosts }: PostListProps) {
  const { setPosts, paginatedPosts, setCurrentPage, currentPage, totalPages } =
    useBlogStore();

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

  const posts = paginatedPosts();
  const pages = totalPages();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show max 5 page numbers at a time

    if (pages <= maxPagesToShow) {
      // If total pages are less than max, show all pages
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(pages - 1, currentPage + 1);

      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add pages around current page
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < pages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(pages);
    }

    return pageNumbers;
  };

  if (posts.length === 0) {
    return <NotFoundResults />;
  }

  return (
    <div className="space-y-6">
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

      {pages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
                      setCurrentPage(pageNumber as number);
                    }}
                    isActive={currentPage === pageNumber}
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
                  if (currentPage < pages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === pages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
