# Pathfinder

A comprehensive career exploration and education platform built with Laravel and React. Pathfinder helps students and professionals discover career paths, explore universities, connect with alumni, and access educational resources.

## Features

### 🎯 Career Exploration
- **1,000+ Occupations** - Powered by O*NET database with detailed career information
- **RIASEC Personality Assessment** - Find careers matching your interests and personality type
- **Skills & Education Requirements** - Detailed information on required skills, knowledge, and education levels
- **Salary & Job Outlook** - Real-world career data to inform your decisions
- **Autosuggest Search** - Quick career discovery with intelligent search

### 🎓 University Discovery
- **University Profiles** - Comprehensive information on colleges and universities
- **Program Search** - Find degree programs aligned with your career goals
- **Admission Requirements** - Clear guidance on prerequisites and application processes
- **Rankings & Statistics** - Data-driven insights to compare institutions

### 👥 Community & Networking
- **Alumni Network** - Connect with graduates from your target schools
- **Mentorship Program** - Get guidance from experienced professionals
- **Discussion Forums** - Share insights and ask questions
- **Success Stories** - Learn from others' career journeys

### 📚 Resources & Tools
- **Career Assessments** - Discover your strengths and interests
- **Blog Articles** - Expert advice and industry insights
- **Competitions** - Scholarships and academic competitions
- **Course Recommendations** - Personalized learning pathways

## Tech Stack

### Backend
- **Laravel 12** - Modern PHP framework with elegant syntax
- **PHP 8.4** - Latest PHP with performance improvements
- **SQLite** - Lightweight database for development
- **Laravel Fortify** - Authentication scaffolding
- **Spatie Permissions** - Role and permission management

### Frontend
- **React 19** - Latest React with Server Components support
- **Inertia.js 2** - Modern monolithic architecture
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Laravel Wayfinder** - Type-safe routing

### Development Tools
- **Vite** - Fast build tool and dev server
- **Pest 4** - Elegant testing framework
- **Laravel Pint** - Opinionated code formatter
- **ESLint & Prettier** - Code quality and consistency
- **Laravel Sail** - Docker development environment

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (or configure your preferred database)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd pathfinder

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database (optional - includes O*NET data)
php artisan db:seed

# Build frontend assets
npm run build

# Start the development server
php artisan serve
```

Visit `http://localhost:8000` in your browser.

## Development

### Running the Development Server

```bash
# Start Laravel server
php artisan serve

# In another terminal, start Vite dev server
npm run dev
```

### Running Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/OccupationsPageTest.php

# Run with coverage
php artisan test --coverage
```

### Code Quality

```bash
# Format PHP code
vendor/bin/pint

# Format JavaScript/React code
npm run format

# Check formatting without changes
npm run format:check

# Lint JavaScript
npm run lint

# Type check TypeScript
npm run types
```

### Using Laravel Sail (Docker)

```bash
# Start all services
./vendor/bin/sail up -d

# Run artisan commands
./vendor/bin/sail artisan migrate

# Run npm commands
./vendor/bin/sail npm run dev

# Run tests
./vendor/bin/sail test
```

## Project Structure

```
pathfinder/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Route controllers
│   │   ├── Middleware/      # Custom middleware
│   │   └── Requests/        # Form request validation
│   ├── Models/              # Eloquent models
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/             # Database seeders
│   └── factories/           # Model factories
├── resources/
│   ├── js/
│   │   ├── components/      # Reusable React components
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Inertia page components
│   │   └── types/           # TypeScript type definitions
│   ├── css/                 # Global styles
│   └── views/               # Blade templates (minimal)
├── routes/
│   ├── web.php              # Web routes
│   └── console.php          # Artisan commands
├── tests/
│   ├── Feature/             # Feature tests
│   └── Unit/                # Unit tests
└── public/
    └── build/               # Compiled assets
```

## Key Features Implementation

### Collapsible Filters
The occupations page features a sidebar with collapsible filter sections:
- Interest Type (RIASEC model)
- Education Level (Job Zones 1-5)
- Career Clusters

### Autosuggest Search
Real-time search suggestions powered by a dedicated API endpoint with debouncing for performance.

## PDF Export Setup

Pathfinder supports exporting assessment results to PDF.

- Production: uses Spatie Laravel PDF (spatie/laravel-pdf) to render views to PDF and save to storage.
- Tests: avoid heavy PDF engines by writing minimal valid PDF bytes to disk so assertions can verify headers and downloads deterministically.

### Option B: Browsershot (Headless Chrome)

Browsershot renders PDFs using Headless Chrome for high-fidelity output.

1) Ensure dependencies are installed:

```bash
# PHP package (already in composer.json)
composer install

# System requirements
# - Node.js v18+ (node & npm must be available in PATH)
# - Google Chrome or Chromium installed on the server
```

2) Install Chrome/Chromium (examples):

```bash
# Ubuntu/Debian (Chromium)
sudo apt-get update && sudo apt-get install -y chromium-browser || sudo apt-get install -y chromium

# Fedora/RHEL (Chromium)
sudo dnf install -y chromium
```

3) Optional: set Chrome path (if Browsershot can’t auto-detect):

```env
# .env
BROWSERSHOT_CHROME_PATH=/usr/bin/chromium-browser
```

4) Test a PDF export:

Visit: `/assessments/{attemptId}/export/pdf`

Note: Browsershot (spatie/browsershot) is available for high-fidelity rendering if you choose to adopt it, but it is not used by default.

### Consistent Design System
- Emerald/teal color palette throughout
- Responsive grid layouts
- Consistent spacing and typography
- Accessible components

## Configuration

### Environment Variables

Key environment variables in `.env`:

```env
APP_NAME="Pathfinder"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# For other databases, configure accordingly

MAIL_MAILER=log
# Configure mail settings for production
```

### Inertia SSR (Optional)

To enable server-side rendering:

```bash
npm run build:ssr
php artisan inertia:start-ssr
```

## Deployment

### Production Build

```bash
# Install dependencies
composer install --no-dev --optimize-autoloader
npm ci

# Build assets
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force
```

### Environment Setup

1. Set `APP_ENV=production` and `APP_DEBUG=false`
2. Configure your database connection
3. Set up mail driver for notifications
4. Configure session and cache drivers
5. Set secure `APP_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Testing Strategy

- **Feature Tests** - Test entire features end-to-end
- **Unit Tests** - Test individual components and functions
- **Browser Tests** - Pest v4 browser testing for UI interactions

## License

This project is licensed under the MIT License.

## Acknowledgments

- **O*NET Database** - Career information provided by the U.S. Department of Labor
- **Laravel Community** - For the amazing framework and packages
- **React Community** - For the powerful UI library
- **Tailwind CSS** - For the utility-first CSS framework

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ using Laravel, React, and Inertia.js
