# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pandora Admin is a Vue 3 admin panel built with TypeScript, Vite, and Tailwind CSS v4. It manages API keys, services, clients, projects, and environments through a centralized dashboard.

## Development Commands

### Starting Development

```bash
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Type-check with vue-tsc and build for production
npm run preview      # Preview production build
npm run format       # Format code with Prettier
```

### Environment Variables

Create a `.env` file (not tracked in git) with:

```
VITE_APP_NAME=Pandora-Admin
VITE_DEFAULT_TIMEOUT=10000
VITE_BASE_URL=http://localhost:8081/
```

## Architecture

### Path Aliases

The project uses TypeScript path aliases configured in both `vite.config.ts` and `tsconfig.app.json`:

- `@enums/*` - Enumerations and constants
- `@store/*` - Pinia stores
- `@views/*` - Page views
- `@types/*` - TypeScript type definitions
- `@router/*` - Vue Router configuration
- `@plugins/*` - Vue plugins
- `@services/*` - API services and repositories
- `@components/*` - Vue components
- `@composables/*` - Composable functions

### State Management (Pinia)

Stores follow the composition API pattern with explicit state, getters, and actions:

- `useAuthStore` - Authentication, token management, and redirect paths
- `useToastStore` - Toast notifications
- `useServicesStore`, `useClientsStore`, `useProjectsStore` - Resource management
- `useAPIKeysStore` - API key operations
- `useEnvironmentsStore` - Environment management
- `useBreadcrumbStore` - Navigation breadcrumbs
- `useToggleThemeStore` - Theme switching

### API Layer Architecture

**Repository Pattern**: API calls are organized in repository modules under `src/services/repositories/modules/`:

- Each repository exports a typed interface (e.g., `AuthRequests`, `ServicesRequests`)
- All repositories are aggregated in `src/services/repositories/index.ts` as a single `repositories` object
- Repositories return a `StandardResponse<T>` type with `success` flag and optional `data` or `error`

**API Configuration** (`src/services/api.ts`):

- **Main API instance (`api`)**: Includes request interceptor that auto-attaches Bearer token from localStorage
- **Reauth API instance (`apiReauth`)**: Separate instance for reauthentication (no token interceptor)
- **Global error handling**: Response interceptor handles 401 (session expired/invalid credentials), 400 validation errors, and NOT_FOUND errors
- Shows toast messages via `useToastStore`
- On 401 (except login page): saves current route to `redirectPath`, logs out user, redirects to `/login`

### Router Structure

**Modular routing** (`src/router/modules/`):

- `layout.ts` - Main layout with nested routes (Header, Sidebar, content area)
- `login.ts` - Authentication route (no layout)
- Child routes: `dashboardView.ts`, `servicesView.ts`, `clientsView.ts`, `projectsView.ts`

**Global Navigation Guard**:

- Checks `requiresAuth` meta field
- Redirects to `/login` if unauthenticated

### Type System

- **API types** (`src/types/`): Organized by domain (authentication, services, clients, projects, apiKeys, environments)
- **Enums** (`src/enums/`): Business logic constants (service status, client types, modal texts, toast messages, etc.)
- **Strict TypeScript**: Enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`

### Component Patterns

**Shared components** (`src/components/`):

- `Layout.vue` - Main app layout with router-view
- `Header.vue` + `Sidebar.vue` - Navigation components
- `Table.vue` - Generic data table with sorting/filtering
- `IndividualTable.vue` - Detail view tables
- Modals: `CreateModal.vue`, `EditModal.vue`, `RefreshModal.vue`, `RevealAPIKeyModal.vue`
- `Toast.vue` - Toast notifications (controlled by `useToastStore`)
- `Breadcrumbs.vue` - Navigation breadcrumbs

### Styling

- **Tailwind CSS v4** with DaisyUI component library
- Prettier configured with:
  - Auto-import organization (`prettier-plugin-organize-imports`)
  - Tailwind class sorting (`prettier-plugin-tailwindcss`)
  - Single quotes, consistent quote props
  - References `./src/style.css` as stylesheet

## Debugging in VSCode

The project supports full VSCode debugging with source maps. Developers should create their own `.vscode/launch.json` (not committed):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "runtimeExecutable": "/path/to/chrome",
      "sourceMaps": true,
      "trace": true
    }
  ]
}
```

**Important**: After code changes, stop (Shift+F5) and restart (F5) the debug session to reload source maps.

## Key Implementation Patterns

### Adding a New Repository

1. Create repository module in `src/services/repositories/modules/` with typed interface
2. Export interface and default implementation
3. Add to `Repositories` interface and `repositories` object in `src/services/repositories/index.ts`
4. Create corresponding types in `src/types/`

### Creating a New Store

1. Use `defineStore` with composition API pattern
2. Structure: state (refs), getters (computed), actions (functions)
3. Import `repositories` to make API calls
4. Handle loading states and errors

### Adding a New Route

1. Create route config in `src/router/modules/`
2. Import and add to parent route's children array or main routes array
3. Set `meta: { requiresAuth: true }` for protected routes
4. Create corresponding view in `src/views/`

### Error Handling Flow

1. Repository catches Axios errors, returns `{ success: false, error: string }`
2. API interceptor shows toast for HTTP errors (401, 400, NOT_FOUND, etc.)
3. Store checks `response.success` and handles errors locally if needed
4. Toast messages are centralized in `@enums/toastMessages`
