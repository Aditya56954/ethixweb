# Ethixweb — Digital Experiences That Move Business Forward

A modern, India-focused digital agency website built for clarity, trust, and conversion. Includes service and company pages, a working enquiry form, and a protected admin dashboard for managing leads.

**Live website:** https://ethixweb-taupe.vercel.app  
**Backend API:** https://ethixweb.onrender.com  
**Admin login:** https://ethixweb-taupe.vercel.app/admin

## Highlights

- Responsive, mobile-first design with a warm editorial palette and Ethixweb red accents.
- Home, Services, About, and Contact pages.
- Enquiry form with server-side validation, rate limiting, and MongoDB persistence.
- Session-based admin authentication and protected lead management.
- Admin dashboard to review enquiries and update their status.
- SEO metadata and crawler rules.

## Design decisions

- **India-first, not template-first:** straightforward, business-focused messaging for Indian businesses.
- **Warm cream, charcoal, and red:** a more editorial, approachable identity than the usual dark/purple “AI” aesthetic.
- **Clear conversion path:** service information, process, and prominent enquiry calls to action.
- **Motion with restraint:** subtle transitions support the experience without competing with content.

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Security:** Helmet, CORS allowlist, rate limiting, Zod validation, bcrypt password hashing, MongoDB-backed sessions  
**Deployment:** Vercel (frontend) · Render (API) · MongoDB Atlas (database)

## Architecture

```text
Browser
  └── React + Vite (Vercel)
        ├── Public pages and enquiry form
        └── Admin login and dashboard
                 │ HTTPS / JSON
                 ▼
          Express API (Render)
            ├── /api/enquiries  — validate and save enquiries
            ├── /api/auth       — login, session, logout
            └── /api/admin      — protected enquiry listing/status updates
                       │
                       ▼
                MongoDB Atlas
            ├── enquiries
            └── sessions
```

The backend is the source of truth for validation, persistence, authentication, and enquiry status. Admin routes require an authenticated session.

## Run locally

### Requirements

- Node.js 20+
- npm
- MongoDB Atlas URI or local MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/Aditya56954/ethixweb.git
cd ethixweb
```

### 2. Configure the backend

Create `server/.env`:

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=use_a_long_random_secret
ADMIN_USERNAME=choose_an_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
```

Generate a bcrypt hash for your chosen admin password using the project's installed `bcryptjs` dependency. Never put the plain-text password or real secrets in Git.

Install dependencies and start the API:

```bash
cd server
npm install
npm run dev
```

If your backend scripts differ, use the scripts defined in `server/package.json`.

### 3. Configure the frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

Then start Vite:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Deployment configuration

**Vercel frontend**
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://ethixweb.onrender.com/api`

**Render backend** — configure these in the service's Environment settings:
- `NODE_ENV=production`
- `CLIENT_URL=https://ethixweb-taupe.vercel.app`
- `MONGO_URI`
- `SESSION_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`

Keep the CORS origin aligned with the exact deployed frontend origin. Do not commit `.env` files, database credentials, session secrets, or admin passwords.

## Admin access

Visit **https://ethixweb-taupe.vercel.app/admin** and sign in with the admin username and password configured for the deployed backend. Credentials are intentionally not published in this repository. The dashboard supports viewing enquiries and updating their status.

## Performance snapshot

Google PageSpeed Insights (14 October 2026):
- **Mobile performance:** 99
- **Desktop performance:** 99
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 91 (mobile report)

Scores can vary between runs and devices. Real-user field data may be unavailable for a new site.

## Security notes

- Use unique production secrets and a strong admin password.
- Restrict MongoDB Atlas network access where practical.
- Keep dependencies updated and verify that secret files are ignored by Git.
- Never expose the admin password or password hash in frontend code or public documentation.

---

Built as a full-stack web development assessment project.
