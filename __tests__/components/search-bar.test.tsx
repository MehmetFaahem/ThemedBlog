import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '@/components/search-bar'
import { useBlogStore } from '@/lib/store'

// Mock the store
jest.mock('@/lib/store')

describe('SearchBar', () => {
  const mockSetSearchQuery = jest.fn()

  beforeEach(() => {
    (useBlogStore as jest.Mock).mockImplementation(() => ({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery
    }))
  })

  it('renders search input', () => {
    render(<SearchBar />)
    
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument()
  })

  it('updates search query on input change', () => {
    render(<SearchBar />)
    
    const input = screen.getByPlaceholderText('Search posts...')
    fireEvent.change(input, { target: { value: 'test search' } })
    
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test search')
  })
})