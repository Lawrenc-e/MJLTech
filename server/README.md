# MJLTechs Backend (MySQL)

## Setup
1. Copy `server/.env.example` to `server/.env` and set your values.
2. Create the database and tables:
   - `CREATE DATABASE mjltechs;`
   - Run `server/src/db/schema.sql`
   - Optional: run `server/src/db/seed.sql`
3. Install dependencies:
   - `npm install` (inside `server/`)
4. Start the API:
   - `npm run dev` (development)
   - `npm start` (production)

## API
- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/projects` (requires Bearer token unless `ALLOW_UNAUTHENTICATED_READS=true`)
- `GET /api/v1/tasks` (requires Bearer token unless `ALLOW_UNAUTHENTICATED_READS=true`)
