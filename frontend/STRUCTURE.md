# Delivery Portal Frontend Structure

This document provides an overview of the frontend project structure, configuration, and component organization for the Delivery Portal application.

## 1. Directory Structure

The project follows a structured approach to organizing code:

```
src/
├── components/     # Reusable UI components
│   └── ui/         # Core UI components (buttons, inputs, etc.)
├── context/        # React context providers
├── lib/            # Utility functions and helpers
├── pages/          # Page components (routes)
├── styles/         # CSS and styling files
└── test/           # Test files
```

### Purpose of Each Directory

- **components**: Contains reusable React components used throughout the application
  - **ui**: Contains atomic UI components following a design system approach
- **context**: Contains React context providers for state management
- **lib**: Contains utility functions and helpers
- **pages**: Contains top-level page components that correspond to routes
- **styles**: Contains CSS and styling files
- **test**: Contains test files and test utilities

## 2. Configuration Files

### tsconfig.json

The TypeScript configuration is set up with the following key settings:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

**Key Features**:
- Path aliases: `@/*` resolves to `./src/*`, enabling cleaner imports
- Target ES5 for maximum browser compatibility
- JSX mode set to `react-jsx` for the React 17+ JSX transform
- Strict type checking enabled

## 3. Key Utility Functions

### src/lib/utils.ts

This file contains utility functions used throughout the application:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Functions**:
- `cn()`: Utility for merging class names, especially useful with Tailwind CSS. It combines the functionality of `clsx` (for conditional class names) and `tailwind-merge` (for resolving Tailwind CSS class conflicts).

## 4. Component Organization

Components are organized following these conventions:

### UI Components (src/components/ui/*)
- Lower-case filenames: `button.tsx`, `input.tsx`
- Focused on presentation and reusability
- Implemented with design system patterns using class-variance-authority for variants

### Regular Components (src/components/*)
- PascalCase filenames: `Navbar.tsx`, `Footer.tsx`, `HeroSection.tsx`
- Composition of UI components and business logic
- More specific to the application domain

### Context Providers (src/context/*)
- PascalCase filenames ending with "Context": `DarkModeContext.tsx`
- Implement React Context API for state management
- Used for sharing state across components

### Pages (src/pages/*)
- PascalCase filenames ending with "Page": `LandingPage.tsx`
- Top-level components that correspond to routes
- Composed of multiple components

## 5. Dependencies and Their Purposes

### UI and Styling
- **tailwindcss**: Utility-first CSS framework
- **clsx**: Utility for conditionally joining class names
- **tailwind-merge**: Utility for resolving Tailwind CSS class conflicts
- **class-variance-authority**: Utility for creating variants of components

### Component Libraries
- **@radix-ui/react-slot**: Low-level component for polymorphic component creation
- **lucide-react**: Icon library with React components

### Core Framework
- **react**: Core UI library
- **react-dom**: DOM bindings for React
- **react-router-dom**: Routing library for React

### Development Tools
- **typescript**: Static type checker
- **jest**: Testing framework
- **react-scripts**: Development scripts and configuration
- **cypress**: End-to-end testing framework

### HTTP Client
- **axios**: Promise-based HTTP client

## Best Practices for Development

1. **Naming Conventions**:
   - UI components: lowercase (`button.tsx`)
   - Regular components: PascalCase (`Navbar.tsx`)
   - Contexts: PascalCase with Context suffix (`DarkModeContext.tsx`)
   - Pages: PascalCase with Page suffix (`LandingPage.tsx`)
   - Utilities: lowercase (`utils.ts`)

2. **Import Organization**:
   - Use path aliases (`@/components/Button`) for cleaner imports
   - Group imports by type (React, third-party, internal)

3. **Component Structure**:
   - Build pages from smaller, reusable components
   - Use the UI component library for consistent design
   - Leverage context for state management when needed

4. **TypeScript Best Practices**:
   - Define proper interfaces for component props
   - Use type inference where possible
   - Avoid using `any` type

