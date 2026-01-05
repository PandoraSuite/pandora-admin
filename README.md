# Pandora Admin

> A modern, efficient, type-safe, and secure admin panel for managing API Keys, quotas, and access to services.

Pandora Admin is a Vue 3-based Single Page Application (SPA) that provides a centralized dashboard for managing your API infrastructure. Built with TypeScript, Vite, and Tailwind CSS v4, it offers a robust and scalable solution for API key management and service administration.

## :sparkles: Features

- **Authentication & Security**: Secure login with JWT token management and automatic session handling
- **API Key Management**: Create, edit, enable/disable, refresh, and reveal API keys with expiration tracking
- **Service Administration**: Manage microservices with status monitoring (active, development, deprecated, discontinued)
- **Client Management**: Organize clients and associate them with projects and environments
- **Project Organization**: Create and manage projects with client associations
- **Environment Control**: Handle multiple environments (development, staging, production) per project
- **Real-time Notifications**: Toast-based feedback system for all operations
- **Theme Support**: Dark/light mode toggle with persistent preferences
- **Breadcrumb Navigation**: Clear hierarchical navigation throughout the application
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and DaisyUI

## :hammer_and_wrench: Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4 + DaisyUI
- **HTTP Client**: Axios
- **Icons**: FontAwesome
- **Date Picker**: @vuepic/vue-datepicker
- **Code Quality**: Prettier with auto-import organization

## :rocket: Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pandora-admin

# Install dependencies
npm install

# Create environment file
cp .env .env.local  # and configure your variables
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Pandora-Admin
VITE_DEFAULT_TIMEOUT=10000
VITE_BASE_URL=http://localhost:8081/
```

### Development

```bash
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Type-check and build for production
npm run preview      # Preview production build
npm run format       # Format code with Prettier
```

## :building_construction: Project Architecture

### Directory Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Layout.vue      # Main app layout
│   ├── Header.vue      # Top navigation
│   ├── Sidebar.vue     # Side navigation
│   ├── Table.vue       # Generic data table
│   └── modals/         # Modal components
├── views/              # Page views organized by feature
│   ├── Login/          # Authentication views
│   ├── Dashboard/      # Dashboard view
│   ├── Services/       # Service management
│   ├── Clients/        # Client management
│   └── Projects/       # Project management
├── store/              # Pinia stores
├── router/             # Vue Router configuration
│   └── modules/        # Route modules
├── services/           # API layer
│   ├── api.ts         # Axios instances
│   └── repositories/   # Repository pattern
│       └── modules/    # Feature-specific repositories
├── types/              # TypeScript type definitions
├── enums/              # Enumerations and constants
├── composables/        # Composable functions
└── plugins/            # Vue plugins
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@enums/*` - Enumerations and constants
- `@store/*` - Pinia stores
- `@views/*` - Page views
- `@types/*` - TypeScript type definitions
- `@router/*` - Vue Router configuration
- `@plugins/*` - Vue plugins
- `@services/*` - API services and repositories
- `@components/*` - Vue components
- `@composables/*` - Composable functions

Example usage:

```typescript
import { useAuthStore } from '@store/useAuthStore';
import { ServiceStatus } from '@enums/serviceStatus';
import type { Service } from '@types/services';
```

## :handshake: Contributing

This is a community-driven project. We welcome contributions!

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `npm run format` to ensure code style consistency
5. Commit your changes following [conventional commits](https://www.conventionalcommits.org/)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow the existing code patterns
- Use TypeScript strict mode
- Write descriptive variable and function names
- Add JSDoc comments for complex functions
- Ensure all types are properly defined
- Run Prettier before committing

### Adding New Features

**Repository**:

1. Create repository module in `src/services/repositories/modules/`
2. Define typed interface for API methods
3. Export and add to `repositories` object in `src/services/repositories/index.ts`

**Store**:

1. Use `defineStore` with Composition API
2. Separate state (refs), getters (computed), and actions (functions)
3. Handle loading states and errors
4. Import and use repositories for API calls

**Route**:

1. Create route config in `src/router/modules/`
2. Add to parent route's children or main routes array
3. Set `meta: { requiresAuth: true }` for protected routes
4. Create corresponding view in `src/views/`

**Types**:

1. Add type definitions in `src/types/`
2. Use interfaces for objects, types for unions/primitives
3. Export all types for reuse

## :bug: Debugging

Debugging allows you to inspect the flow of the application, pause execution at breakpoints, and view values in real time. This can greatly improve development efficiency and help identify issues quickly.

While this project is frameworked as a SPA using Vue 3 and Vite, source maps are fully supported, enabling IDEs like VSCode to provide step-by-step debugging with minimal setup.

### :computer: VSCode

This project supports full debugging inside Visual Studio Code, using breakpoints and the DevTools Protocol.

> **_Note: Each developer should create their own debug configuration locally. Do not commit it to the repository._**

#### :wrench: Steps to Enable Debugging in VSCode

1. Open VSCode and go to the **Run and Debug** tab (Ctrl + Shift + D).
2. Click on "**Create a launch.json file**".
3. Choose the environment: **Chrome**.
4. Replace the contents of the generated file with:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "<web app>",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "runtimeExecutable": "<browser executable>",
      "sourceMaps": true,
      "trace": true
    }
  ]
}
```

In the replaced json, the following fields must be confirmed:

- **\<web app>:** this should be the type of browser to use, the most common options are chrome or firefox
  > **_Note: any chomium-based browser falls under the chrome type._**
- **\<browser executable>:** this should be the path of the browser executable.

  > Find it by running:
  >
  > - On Linux: `which chrome`
  > - On Windows: `where chrome` (_PowerShell_)
  >
  > :warning: **Note for Windows**: Sometimes `where chrome` may not return a result, depending on how the browser was installed or your PATH configuration. In that case, you can manually browse to the executable location.
  >
  > Common paths include:
  >
  > - `C:\Program Files\Google\Chrome\Application\chrome.exe`
  > - `C:\Users\<your_username>\AppData\Local\Google\Chrome\Application\chrome.exe`

:rocket: To Start Debugging

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Press F5 in VSCode.
3. A new browser window will open at `http://localhost:5173`.
4. Place breakpoints in your `.ts` or `.vue` files and start debugging.

> :warning: **Important:** After making changes to your code (especially logic or structure), VSCode **does not automatically reload the updated source maps** inside the debug session.
>
> You must **manually stop (Shift + F5)** and **restart (F5)** the debug session to ensure breakpoints and code match properly.
>
> This is a limitation of browser-based debugging and source map caching, not a bug in your setup.

### :wrench: Debugging with Other IDEs

If you configure debugging for another IDE (like WebStorm, Neovim, Emacs, or Eclipse Theia), please feel free to contribute your setup by extending this section in the README. Keep in mind:

- Keep the configuration scoped to your IDE.
- Avoid modify project-specific files.

## :rocket: Developer Setup

Ready to dive in? For a full guide on setting up your development environment, running the project, and debugging:

:point_right: See our comprehensive [DEVELOPMENT.md](./DEVELOPMENT.md) guide.

## :compass: Project Status

**Pandora Admin** is under active development.

We're continuously working to enhance its capabilities.

## :page_facing_up: License

This project is licensed under the terms of the MIT license.

## :speech_balloon: Support

For issues, questions, or contributions:

- Open an issue on GitHub
- Check existing issues for solutions
- Join our community discussions
- Submit pull requests for improvements

**Made with :heart: by the Pandora community**
