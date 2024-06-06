# Task Management System Frontend

## Overview

The Task Management System Frontend is a React application designed to provide a user interface for managing users and tasks. It demonstrates a variety of technical skills including state management, component-based architecture, and integration with a backend API.

## Features

1. **User Authentication:**
   - User registration and login.
   - JWT-based authentication for secure API access.

2. **Task Management:**
   - CRUD operations for tasks.
   - Task status updates (To-Do, In-Progress, Done).

3. **Dashboard:**
   - Overview of tasks based on status.

## Technologies Used

- **Language:** JavaScript
- **Framework:** React
- **State Management:** Context API
- **HTTP Client:** Axios

## Design Patterns

1. **Component-Based Architecture:**
   - UI is divided into reusable components.
   - Components: `LoginForm`, `RegisterForm`, `TaskList`, `TaskForm`, `Dashboard`.

2. **Context API for State Management:**
   - Global state management using React Context API.
   - Auth context for managing authentication state.

3. **Service Pattern:**
   - Abstracting API calls into service functions.
   - Services: `authService`, `taskService`.

## Project Structure

```plaintext
task-management-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Tasks/
│   │   │   ├── TaskList.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskItem.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   └── Navbar/
│   │       └── Navbar.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── TaskContext.js
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── App.js
│   ├── index.js
│   └── routes.js
├── package.json
└── .env
```

## Setting Up the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/tiaanels123/Task-Management-System-Frontend.git
   cd Task-Management-System-Frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   npm start
   ```

## Testing

- Unit tests using Jest and React Testing Library for components.
- Integration tests for end-to-end user flows.
