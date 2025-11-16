# TradePro Backend API

A production-ready NestJS REST API for the TradePro trading platform, extracted from the original boilerplate and optimized for API-only usage.

## Features

- 🚀 **NestJS Framework** with TypeScript
- 🔐 **JWT Authentication** with refresh tokens
- 👥 **User Management** with role-based access control
- 📊 **Testimonials System** with CRUD operations
- 🗄️ **Dual Database Support** - PostgreSQL (TypeORM) and MongoDB (Mongoose)
- 📧 **Email System** with Nodemailer
- 🔑 **Social Authentication** (Google, Facebook, Apple)
- 📝 **API Documentation** with Swagger
- 🌍 **Internationalization** (i18n) support
- 📁 **File Upload** (Local and AWS S3)
- 🐳 **Docker Support**
- ✅ **Testing** (Unit and E2E)
- 🛡️ **Security** best practices

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL or MongoDB
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your database connection in `.env`

4. Run database migrations:
```bash
npm run migration:run
```

5. Seed the database (optional):
```bash
npm run seed:run:relational
```

6. Start the development server:
```bash
npm run start:dev
```

The API will be available at [http://localhost:3001](http://localhost:3001).

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
- **Swagger UI**: [http://localhost:3001/docs](http://localhost:3001/docs)

## Architecture

This is a **API-only** version of the original NestJS boilerplate, with web-related components removed for cleaner separation between frontend and backend.

### Removed Components:
- Web controllers and views
- Server-side templating (Nunjucks)
- Admin web interface
- Static asset serving

### Core API Modules:
- **Authentication** (`/api/v1/auth/*`)
- **Users** (`/api/v1/users/*`)  
- **Testimonials** (`/api/v1/testimonials/*`)
- **Files** (`/api/v1/files/*`)

## Environment Configuration

Key environment variables:

```env
# App Configuration
NODE_ENV=production
APP_PORT=3001
API_PREFIX=api
BACKEND_DOMAIN=http://localhost:3001

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/database
DATABASE_TYPE=postgres

# JWT Secrets
AUTH_JWT_SECRET=your-jwt-secret
AUTH_REFRESH_SECRET=your-refresh-secret

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-email-password
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/email/login` - User login
- `POST /api/v1/auth/email/register` - User registration
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh JWT token

### Testimonials
- `GET /api/v1/testimonials` - Get all testimonials (paginated)
- `GET /api/v1/testimonials/active` - Get active testimonials
- `POST /api/v1/testimonials` - Create testimonial (admin only)
- `GET /api/v1/testimonials/:id` - Get testimonial by ID
- `PATCH /api/v1/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/v1/testimonials/:id` - Delete testimonial (admin only)

### Users (Admin only)
- `GET /api/v1/users` - Get all users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging

# Production
npm run build             # Build the application
npm run start:prod        # Start production server

# Database
npm run migration:generate  # Generate new migration
npm run migration:run      # Run migrations
npm run seed:run:relational # Seed database

# Testing
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Test coverage

# Code Quality
npm run lint              # Lint code
npm run format            # Format code
```

## Database Support

The API supports both relational and document databases:

### PostgreSQL (Default)
```env
DATABASE_TYPE=postgres
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

### MongoDB
```env
DATABASE_TYPE=mongodb  
DATABASE_URL=mongodb://localhost:27017/database
```

## Security Features

- **JWT Authentication** with access and refresh tokens
- **Role-based Access Control** (Admin/User)
- **Password Hashing** with bcrypt
- **Input Validation** with class-validator
- **CORS** configuration
- **Rate Limiting** support
- **Helmet** security headers

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.yaml up -d
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## Frontend Integration

This backend is designed to work with the Next.js frontend located in `../frontend`. The frontend expects:

- API running on port 3001 (configurable)
- All endpoints prefixed with `/api/v1`
- JWT authentication for protected routes
- CORS enabled for frontend domain

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
