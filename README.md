# Job Portal

A full-stack job portal application built with Laravel 13 (backend) and Next.js 15 (frontend).

## Architecture

- **Backend:** Laravel 13 API with Sanctum authentication
- **Frontend:** Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Database:** PostgreSQL
- **Containerization:** Docker (PHP, Nginx, PostgreSQL, Node.js)

## Project Structure

```
job-portal/
├── backend/                # Laravel 13 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       ├── Auth/
│   │   │   │       ├── Dashboard/
│   │   │   │       ├── Company/
│   │   │   │       ├── Job/
│   │   │   │       ├── Candidate/
│   │   │   │       ├── Employer/
│   │   │   │       └── Admin/
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └── Providers/
│   ├── config/
│   ├── database/migrations/
│   ├── routes/
│   └── tests/
├── frontend/               # Next.js 15 App
│   ├── app/
│   │   ├── health/
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   └── lib/
├── docker/                 # Docker configuration
│   ├── php/
│   └── nginx/
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites

- PHP 8.4+
- Composer
- Node.js 22+
- PostgreSQL 17+
- Docker & Docker Compose (optional)

### Local Development

#### Backend (Laravel)

```bash
# Navigate to backend
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=job_portal
# DB_USERNAME=postgres
# DB_PASSWORD=postgres

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

#### Frontend (Next.js)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Docker Setup

```bash
# Build and start all containers
docker-compose up -d

# Run migrations inside container
docker-compose exec php php artisan migrate

# Generate app key
docker-compose exec php php artisan key:generate

# View logs
docker-compose logs -f
```

### Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api
- **Health Check:** http://localhost:8000/api/health
- **PostgreSQL:** localhost:5432

## Testing

### Backend

```bash
cd backend
php artisan test
```

### Frontend

```bash
cd frontend
npm run lint
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/forgot-password` | Send reset link |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/dashboard` | Dashboard data |
| GET/POST | `/api/companies` | List/Create companies |
| GET/PUT/DELETE | `/api/companies/{id}` | Show/Update/Delete company |
| GET/POST | `/api/jobs` | List/Create jobs |
| GET/PUT/DELETE | `/api/jobs/{id}` | Show/Update/Delete job |
| GET/POST | `/api/candidates` | List/Create candidates |
| GET/PUT/DELETE | `/api/candidates/{id}` | Show/Update/Delete candidate |
| GET/POST | `/api/employers` | List/Create employers |
| GET/PUT/DELETE | `/api/employers/{id}` | Show/Update/Delete employer |
| GET | `/api/admin/users` | Admin: list users |
| GET | `/api/admin/stats` | Admin: get stats |

## Coding Standards

```bash
# Laravel Pint (PHP CS Fixer)
cd backend
./vendor/bin/pint

# Laravel IDE Helper
cd backend
php artisan ide-helper:generate
```
