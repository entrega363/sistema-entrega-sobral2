# Technology Stack

## Frontend Framework
- **React 18.2.0** - Core UI framework loaded via ESM CDN
- **React DOM 18.2.0** - DOM rendering
- **Tailwind CSS** - Utility-first CSS framework via CDN

## Runtime Environment
- **Hatch Runtime** - Custom runtime providing `useStoredState` hook for persistent state
- **Browser localStorage** - Primary data persistence layer
- **ESM Modules** - Modern JavaScript module system

## State Management
- **React Hooks** - useState, useEffect for local state
- **useStoredState** - Hatch-specific hook for persistent state with localStorage backing
- **Event-driven sync** - Custom events for cross-component data synchronization

## Database Support
Multi-database configuration system supporting:
- MySQL
- PostgreSQL  
- MongoDB
- SQLite
- Supabase (with specific URL/key validation)

## Build System
- **No build step required** - Direct browser execution
- **CDN dependencies** - All external libraries loaded via CDN
- **File-based deployment** - Can run directly from file:// URLs

## Development Commands
```bash
# Local development server options
python -m http.server 8000
npx serve .
php -S localhost:8000

# Direct file access (no server required)
# Double-click index.html for immediate preview
```

## Key Technical Patterns
- **Single-file component** - Entire application in one React component
- **Multi-user authentication** - Role-based access (admin, business, driver, customer)
- **Real-time data sync** - localStorage + custom events for state synchronization
- **Responsive design** - Mobile-first approach with Tailwind utilities