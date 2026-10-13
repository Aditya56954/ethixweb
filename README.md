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

## Screenshots

### Admin dashboard
![Ethixweb admin dashboard](docs/screenshots/admin-dashboard.png)

### Work and concept explorations
![Ethixweb work concepts page](docs/screenshots/work-concepts.png)

### About
![Ethixweb about page](docs/screenshots/about.png)

### Contact and enquiry form
![Ethixweb contact page](docs/screenshots/contact.png)

## Design decisions

- **India-first messaging:** clear, business-focused communication for Indian businesses.
- **Warm cream, charcoal, and red:** an editorial identity that feels approachable and distinctive.
- **Clear conversion path:** service information, process, and prominent enquiry calls to action.
- **Motion with restraint:** subtle transitions without distracting from content.

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Security:** Helmet, CORS allowlist, rate limiting, Zod validation, bcrypt password hashing, MongoDB-backed sessions  
**Deployment:** Vercel · Render · MongoDB Atlas

## Architecture

```text
Browser → React + Vite (Vercel)
             ├── Public pages and enquiry form
             └── Admin login and dashboard
                       │ HTTPS / JSON
                       ▼
                 Express API (Render)
                   ├── /api/enquiries
                   ├── /api/auth
                   └── /api/admin
                       │
                       ▼
                  MongoDB Atlas
                  ├── enquiries
                  └── sessions
```

The backend handles validation, persistence, authentication, and enquiry status. Admin routes require an authenticated session.

## Run locally

**Requirements:** Node.js 20+, npm, and a MongoDB connection string.

1. Clone the repository:

```bash
git clone https://github.com/Aditya56954/ethixweb.git
cd ethixweb
```

2. Create `server/.env`:

```env
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=use_a_long_random_secret
ADMIN_USERNAME=choose_an_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_password_hash
```

3. Start the backend:

```bash
cd server
npm install
npm run dev
```

4. Create `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

5. Start the frontend in a second terminal:

```bash
cd client
npm install
npm run dev
```

Use the scripts defined in each `package.json` if they differ. Never commit real secrets or `.env` files.

## Deployment

**Vercel frontend**
- Root: `client`
- Build: `npm run build`
- Output: `dist`
- `VITE_API_URL=https://ethixweb.onrender.com/api`

**Render backend environment**
- `NODE_ENV=production`
- `CLIENT_URL=https://ethixweb-taupe.vercel.app`
- `MONGO_URI`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`

Keep the CORS origin aligned with the exact deployed frontend URL.

## Admin access

Open **https://ethixweb-taupe.vercel.app/admin** and use the credentials configured in Render. Credentials are not published in this repository.

## PageSpeed snapshot

Google PageSpeed Insights, 14 October 2026:

| Metric | Result |
|---|---:|
| Mobile performance | **99** |
| Desktop performance | **99** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO (mobile) | **91** |

Scores may vary between runs; real-user field data may not yet be available for a new site.

## Security

- Use strong, unique production secrets and an admin password.
- Restrict MongoDB Atlas network access where practical.
- Keep dependencies updated.
- Never expose passwords, hashes, database credentials, or session secrets in frontend code or public documentation.

---

Built as a full-stack web development assessment project.
