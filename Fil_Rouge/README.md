# GameForum - Gaming Community Platform

A modern, feature-rich gaming community platform built with React, TypeScript, and Supabase.

![GameForum Screenshot](à ajouter!!)

## Features

- 🎮 Game discussions and community forums
- 📊 Real-time trending topics and statistics
- 🏆 Gaming competitions and tournaments
- 👤 User profiles and authentication
- 🌓 Dark/Light mode support
- 🏷️ Tag-based categorization
- 📱 Responsive design

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router

- **Backend:**
  - Edge Functions (Serverless)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gameforum.git
cd gameforum
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Database Setup

1. Create a new Supabase project
2. Run the database migrations:
   - Navigate to the SQL editor in your Supabase dashboard
   - Execute the migrations in the `supabase/migrations` folder

## Project Structure

```
gameforum/
├── src/
│   ├── components/     # Reusable UI components
│   ├── lib/           # Utilities and store
│   ├── pages/         # Page components
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
├── supabase/          # Supabase configurations
└── tests/            # Test files
```

## Features in Detail

### Authentication
- Email/password authentication
- Protected routes
- User profile management

### Forums
- Create and manage discussions
- Tag-based categorization
- Rich text editor
- Real-time updates

### Gaming Section
- Game listings
- Tournament organization
- Player statistics
- Team management

### Profile System
- User profiles
- Gaming history
- Achievement tracking
- Social connections

## Acknowledgments

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)