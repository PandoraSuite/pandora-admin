# Development Guide

This guide provides comprehensive information for developers working on the Pandora Admin project. For a general overview, see [README.md](./README.md).

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Core Modules](#core-modules)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Common Development Tasks](#common-development-tasks)
- [Testing Guidelines](#testing-guidelines)
- [Debugging](#debugging)
- [Best Practices](#best-practices)
- [Contributing](#raising_hand-contributing)

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- A code editor (VS Code recommended)
- Access to the Pandora backend API

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd pandora-admin

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your .env file
VITE_APP_NAME=Pandora-Admin
VITE_DEFAULT_TIMEOUT=10000
VITE_BASE_URL=http://localhost:8081/

# Start development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Development Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Type-check and build for production
npm run preview      # Preview production build locally
npm run format       # Format all files with Prettier
npm run lint         # Lint code (if configured)
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `refactor/*` - Code refactoring

### Typical Development Flow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/add-new-feature
   ```

2. **Make your changes** following the patterns described in this guide

3. **Format your code**:

   ```bash
   npm run format
   ```

4. **Test thoroughly** in the browser (automated tests coming soon)

5. **Commit with conventional commits**:

   ```bash
   git commit -m "feat: add new feature description"
   git commit -m "fix: resolve bug description"
   git commit -m "refactor: improve code structure"
   ```

6. **Push and create a pull request**:
   ```bash
   git push origin feature/add-new-feature
   ```

### Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows project patterns and conventions
- [ ] TypeScript types are properly defined
- [ ] No TypeScript errors (`npm run build`)
- [ ] Code is formatted (`npm run format`)
- [ ] All clickable links use markdown format for VSCode integration
- [ ] Error handling is implemented
- [ ] No console.log statements in production code
- [ ] Changes are tested in the browser
- [ ] Documentation is updated if needed

## Core Modules

### 1. Authentication Module

**Location**: [src/views/Login/](src/views/Login/)

The authentication module handles user login, password management, and session control.

**Key Components**:

- [index.vue](src/views/Login/index.vue) - Main login view
- [Header.vue](src/views/Login/components/Header.vue) - Login header component
- [PasswordInput.vue](src/views/Login/components/PasswordInput.vue) - Password input with toggle visibility
- [ResetPassword.vue](src/views/Login/components/ResetPassword.vue) - Password reset functionality

**Store**: [useAuthStore.ts](src/store/useAuthStore.ts)

- Manages JWT token storage in localStorage
- Handles login/logout operations
- Tracks redirect paths for post-login navigation
- Auto-attaches bearer token to API requests via interceptor

**Repository**: [authRepository.ts](src/services/repositories/modules/authRepository.ts)

**Features**:

- Secure JWT-based authentication
- Remember me functionality
- Automatic token refresh on 401 errors
- Redirect to intended page after login
- Password visibility toggle

### 2. Services Module

**Location**: [src/views/Services/](src/views/Services/)

Manages microservices with CRUD operations and status tracking.

**Key Components**:

- [index.vue](src/views/Services/index.vue) - Services list view
- [ServicesList.vue](src/views/Services/components/ServicesList.vue) - Data table for services
- [CreateServiceForm.vue](src/views/Services/components/CreateServiceForm.vue) - Create new service
- [EditServiceForm.vue](src/views/Services/components/EditServiceForm.vue) - Edit existing service
- [ServiceQuickActions.vue](src/views/Services/components/ServiceQuickActions.vue) - Quick action buttons

**Store**: [useServicesStore.ts](src/store/useServicesStore.ts)

**Repository**: [servicesRepository.ts](src/services/repositories/modules/servicesRepository.ts)

**Service Properties**:

- Name and description
- Base URL
- Status (Active, Development, Deprecated, Discontinued)
- Environment associations

**Operations**:

- Create, read, update, delete services
- Change service status
- View service details and associated environments

### 3. Clients Module

**Location**: [src/views/Clients/](src/views/Clients/)

Manages clients and their relationships with projects, environments, and API keys.

**Key Components**:

- [index.vue](src/views/Clients/index.vue) - Clients list and detail view
- [ClientsList.vue](src/views/Clients/components/ClientsList.vue) - Clients data table
- [ClientProjects.vue](src/views/Clients/components/ClientProjects.vue) - Projects associated with a client
- [EnvironmentAPIKeys.vue](src/views/Clients/components/EnvironmentAPIKeys.vue) - API keys per environment
- [CreateClientForm.vue](src/views/Clients/components/CreateClientForm.vue) - Create new client
- [EditClientForm.vue](src/views/Clients/components/EditClientForm.vue) - Edit client details
- [CreateClientProjectForm.vue](src/views/Clients/components/CreateClientProjectForm.vue) - Associate project with client
- [UpdateAPIKeyForm.vue](src/views/Clients/components/UpdateAPIKeyForm.vue) - Update API key settings

**Store**: [useClientsStore.ts](src/store/useClientsStore.ts)

**Repository**: [clientsRepository.ts](src/services/repositories/modules/clientsRepository.ts)

**Features**:

- Client CRUD operations
- View client projects and environments
- Manage API keys per environment
- Client-project associations
- Hierarchical data display (Client → Projects → Environments → API Keys)

### 4. Projects Module

**Location**: [src/views/Projects/](src/views/Projects/)

Organizes projects and their associations with clients and environments.

**Key Components**:

- [index.vue](src/views/Projects/index.vue) - Projects list view
- [ProjectsList.vue](src/views/Projects/components/ProjectsList.vue) - Projects data table
- [CreateProjectForm.vue](src/views/Projects/components/CreateProjectForm.vue) - Create new project
- [EditProjectForm.vue](src/views/Projects/components/EditProjectForm.vue) - Edit project details
- [ProjectsQuickActions.vue](src/views/Projects/components/ProjectsQuickActions.vue) - Quick actions

**Store**: [useProjectsStore.ts](src/store/useProjectsStore.ts)

**Repository**: [projectsRepository.ts](src/services/repositories/modules/projectsRepository.ts)

**Features**:

- Project CRUD operations
- Associate projects with clients
- Manage project environments
- View project metadata

### 5. API Keys Module

**Location**: Integrated within Clients module at [src/views/Clients/components/EnvironmentAPIKeys.vue](src/views/Clients/components/EnvironmentAPIKeys.vue)

Manages API keys with comprehensive lifecycle control.

**Key Components**:

- [EnvironmentAPIKeys.vue](src/views/Clients/components/EnvironmentAPIKeys.vue) - API keys table
- [UpdateAPIKeyForm.vue](src/views/Clients/components/UpdateAPIKeyForm.vue) - Edit API key
- [CreateAPIKeyForm.vue](src/views/Clients/components/CreateAPIKeyForm.vue) - Generate new API key
- [RevealAPIKeyModal.vue](src/components/modals/RevealAPIKeyModal.vue) - Securely reveal API key

**Store**: [useAPIKeysStore.ts](src/store/useAPIKeysStore.ts)

**Repository**: [apiKeysRepository.ts](src/services/repositories/modules/apiKeysRepository.ts)

**API Key Properties**:

- Unique key value (hashed in database)
- Expiration date (optional)
- Enabled/disabled status
- Environment association
- Creation and update timestamps

**Operations**:

- Create new API key with expiration
- Update API key settings
- Enable/disable API key
- Refresh/regenerate API key
- Reveal API key (secure one-time display)
- Delete API key

**Security Features**:

- Keys are hashed in the backend
- One-time reveal on creation
- Secure reveal with confirmation
- Expiration date enforcement

### 6. Environments Module

**Store**: [useEnvironmentsStore.ts](src/store/useEnvironmentsStore.ts)

**Repository**: [environmentsRepository.ts](src/services/repositories/modules/environmentsRepository.ts)

Manages different deployment environments for projects.

**Environment Types**:

- Development
- Staging
- Production
- Custom environments

**Features**:

- Environment CRUD operations
- Associate environments with projects
- Manage environment-specific API keys
- Environment status tracking

### 7. Dashboard Module

**Location**: [src/views/Dashboard/](src/views/Dashboard/)

Provides an overview of the system with key metrics and quick access.

**Key Components**:

- [index.vue](src/views/Dashboard/index.vue) - Main dashboard view

**Features**:

- System overview
- Quick statistics
- Recent activity
- Navigation shortcuts

## Architecture Deep Dive

### Project Structure

```
pandora-admin/
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/      # Reusable components
│   │   ├── modals/      # Modal components
│   │   └── ...
│   ├── composables/     # Vue composables
│   ├── enums/           # TypeScript enums and constants
│   ├── plugins/         # Vue plugins
│   ├── router/          # Vue Router configuration
│   │   └── modules/     # Modular route definitions
│   ├── services/        # API layer
│   │   ├── api.ts       # Axios instances
│   │   └── repositories/ # API repositories
│   ├── store/           # Pinia stores
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── public/              # Public static files
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of: import { useAuthStore } from '../../store/useAuthStore'
import { useAuthStore } from '@store/useAuthStore';

// Available aliases:
import type { Service } from '@types/services';
import { ServiceStatus } from '@enums/serviceStatus';
import { repositories } from '@services/repositories';
import ServicesView from '@views/Services/index.vue';
import Button from '@components/Button.vue';
import { useAuth } from '@composables/useAuth';
```

Aliases are configured in:

- [vite.config.ts](vite.config.ts#L11-L20) for build-time resolution
- [tsconfig.app.json](tsconfig.app.json) for TypeScript type checking

## State Management (Pinia)

All stores follow the Composition API pattern with clear separation:

**Core Stores**:

- [useAuthStore.ts](src/store/useAuthStore.ts) - Authentication and token management
- [useToastStore.ts](src/store/useToastStore.ts) - Toast notifications
- [useBreadcrumbStore.ts](src/store/useBreadcrumbStore.ts) - Navigation breadcrumbs
- [useToggleThemeStore.ts](src/store/useToggleThemeStore.ts) - Theme preferences

**Resource Stores**:

- [useServicesStore.ts](src/store/useServicesStore.ts) - Services state
- [useClientsStore.ts](src/store/useClientsStore.ts) - Clients state
- [useProjectsStore.ts](src/store/useProjectsStore.ts) - Projects state
- [useAPIKeysStore.ts](src/store/useAPIKeysStore.ts) - API keys state
- [useEnvironmentsStore.ts](src/store/useEnvironmentsStore.ts) - Environments state
- [useIdsStore.ts](src/store/useIdsStore.ts) - ID management

**Store Pattern**:

```typescript
export const useExampleStore = defineStore('example', () => {
  // State (refs)
  const data = ref<Data[]>([]);
  const loading = ref(false);

  // Getters (computed)
  const activeData = computed(() => data.value.filter((item) => item.active));

  // Actions (functions)
  async function fetchData() {
    loading.value = true;
    const response = await repositories.example.getAll();
    if (response.success) {
      data.value = response.data;
    }
    loading.value = false;
  }

  return { data, loading, activeData, fetchData };
});
```

## API Layer Architecture

### Repository Pattern

All API calls are organized using the repository pattern for maintainability and testability.

**Structure**:

```
src/services/
├── api.ts                          # Axios instances and interceptors
└── repositories/
    ├── index.ts                   # Aggregates all repositories
    └── modules/
        ├── authRepository.ts
        ├── servicesRepository.ts
        ├── clientsRepository.ts
        ├── projectsRepository.ts
        ├── apiKeysRepository.ts
        └── environmentsRepository.ts
```

**API Instances** ([src/services/api.ts](src/services/api.ts)):

- `api` - Main API instance with automatic bearer token attachment
- `apiReauth` - Separate instance for reauthentication (no token interceptor)

**Response Type**:

```typescript
interface StandardResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

**Error Handling**:

- Global interceptor handles 401 (unauthorized), 400 (validation), and NOT_FOUND errors
- Automatic logout and redirect on session expiration
- Toast notifications for user feedback
- Preserves intended route for post-login redirect

**Repository Example**:

```typescript
export interface ExampleRequests {
  getAll: () => Promise<StandardResponse<Example[]>>;
  getById: (id: string) => Promise<StandardResponse<Example>>;
  create: (data: CreateExample) => Promise<StandardResponse<Example>>;
  update: (
    id: string,
    data: UpdateExample,
  ) => Promise<StandardResponse<Example>>;
  delete: (id: string) => Promise<StandardResponse<void>>;
}

const exampleRepository: ExampleRequests = {
  getAll: async () => {
    try {
      const response = await api.get<Example[]>('/examples');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  },
  // ... other methods
};

export default exampleRepository;
```

## Routing Architecture

**Modular Routes** ([src/router/modules/](src/router/modules/)):

- [layout.ts](src/router/modules/layout.ts) - Main layout with nested routes
- [login.ts](src/router/modules/login.ts) - Authentication route (no layout)
- [dashboardView.ts](src/router/modules/dashboardView.ts) - Dashboard routes
- [servicesView.ts](src/router/modules/servicesView.ts) - Services routes
- [clientsView.ts](src/router/modules/clientsView.ts) - Clients routes
- [projectsView.ts](src/router/modules/projectsView.ts) - Projects routes

**Navigation Guard**:

- Checks `requiresAuth` meta field on routes
- Redirects unauthenticated users to `/login`
- Preserves intended route for post-login redirect

**Route Example**:

```typescript
{
  path: '/services',
  name: 'services',
  component: () => import('@views/Services/index.vue'),
  meta: {
    requiresAuth: true,
    breadcrumb: 'Services'
  }
}
```

## Component Library

### Shared Components ([src/components/](src/components/))

**Layout Components**:

- [Layout.vue](src/components/Layout.vue) - Main app layout wrapper
- [Header.vue](src/components/Header.vue) - Top navigation bar with user menu
- [Sidebar.vue](src/components/Sidebar.vue) - Side navigation menu
- [Breadcrumbs.vue](src/components/Breadcrumbs.vue) - Breadcrumb navigation

**Data Display**:

- [Table.vue](src/components/Table.vue) - Generic sortable/filterable data table
- [IndividualTable.vue](src/components/IndividualTable.vue) - Detail view table

**Modals**:

- [CreateModal.vue](src/components/modals/CreateModal.vue) - Generic create modal
- [EditModal.vue](src/components/modals/EditModal.vue) - Generic edit modal
- [RefreshModal.vue](src/components/modals/RefreshModal.vue) - API key refresh confirmation
- [RevealAPIKeyModal.vue](src/components/modals/RevealAPIKeyModal.vue) - Secure API key reveal

**Feedback**:

- [Toast.vue](src/components/Toast.vue) - Toast notification component

### Component Patterns

**Props and Emits**:

```vue
<script setup lang="ts">
interface Props {
  data: DataType[];
  loading?: boolean;
}

interface Emits {
  (e: 'update', data: DataType): void;
  (e: 'delete', id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
```

**Composables Usage**:

```typescript
import { useRouter } from 'vue-router';
import { useAuthStore } from '@store/useAuthStore';
import { useToastStore } from '@store/useToastStore';

const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();
```

## Type System

### Type Definitions ([src/types/](src/types/))

Organized by domain for better maintainability:

**Type Categories**:

- Authentication types (login, token, user)
- Service types (service, service status)
- Client types (client, client data)
- Project types (project, project data)
- API Key types (API key, key expiration)
- Environment types (environment, environment config)
- Common types (pagination, sorting, filters)

**Type Example**:

```typescript
// src/types/services.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  status: ServiceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateService {
  name: string;
  description: string;
  baseUrl: string;
  status: ServiceStatus;
}

export interface UpdateService extends Partial<CreateService> {
  id: string;
}
```

### Enumerations ([src/enums/](src/enums/))

**Key Enums**:

- Service status (Active, Development, Deprecated, Discontinued)
- Client types
- Environment types (Development, Staging, Production)
- Toast message types and content
- Modal text content
- HTTP status codes

**Enum Example**:

```typescript
// src/enums/serviceStatus.ts
export enum ServiceStatus {
  ACTIVE = 'active',
  DEVELOPMENT = 'development',
  DEPRECATED = 'deprecated',
  DISCONTINUED = 'discontinued',
}
```

## Styling System

**Tailwind CSS v4** with custom configuration:

- Utility-first CSS framework
- Custom color schemes for themes
- Responsive breakpoints
- Dark mode support

**DaisyUI Components**:

- Pre-built UI components
- Consistent design system
- Theme customization

**Prettier Integration**:

- Automatic class sorting with `prettier-plugin-tailwindcss`
- Import organization with `prettier-plugin-organize-imports`
- Consistent code formatting

**Theme Management**:

- Light/dark mode toggle
- Persistent theme preference in localStorage
- Smooth theme transitions

## Common Development Tasks

### Adding a New Feature Module

Follow the existing patterns when adding a new resource (e.g., "Teams"). Look at [Services](src/views/Services/) or [Clients](src/views/Clients/) as reference:

#### 1. Create Types

Add to [src/types/](src/types/): Main interface, Create DTO, Update DTO

**Reference**: [src/types/services.ts](src/types/services.ts)

#### 2. Create Repository

Add to [src/services/repositories/modules/](src/services/repositories/modules/):

- Define interface with method signatures
- Implement CRUD methods using `api` instance
- Return `StandardResponse<T>` for all methods
- Register in [src/services/repositories/index.ts](src/services/repositories/index.ts)

**Reference**: [src/services/repositories/modules/servicesRepository.ts](src/services/repositories/modules/servicesRepository.ts)

#### 3. Create Pinia Store

Add to [src/store/](src/store/): State (refs), Getters (computed), Actions (async functions)

**Reference**: [src/store/useServicesStore.ts](src/store/useServicesStore.ts)

#### 4. Create Views & Components

```
src/views/YourModule/
├── index.vue
└── components/
    ├── YourModuleList.vue
    ├── CreateForm.vue
    └── EditForm.vue
```

**Reference**: [src/views/Services/](src/views/Services/)

#### 5. Add Routes

Create route module in [src/router/modules/](src/router/modules/) and add to layout.

**Reference**: [src/router/modules/servicesView.ts](src/router/modules/servicesView.ts)

### Adding an Endpoint

```typescript
// 1. Update interface
export interface ServicesRequests {
  getStats: (id: string) => Promise<StandardResponse<Stats>>;
}

// 2. Implement
getStats: async (id) => {
  try {
    const response = await api.get(`/services/${id}/stats`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};
```

### Creating a Component

```vue
<script setup lang="ts">
interface Props {
  data: DataType;
  optional?: string;
}
const props = withDefaults(defineProps<Props>(), {
  optional: 'default',
});
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Template -->
  </div>
</template>
```

## Testing Guidelines

### Manual Testing Checklist

#### Authentication

- [ ] Login with valid/invalid credentials
- [ ] Logout clears session
- [ ] Protected routes redirect correctly
- [ ] 401 handling works

#### CRUD Operations

For each module (Services, Clients, Projects):

- [ ] List view loads data
- [ ] Create/edit/delete work correctly
- [ ] Validation prevents invalid submissions
- [ ] Loading states display
- [ ] Error messages show appropriately

#### UI/UX

- [ ] Navigation works
- [ ] Breadcrumbs update
- [ ] Toast notifications appear
- [ ] Modals open/close
- [ ] Tables sort correctly
- [ ] Responsive on mobile
- [ ] Theme toggle persists
- [ ] No console errors

### Browser Testing

Test in Chrome, Firefox, Safari, Edge (latest versions)

## Debugging

### VSCode Setup

Create [.vscode/launch.json](.vscode/) (not in git):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

**Note**: Restart debugger (Shift+F5 then F5) after code changes to reload source maps.

### Tools

- **Vue DevTools**: Component inspection, Pinia state, router
- **Browser DevTools**: Network tab for API calls, Console for errors
- **Debugger**: Use `debugger;` statement to pause execution

### Common Issues

| Issue                  | Solution                                        |
| ---------------------- | ----------------------------------------------- |
| API returns 401        | Check token in localStorage, verify not expired |
| Changes not reflecting | Hard refresh (Ctrl+Shift+R), clear localStorage |
| TypeScript errors      | Run `npm run build` to see all errors           |
| Route not found        | Check route is added to router config           |

## Best Practices

### Code Organization

✅ **Do:**

- Group files by feature/module
- Use clear, descriptive names
- Keep components small and focused
- Extract reusable logic to composables
- Use TypeScript for all code

❌ **Don't:**

- Create large monolithic components
- Use `any` type
- Duplicate code
- Put business logic in components (use stores)
- Commit commented-out code

### TypeScript

✅ **Do:**

```typescript
// Explicit interfaces
interface User {
  id: string;
  name: string;
}

// Type inference when obvious
const count = ref(0);

// Generics for reusability
function handle<T>(response: StandardResponse<T>) {}
```

❌ **Don't:**

```typescript
const data: any = fetchData(); // Avoid any
function process(data) {} // Implicit any
```

### Components

✅ **Do:**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

const emit = defineEmits<{
  (e: 'update', value: number): void;
}>();
</script>
```

❌ **Don't:**

```vue
<script setup lang="ts">
// Don't make direct API calls in components
const response = await repositories.users.getAll(); // Use store
</script>
```

### Error Handling

✅ **Do:**

```typescript
// In repositories: structured responses
try {
  const response = await api.get('/items');
  return { success: true, data: response.data };
} catch (error) {
  return { success: false, error: getErrorMessage(error) };
}

// In stores: check and handle
const response = await repositories.items.getAll();
if (response.success) {
  items.value = response.data;
} else {
  toastStore.showToast(response.error, 'error');
}
```

### Git Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add team management module"
git commit -m "fix: resolve token expiration issue"
git commit -m "refactor: extract form validation"
git commit -m "docs: update API guide"
git commit -m "style: format with prettier"
git commit -m "perf: optimize table rendering"
git commit -m "chore: update dependencies"
```

## :raising_hand: Contributing

We welcome contributions! Please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

If you encounter bugs, missing features, or have suggestions, open an issue or pull request.

## :lock: Security

If you discover a security vulnerability, **do not open an issue or PR**. Instead, please follow the secure disclosure process described in [`SECURITY.md`](./SECURITY.md).

## :handshake: Thanks

Thank you for helping improve **Pandora Core**. Your feedback and contributions help make this project better for everyone.
