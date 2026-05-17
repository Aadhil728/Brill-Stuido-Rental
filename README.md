# Brill Studio Rental Service Application

A full-stack local booking platform for managing Brill Studio rental bookings, equipment add-ons, photography/videography packages, customer enquiries, and simple admin operations.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Vite
- Backend: Node.js, Express.js
- Storage: local JSON file at `backend/src/data/bookings.json`
- Auth: simple JWT-based admin login, designed to be replaced later

## Installation

From the project root:

```bash
npm run install:all
```

Or install each app separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run Locally

Start the backend:

```bash
npm run dev:backend
```

Backend runs at:

```text
http://localhost:5000
```

Start the frontend in another terminal:

```bash
npm run dev:frontend
```

Frontend runs at:

```text
http://localhost:5173
```

If Vite says port `5173` is already in use, it may open the frontend on `5174` or another nearby port. That is supported.

Before using admin login, confirm the backend is running:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{ "status": "ok", "service": "Brill Studio API" }
```

If admin login shows a network error, start or restart the backend terminal with `npm run dev:backend`.

## Default Admin Login

```text
Username: admin
Password: admin123
```

Admin dashboard:

```text
http://localhost:5173/admin
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/bookings` | Create a booking request |
| `GET` | `/api/bookings` | List all bookings, supports query filters |
| `GET` | `/api/bookings/:id` | Get a single booking |
| `PATCH` | `/api/bookings/:id/status` | Update booking status |
| `DELETE` | `/api/bookings/:id` | Delete a booking |
| `POST` | `/api/admin/login` | Login as local admin |

## Notes

- Booking data is stored locally in JSON for easy development.
- Admin authentication uses a local JWT secret. Set `JWT_SECRET` in production-like environments.
- The app is structured so storage, authentication, and admin roles can be replaced with a production database and proper user management later.

## VPS Deployment

For Hostinger VPS deployment with a subdomain, PM2, Nginx, and SSL, follow:

```text
DEPLOYMENT.md
```
