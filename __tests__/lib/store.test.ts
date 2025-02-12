import { create } from 'zustand'
import { useBlogStore } from '@/lib/store'

// Clear the store between tests
beforeEach(() => {
  const store = useBlogStore.getState()
  store.setPosts([])
  store.setSearchQuery('')
})

describe('Blog Store', () => {
  const initialPosts = [
    { id: 1, title: 'Post 1', body: 'Content 1' },
    { id: 2, title: 'Post 2', body: 'Content 2' }
  ]

  it('sets posts correctly', () => {
    const store = useBlogStore.getState()
    store.setPosts(initialPosts)
    expect(store.posts).toEqual(initialPosts)
  })

  it('filters posts based on search query', () => {
    const store = useBlogStore.getState()
    store.setPosts(initialPosts)
    store.setSearchQuery('Post 1')
    
    const filtered = store.filteredPosts()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Post 1')
  })

  it('returns all posts when search query is empty', () => {
    const store = useBlogStore.getState()
    store.setPosts(initialPosts)
    store.setSearchQuery('')
    
    const filtered = store.filteredPosts()
    expect(filtered).toHaveLength(2)
  })
})