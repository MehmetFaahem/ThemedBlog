# Themed Blog

## Project Approach and Implementation

This blog application was built with a focus on modern web development practices, emphasizing performance, accessibility, and user experience. The project uses a component-driven architecture with reusable UI components and follows a clean, maintainable code structure.

### Live Demo

[https://themed-blog.vercel.app/](https://themed-blog.vercel.app/)

### Technology Stack

- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for global state management
- **Testing**: Jest and React Testing Library
- **UI Components**:
  - Radix UI primitives for accessible components
  - shadcn/ui for pre-built components with customizable styling
  - Lucide React for icons
- **Data Fetching**: Next.js built-in data fetching with revalidation
- **Theming**: next-themes for dark/light mode support
- **Type Safety**: TypeScript for enhanced development experience
- **Hosting**: Static export configuration for flexible hosting options

### Testing

- Implemented Jest and React Testing Library for unit testing
- Used MSW for mocking API responses
- Added test coverage for components and API calls

### Key Features

- Server-side rendering and static generation capabilities
- Responsive design with mobile-first approach
- Dark/light theme switching with system preference detection
- Global state management for posts and search functionality
- Accessible UI components with ARIA support
- Loading states and skeleton screens for better UX
- Client-side search functionality
- Modular component architecture

### Challenges and Solutions

1. **Theme Implementation**

   - Challenge: Implementing dark mode with no flash of unstyled content
   - Solution: Used next-themes with mounted state check and CSS variables for smooth transitions

2. **State Management**

   - Challenge: Managing global post state with search functionality
   - Solution: Implemented Zustand store with persist middleware for efficient state management

3. **Performance Optimization**

   - Challenge: Optimizing initial page load and transitions
   - Solution:
     - Implemented lazy loading and suspense boundaries
     - Used skeleton loading states
     - Optimized bundle size with proper code splitting

4. **Type Safety**
   - Challenge: Maintaining type safety across components
   - Solution: Leveraged TypeScript with strict mode and proper interface definitions

### Development Practices

- Component-driven development with reusable UI components
- Consistent code formatting with ESLint
- Proper error handling and loading states
- Responsive design implementation
- Accessibility considerations with ARIA labels and keyboard navigation
- Clean folder structure following Next.js conventions

### AI Tools Used

- Cursor for code generation and debugging
- Bolt Code Generator for code generation

### Installation

```bash
npm install
```

### Running the project

```bash
npm run dev
```

### Building the project

```bash
npm run build
```

### Future Improvements

- Add authentication system
- Integrate with a backend API
- Add comment functionality
- Implement pagination for posts
- Add search API integration
