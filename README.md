# NovaCRM - Dark Mode CRM & URL Shortener

A production-ready, dark-mode-only web application combining a URL shortener with comprehensive CRM functionality.

## Features

### URL Shortener
- Create shortened URLs with custom slugs
- Countdown interstitial pages (5-second timer)
- Click tracking and analytics
- User dashboard for link management
- Admin controls for timer configuration

### CRM Dashboard
- **Dashboard**: Overview with KPIs and team directory
- **Projects**: Project management with progress tracking
- **Employees**: Staff directory and management
- **Calendar**: Event scheduling and management
- **Invoices**: Financial tracking and billing
- **Notifications**: Real-time updates and alerts
- **Help Center**: Support documentation and search

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Database**: Neon PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts with theme tokens
- **Icons**: Lucide React
- **Testing**: Jest
- **Deployment**: Docker

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. **Database (Neon)**: Already configured via integration
   - `DATABASE_URL` and related variables are automatically provided

3. **Authentication (Clerk)**: Required for user authentication
   - Sign up at [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application
   - Copy the publishable key and secret key to your `.env.local`

## Installation & Development

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up the database:
   \`\`\`bash
   npm run db:push
   npm run db:seed
   \`\`\`

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

1. Build the Docker image:
   \`\`\`bash
   docker build -t novacrm .
   \`\`\`

2. Run with Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

## Testing

Run the test suite:
\`\`\`bash
npm test
\`\`\`

## Key Requirements Met

✅ **Dark mode enforced everywhere** - `<html class="dark">` with `color-scheme: dark`  
✅ **Sidebar navigation** - Client-side routing without page reloads  
✅ **Charts with theme tokens** - Recharts using CSS variables only  
✅ **Fully responsive** - Offcanvas mobile sidebar, collapsible desktop  
✅ **Accessibility** - ARIA labels, keyboard navigation, screen reader support  
✅ **Production ready** - Docker setup, Prisma schema, Jest tests  

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── charts/           # Recharts components
│   ├── pages/            # Page-specific components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and configurations
├── prisma/               # Database schema and migrations
├── scripts/              # Database setup scripts
└── __tests__/            # Jest test files
\`\`\`

## License

MIT License
