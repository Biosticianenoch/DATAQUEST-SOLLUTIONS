# DataQuest Solutions Frontend

The frontend application for DataQuest Solutions, built with React, TypeScript, and Vite.

## Live Demo

Visit our live application at: [DataQuest Solutions](https://data-quest-solutions-git-main-enocks-projects-27f604c8.vercel.app)

## Features

- Modern, responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- Course browsing and searching
- PDF course material downloads
- User authentication
- Payment processing with Stripe
- Loading states and error handling
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000
VITE_AUTH_TOKEN_KEY=auth_token
VITE_USER_DATA_KEY=user_data
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── courses/   # Course-related components
│   │   ├── layout/    # Layout components
│   │   ├── payment/   # Payment-related components
│   │   └── ui/        # Base UI components
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Component Library

The application uses a custom component library built with:
- Tailwind CSS for styling
- shadcn/ui for base components
- Lucide icons for icons

## State Management

- React Context for global state
- React Query for server state
- Local state with useState/useReducer

## API Integration

The frontend communicates with the backend API using:
- Fetch API for HTTP requests
- Environment variables for API configuration
- Type-safe API responses

## Development Guidelines

1. Follow TypeScript best practices
2. Use functional components with hooks
3. Implement proper error handling
4. Add loading states for async operations
5. Write meaningful component documentation
6. Follow the established project structure

## Building for Production

1. Update environment variables in `.env.production`:
```
VITE_API_URL=https://data-quest-solutions-api.vercel.app
VITE_AUTH_TOKEN_KEY=auth_token
VITE_USER_DATA_KEY=user_data
```

2. Build the application:
```bash
npm run build
```

3. Deploy to Vercel:
```bash
vercel
```

The production application is available at: https://data-quest-solutions-git-main-enocks-projects-27f604c8.vercel.app

## Contributing

1. Follow the TypeScript and React best practices
2. Write meaningful commit messages
3. Update documentation as needed
4. Test your changes thoroughly

## License

This project is licensed under the MIT License.
