import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface BlogStore {
  posts: Post[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  setPosts: (posts: Post[]) => void;
  setSearchQuery: (query: string) => void;
  filteredPosts: () => Post[];
  clearSearch: () => void;
  setCurrentPage: (page: number) => void;
  paginatedPosts: () => Post[];
  totalPages: () => number;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 9,
      setPosts: (posts) => set({ posts }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: "" }),
      filteredPosts: () => {
        const { posts, searchQuery } = get();
        if (!searchQuery.trim()) return posts;

        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filtered;
      },
      setCurrentPage: (page) => set({ currentPage: page }),
      paginatedPosts: () => {
        const { filteredPosts, currentPage, itemsPerPage } = get();
        const posts = filteredPosts();
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return posts.slice(start, end);
      },
      totalPages: () => {
        const { filteredPosts, itemsPerPage } = get();
        return Math.ceil(filteredPosts().length / itemsPerPage);
      },
    }),
    {
      name: "blog-storage",
    }
  )
);
