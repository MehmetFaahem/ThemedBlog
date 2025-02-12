import { render, screen } from "@testing-library/react";
import { PostCard } from "@/components/post-card";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("PostCard", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    body: "Test post body content",
    userId: 1,
  };

  it("renders post title and body", () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });

  it("links to the correct post page", () => {
    render(<PostCard {...mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/post/${mockPost.id}`);
  });
});
