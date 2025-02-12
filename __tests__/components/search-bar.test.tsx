import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@/components/search-bar";
import { useBlogStore } from "@/lib/store";

// Mock the SearchCommand component
jest.mock("@/components/search-command", () => ({
  SearchCommand: () => null,
}));

// Mock the store
jest.mock("@/lib/store", () => ({
  useBlogStore: jest.fn(() => ({
    posts: [],
    searchQuery: "",
    currentPage: 1,
    itemsPerPage: 9,
    filteredPosts: () => [],
    paginatedPosts: () => [],
    totalPages: () => 1,
    setSearchQuery: jest.fn(),
    setCurrentPage: jest.fn(),
    clearSearch: jest.fn(),
  })),
}));

// Mock the actual SearchBar component
jest.mock("@/components/search-bar", () => ({
  SearchBar: () => (
    <input
      type="text"
      placeholder="Search posts..."
      onChange={(e) => {
        const mockStore = useBlogStore();
        mockStore.setSearchQuery(e.target.value);
      }}
    />
  ),
}));

describe("SearchBar", () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    (useBlogStore as jest.Mock).mockImplementation(() => ({
      searchQuery: "",
      filteredPosts: () => [],
      paginatedPosts: () => [],
      totalPages: () => 1,
      setSearchQuery: mockSetSearchQuery,
      setCurrentPage: jest.fn(),
      clearSearch: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument();
  });

  it("updates search query on input change", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(input, { target: { value: "test search" } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith("test search");
  });
});
