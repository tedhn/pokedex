# Pokémon Explorer App

A full-stack web application for browsing and searching Pokémon with infinite scroll pagination. Built with Next.js frontend and Express.js backend, consuming data from the PokéAPI.

## Project Overview

**Invovle Asia Test Project** - A modern web application that allows users to:

- Browse Pokémon with infinite scroll pagination
- Search for Pokémon by name
- View detailed Pokémon information (image, types, height, weight)

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **External API**: PokéAPI (via `pokedex-promise-v2`)
- **Middleware**: CORS support

### Frontend

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Data Fetching**: TanStack React Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Error Handling**: Global Error Boundary + Toast notifications
- **Language**: TypeScript

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager

### Backend Setup

1. **Navigate to the backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   node app.ts
   ```

   The backend API will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## API Documentation

### Base URL

```
http://localhost:3001
```

### Endpoints

#### 1. Get Pokémon List (Paginated)

**Endpoint**: `GET /pokemon`

Returns a paginated list of Pokémon with detailed information.

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 9 | Number of Pokémon to return per page |
| `offset` | number | 0 | Starting position for pagination |

**Response**:

```json
{
  "data": [
    {
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      "name": "bulbasaur",
      "type": ["grass", "poison"],
      "height": 7,
      "weight": 69
    },
    {
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      "name": "ivysaur",
      "type": ["grass", "poison"],
      "height": 10,
      "weight": 130
    }
  ],
  "total": 1025,
  "hasNext": true,
  "nextOffset": 9
}
```

**Example Request**:

```bash
curl "http://localhost:3001/pokemon?limit=10&offset=0"
```

---

#### 2. Search Pokémon

**Endpoint**: `GET /search`

Search for Pokémon by name (case-insensitive partial matching). Couldn't find a way to search for a pokemon with partial names from api endpoints, so I thought we can just get all the availables pokemons ( around 1300 , 1500 just to be safe ) and filter through the list. There might better ways to do this and could be improved upon.

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Pokémon name or partial name to search |

**Response**:

```json
{
  "data": [
    {
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "name": "pikachu",
      "type": ["electric"],
      "height": 4,
      "weight": 60
    }
  ]
}
```

**Example Request**:

```bash
curl "http://localhost:3001/search?name=pika"
```

**Notes**:

- Returns an empty array if no matches are found
- Returns an empty array if `name` parameter is missing or not a string

---

## Response Data Types

### IPokemon

```typescript
interface IPokemon {
  image: string; // URL to Pokémon sprite image
  name: string; // Pokémon name
  type: string[]; // Array of type names (e.g., ["electric", "water"])
  height: number; // Height in decimeters
  weight: number; // Weight in hectograms
}
```

### IGetPokemonResponse

```typescript
interface IGetPokemonResponse {
  data: IPokemon[]; // Array of Pokémon data
  total: number; // Total number of Pokémon available
  hasNext: boolean; // Whether there are more Pokémon to load
  nextOffset: number | null; // Offset for next page
}
```

### ISearchPokemonResponse

```typescript
interface ISearchPokemonResponse {
  data: IPokemon[]; // Array of matching Pokémon
}
```

---

## Frontend Features

### Components

- **PokemonList**: Displays Pokémon with infinite scroll pagination
- **Card**: Reusable card component for displaying Pokémon
- **Button**: Reusable button component
- **Carousel**: Reusable carousel component for displaying related content

### Hooks

- **useInfiniteQueryHook**: Custom hook utilizing React Query for infinite scroll pagination

### Utilities

- **types.ts**: TypeScript interfaces for type safety
- **Providers.tsx**: React Query + Sonner Toaster provider setup
- **function.ts**: Additional utility functions

### Api

- **api.ts**: Axios client functions for API calls with error handling
- **APIError class**: Custom error class for API errors

---

## Caching & Performance

### Backend

- **PokéAPI Cache**: 100-second cache limit to reduce external API calls
- **Request Timeout**: 5-second timeout for PokéAPI requests
- **CORS**: Enabled for cross-origin requests

### Frontend

- **React Query**: Automatic caching and state management
- **Dev Tools**: React Query DevTools included for debugging

---

## Development Commands

### Backend

```bash
node app.ts    # Start development server
```

### Frontend

```bash
npm run dev    # Start development server
npm run build  # Create production build
npm start      # Start production server
npm run lint   # Run ESLint
```

---

## Error Handling

- Invalid or missing query parameters return empty data sets
- PokéAPI failures are handled gracefully with `Promise.allSettled`

---

## Project Structure

```
invovle-asia-test/
├── backend/
│   ├── app.ts                 # Express app and API endpoints
│   ├── utils.ts               # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── app/
    │   ├── layout.tsx         # Root layout
    │   └── page.tsx           # Home page
    ├── components/            # Reusable React components
    ├── hooks/                 # Custom React hooks
    ├── utils/                 # Utility functions
    ├── api/                   # API client
    ├── public/                # Static assets
    ├── package.json
    └── tsconfig.json
```

---

## Notes

- The backend requires an active internet connection to fetch data from PokéAPI
- Search functionality loads all 1500+ Pokémon and filters locally
- Frontend expects the backend to run on `http://localhost:3001`

---

## License

This project is part of an Invovle Asia test assignment.
