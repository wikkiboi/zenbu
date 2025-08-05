# 🌸 Zenbu - Anime Search Filter App

Zenbu is a responsive anime search web app where users can filter, explore, and view up-to-date details on 20,000+ anime — powered by the [Jikan API](https://jikan.moe/). Built with React, TypeScript, TanStack Query, and Tailwind CSS.

![screenshot](./public/logo.png)

##  Features

-  Search and browse anime by title, type, filter, season, etc.
-  View info for each anime in a modal and on a dedicated page
-  Fully responsive layout (mobile-first)
-  Fast client-side fetching/caching with TanStack Query
-  Styled with Tailwind CSS
-  Data via [Jikan API](https://jikan.moe/)

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **State / Fetching**: TanStack Query
- **Styling + Icons**: Tailwind CSS, Lucide React
- **API**: Jikan REST API
- **Deployment**: Netlify

##  Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/wikkiboi/zenbu.git
cd zenbu
npm install
```

## Future Implementations/Features

- Advanced Search Page
- Manga Integration
- Sorting displayed list by various parameters (desc, asc, most recent, trending, etc.)
- Detail page for studios, producers, and characters/voice actors
- Create dedicated backend using a wrapper for Jikan's REST API
- Account or User list management for saving/favoriting shows
