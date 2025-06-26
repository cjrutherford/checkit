# Checkit Angular Client

This is the frontend application for Checkit, built with Angular. It provides a user interface for authentication, profile management (including profile picture upload), and checklist operations, communicating with the NestJS backend API.

## Features

- User authentication (login, registration)
- User profile management (view, update, upload profile picture)
- Checklist templates and runs
- Responsive UI

## Prerequisites

- **Node.js:** Version 16 or higher
- **npm** or **yarn**
- **Angular CLI:**
    ```bash
    npm install -g @angular/cli
    ```

## Installation

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Environment configuration:**
    - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts` and update the API URL if needed.

## Running the Application

```bash
npm start
```
The app will be available at http://localhost:4200

## Testing

- **Unit tests:**
    ```bash
    npm run test
    ```
- **End-to-end tests:**
    ```bash
    npm run e2e
    ```

## Debugging

- Use Chrome DevTools or VS Code's Angular debugging tools.
- Source maps are enabled by default in development mode.

## Project Structure

- `src/app/` — Main application code (components, pages, services, types)
- `src/public/` — Static assets

## Support

- [Angular Documentation](https://angular.io/docs)

---
MIT License
