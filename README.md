# Taskify - Task Manager App

A modern task management application built with React, TypeScript, and Redux Toolkit.

## Features

- User authentication (login/signup)
- Create, read, update, and delete tasks
- Filter tasks by status (all/active/completed)
- Search tasks by title
- Responsive design for mobile and desktop
- Modern UI with Tailwind CSS

## Tech Stack

- React.js
- TypeScript
- Redux Toolkit + RTK Query
- React Router DOM
- Tailwind CSS
- MirageJS (Mock API)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Development

The app uses MirageJS to mock the backend API in development. The mock server is automatically started when running in development mode.

### Test Account

You can use the following test account to log in:
- Email: test@example.com
- Password: password

Or you can create a new account using the signup form.

## Project Structure

```
src/
├── components/      # Reusable UI components
├── features/        # Redux slices and API
├── pages/          # Page components
├── services/       # API and other services
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking #   F e t a n - T a s k - m a n g m e n t  
 