# React Application Project

## Project Overview
This project is a React-based web application with three main components:
1. A counter component with animated background
2. A user data form with persistence
3. Rich text editors for data visualization

The application is built using TypeScript, Material UI/Chakra UI, React Spring for animations, React Router for navigation, and Redux Toolkit for state management.

## Project Structure

```
ui/
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package.json
├─ public/
│  └─ vite.svg
├─ README.md
├─ src/
│  ├── assets/
│  │   └── images/
│  ├── components/
│  │   ├── Counter/
│  │   │   ├── Counter.tsx
│  │   │   └── CounterStyles.ts
│  │   ├── Dashboard/
│  │   │   ├── Dashboard.tsx
│  │   │   └── DashboardStyles.ts
│  │   ├── Form/
│  │   │   ├── UserForm.tsx
│  │   │   └── UserFormStyles.ts
│  │   ├── RichTextEditor/
│  │   │   ├── RichTextEditor.tsx
│  │   │   └── RichTextEditorStyles.ts
│  │   ├── UI/
│  │   │   ├── Button.tsx
│  │   │   ├── Card.tsx
│  │   │   ├── Navbar.tsx
│  │   │   └── UnsavedChangesModal.tsx
│  │   └── Auth/
│  │       ├── Login.tsx
│  │       └── PrivateRoute.tsx
│  ├── hooks/
│  │   ├── useCounter.ts
│  │   └── useUnsavedChanges.ts
│  ├── context/
│  │   └── AuthContext.tsx
│  ├── store/
│  │   ├── store.ts
│  │   └── userSlice.ts
│  ├── theme/
│  │   └── theme.ts
│  ├── utils/
│  │   └── helpers.ts
│  ├── pages/
│  │   ├── HomePage.tsx
│  │   ├── DashboardPage.tsx
│  │   ├── UserFormPage.tsx
│  │   ├── RichTextEditorPage.tsx
│  │   └── LoginPage.tsx
│  ├── App.tsx
│  ├── index.tsx
│  └── routes.tsx
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets/
│  │   └─ react.svg
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Component Structure and State Management

### 1. Counter Component
- **File**: `src/components/Counter/Counter.tsx`
- **State Management**: Custom hook (`useCounter.ts`)
- **Features**:
  - Increment, decrement, and reset functionality
  - Persistent count across re-renders using local state
  - Animated background that increases in height based on count using React Spring
  - Bezier curve animation for smooth transitions
  - Reset button that returns background to initial state

### 2. User Data Form
- **File**: `src/components/Form/UserForm.tsx`
- **State Management**: Redux Toolkit (`userSlice.ts`)
- **Features**:
  - Form fields for name, address, email, and phone
  - Auto-generated user ID
  - Data persistence using Redux Toolkit
  - Unsaved changes detection with custom hook (`useUnsavedChanges.ts`)
  - Modal prompt when attempting to close with unsaved changes



### 3. Rich Text Editor
- **File**: `src/components/RichTextEditor/RichTextEditor.tsx`
- **State Management**: Local state with Redux integration
- **Features**:
  - Formatting options (bold, italic, underline, lists)
  - Visualization of user data
  - Data persistence through Redux store
  - Real-time updates

### 4. Additional Features
- **Authentication**:
  - Google Sign-In integration
  - Mock authentication for development
  - Private and public routes using React Router
  - Authentication context for state management

- **Dashboard**:
  - Visualization of counter data and user profiles
  - React charts for data representation
  - Responsive design with Material UI/Chakra UI

## State Management Strategy

The application uses a combination of state management approaches:

1. **Local Component State**:
   - Used for UI-specific states such as form field values, modals, and tooltips
   - Managed with React's useState and useReducer hooks

2. **Redux Toolkit**:
   - Used for global application state
   - Manages user data persistence
   - Handles shared state between components
   - Example slice structure:

3. **Context API**:
   - Used for authentication state
   - Provides user authentication data throughout the application
   - Manages login status and user credentials



4. **Custom Hooks**:
   - Encapsulate and reuse stateful logic
   - Provide clean interfaces for component interactions
   - Separate concerns for better maintainability

## Technology Choices

1. **TypeScript**:
   - Type safety for improved development experience
   - Better IDE support and error catching
   - Enhanced maintainability for larger codebases

2. **Material UI/Chakra UI**:
   - Consistent design language
   - Responsive components out of the box
   - Theming support for customization

3. **React Spring**:
   - Physics-based animations
   - Performance-optimized with minimal re-renders
   - Support for complex animation patterns like bezier curves

4. **React Router**:
   - Declarative routing for React applications
   - Support for nested routes
   - Route protection for authenticated sections

5. **Redux Toolkit**:
   - Simplified Redux setup with less boilerplate
   - Built-in immutability with Immer
   - Integrated Redux DevTools for debugging

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Implementation Notes

### Counter Component
The counter component uses React Spring to animate the background color based on the count value. The animation follows a bezier curve for a smooth, natural feel. The component maintains its state across re-renders by storing the count in local storage.

### User Form
The user form generates a unique ID for each user upon submission and stores the data in Redux. The form implements an unsaved changes detection system that warns users before navigating away with unsaved data.

### Rich Text Editor
The rich text editor visualizes user data and provides formatting options. It synchronizes with Redux to ensure data consistency across the application.

### Dashboard
The dashboard uses React charts to visualize user data and counter statistics. It provides an at-a-glance view of the application's state and user profiles.


## Maddili Muni Sekhar
### munisekhar654@gmail.com
### +916304022592
