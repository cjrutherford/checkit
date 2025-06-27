# Checkit Application

Checkit is a TypeScript application built with NestJS for managing user profiles, checklists, and assets. It features a modular backend API and an Angular frontend client. The backend handles user authentication, profile management (including profile pictures as assets), and checklist operations, all backed by a PostgreSQL database.

## Features

- User authentication and profile management
- Profile picture upload and asset management
- Checklist templates and runs
- Modular NestJS backend
- Angular frontend client (in `client/`)

## Prerequisites

- **Node.js:** Version 16 or higher
- **npm** or **yarn**
- **PostgreSQL:** Running instance for backend data

## Installation

1. **Clone the Repository:**
    ```bash
    git clone git@github.com:cjrutherford/checkit.git
    cd checkit
    ```

2. **Install Dependencies:**
    ```bash
    npm install  # or yarn install
    cd client && npm install  # or yarn install for frontend
    cd ..
    ```

## Configuration

1. **Database Configuration:**

    Create a PostgreSQL database named `checkit_db`. Set the following environment variable (in a `.env` file or your shell):
    ```
    DATABASE_URL="postgres://user:password@localhost:5432/checkit_db"
    ```
    Replace `user` and `password` with your PostgreSQL credentials.

2. **Other Environment Variables:**
    ```
    PORT=3000
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USERNAME=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DATABASE=checkit
    NODE_ENVIRONMENT=development|production
    ASSET_PATH=/path/to/your/asset/folder
    # Add any other environment variables as needed
    ```

## Running the Application

### Backend (NestJS)

1. **Start the Development Server:**
    ```bash
    npm run start:dev
    ```
    The backend will start on port 3000 by default.

### Frontend (Angular)

1. **Start the Angular Client:**
    ```bash
    cd client
    npm start  # or ng serve
    ```
    The frontend will start on port 4200 by default.

### Full Development Startup
1. **Build the Application**
    ```bash
    npm run build:all
    ```
2. **Run the Application**
    ```bash
    npm run start:dev
    ```

### Production Startup
1. **Build the Application**
    ```bash
    npm run build:all
    ```
2. **Run the Application**
    ```bash
    npm run start:prod
    ```

## Testing

- **Unit Tests (Backend):**
    ```bash
    npm run test
    ```
- **End-to-End Tests (Backend):**
    ```bash
    npm run test:e2e
    ```
- **Frontend Tests:**
    ```bash
    cd client
    npm run test
    ```

## Debugging

### Backend (NestJS)
- Use VS Code's built-in debugger with the `launch.json` configuration for Node.js.
- You can also run the backend in debug mode:
    ```bash
    npm run start:debug
    ```
- Set breakpoints in your TypeScript files and attach the debugger.

### Frontend (Angular)
- Use Chrome DevTools or VS Code's debugger for Angular.
- Start the frontend with source maps enabled:
    ```bash
    npm start
    ```
- Set breakpoints in your TypeScript files.

## Project Structure

- `src/` — NestJS backend source code
- `client/` — Angular frontend source code
- `test/` — End-to-end backend tests

## Support

- [NestJS Documentation](https://docs.nestjs.com/)
- [Angular Documentation](https://angular.io/docs)

## License

MIT License