"use client"

import { Input } from "@/components/ui/input"
import { useBlogStore } from "@/lib/store"

export function SearchBar() {
  const setSearchQuery = useBlogStore((state) => state.setSearchQuery)
  const searchQuery = useBlogStore((state) => state.searchQuery)

  return (
    <div className="w-full max-w-sm">
      <Input
        type="search"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />
    </div>
  )
}