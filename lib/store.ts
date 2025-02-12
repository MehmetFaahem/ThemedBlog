import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface BlogStore {
  posts: Post[];
  searchQuery: string;
  setPosts: (posts: Post[]) => void;
  setSearchQuery: (query: string) => void;
  filteredPosts: () => Post[];
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: [],
      searchQuery: '',
      setPosts: (posts) => set({ posts }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      filteredPosts: () => {
        const { posts, searchQuery } = get();
        if (!searchQuery.trim()) return posts;
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
    }),
    {
      name: 'blog-storage',
    }
  )
);