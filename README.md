# CozyNote 📝

CozyNote is a modern note-taking application built with Next.js 14, TypeScript, and Supabase. It features a cozy, user-friendly interface for managing personal notes with categorization and real-time updates.

## See Live Demo: https://cozy-notes-app.vercel.app/login

## Project Overview

This project was developed as a demonstration of modern web development practices, leveraging the power of Next.js, TypeScript, and Supabase. It showcases how to build a fully-functional, type-safe application with authentication, real-time updates, and a clean, responsive UI.

### Key Technologies and Patterns

- **Next.js 14**: Utilizing the App Router for efficient, server-side rendered React applications.
- **TypeScript**: Ensuring type safety throughout the entire codebase.
- **Supabase**: For authentication and real-time database operations.
- **React Query**: Managing server state and caching.
- **Tailwind CSS**: For utility-first, responsive styling.
- **Container-Presentational Pattern**: Separating logic and presentation for better maintainability and testability.

## Architecture & Development Approach

### TypeScript & Type Safety

The project is built with TypeScript and maintains strict type checking throughout the codebase. This provides:
- Complete type safety across the application
- Better developer experience with IDE support
- Reduced runtime errors through compile-time checking
- Clear interfaces for data structures and API responses

### Container-Presentational Pattern

CozyNote implements the Container-Presentational pattern (also known as Smart/Dumb components) for its main features:

```typescript
// Container Component (Smart)
function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { notes, createNote, updateNote, deleteNote } = useNotes()
  // ... business logic

  return (
    <NotesPresentation
      notes={notes}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      // ... props
    />
  )
}

// Presentational Component (Dumb)
function NotesPresentation({ notes, selectedCategory, onCategoryChange }: NotesPresentationProps) {
  return (
    // ... pure UI rendering
  )
}
```

Benefits of this pattern:
- Clear separation of concerns (similar to MVC/MVVM)
- Improved testability of UI components
- Better reusability of presentational components
- Simplified state management in container components

This pattern is implemented in the main pages (login, notes and note editing), providing a clear separation of concerns and improving the overall architecture of the application.

### Rapid Prototyping with Vercel V0

This project utilized Vercel's V0, an AI-powered development tool, primarily for initial setup and boilerplate code generation. V0 was helpful in:
- Setting up the initial project structure
- Generating basic component templates
- Providing starting points for page layouts

While V0 was instrumental in getting the project off the ground quickly, it's important to note that significant manual refinement was necessary:
- Every page and component generated by V0 was thoroughly reviewed and adjusted
- Styles were fine-tuned to align precisely with design requirements
- Functionality was often expanded or modified to meet specific project needs
- Integration between components and with backend services required careful manual implementation

The development process can be summarized as:
1. Use V0 to generate initial boilerplate and basic structures
2. Manually review and refine each generated component and page
3. Implement additional features and ensure alignment with project requirements
4. Integrate components with state management and backend services
5. Perform thorough testing and make necessary adjustments

This approach combined the rapid prototyping benefits of AI assistance with the precision and customization of manual development, resulting in a polished, production-ready application that fully meets the project's specific requirements.

### Key Features & Implementation

#### Authentication (Supabase)
- Email/password authentication
- Protected routes with middleware
- Session management
- Redirect handling

#### State Management
- React Query for server state
- Local state with React hooks
- Debounced updates for note editing
- Real-time data synchronization

#### Fake Backend & API

CozyNote uses a fake backend for notes management to simplify prototyping and local development. It relies on:
- An **in-memory database** powered by a simple JavaScript \`Map\` (\`notesDb\`) to store notes.
- **User verification** via Supabase’s \`auth.getSession()\` for a realistic authentication check before performing actions.

All note-related operations (list, create, update, and delete) are housed in the \`api.notes\` object, which checks the logged-in user’s ID from Supabase before reading or writing data to the \`notesDb\`.

#### React Hooks & Supabase Provider

**SupabaseProvider**
- The **SupabaseProvider** creates and manages a single instance of the Supabase client (\`createClientComponentClient()\`).
- It also listens for authentication state changes through \`supabase.auth.onAuthStateChange(...)\`, triggering a Next.js router refresh when a user signs in or out.
- Session data is passed as a prop to ensure your components always receive the latest session state.

**useSupabase**
- The **useSupabase** hook provides convenient, direct access to the Supabase client from anywhere in the app.
- Internally, it uses React context to ensure only one Supabase client is ever instantiated, avoiding redundant setups and potential inconsistencies.

**useNotes**
- The **useNotes** hook (built with React Query) directly calls the fake backend functions (\`api.notes.*\`) to **list, create, update, and delete** notes.
- It automatically handles **caching** and **query invalidation**, so your notes are always in sync with the in-memory database.
- By depending on the Supabase session check, every note action is scoped to the currently logged-in user.

#### Styling
- Tailwind CSS for utility-first styling
- Shadcn/ui providing a set of basic, accessible, customizable UI components.
- Custom color scheme
- Consistent component theming

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

To obtain these keys:
1. Create a Supabase account and project.
2. Copy the URL and anon key once the project finishes initialization.
3. Ensure **email authentication** is enabled (it should be by default) under **Authentication -> Providers**.
4. Disable **email verification** if you want to log in immediately after signing up (without verifying email).

### Installation

```bash
# Clone the repository
git clone https://github.com/arizakevin/cozynote.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

The easiest way to deploy CozyNote is through [Vercel](https://vercel.com):

1. Push your code to a Git repository.
2. Import the project to Vercel.
3. Add your environment variables.
4. Deploy!
