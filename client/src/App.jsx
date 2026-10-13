
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#faf9f6] px-5 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#c1272d]">
        404 — Page not found
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900">
        This page doesn't exist.
      </h1>

      <p className="mt-4 max-w-md text-neutral-600">
        The page you are looking for may have been moved or doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-7 inline-flex items-center rounded-full bg-[#c1272d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a91f25]"
      >
        Back to home
      </Link>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
              aria-label="Ethixweb home"
            >
              ethixweb<span className="text-[#c1272d]">.</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Thoughtful digital experiences, practical technology, and
              solutions designed around your business.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Explore</p>

            <nav className="mt-4 flex flex-col gap-3 text-sm text-neutral-400">
              <Link className="transition hover:text-white" to="/">
                Home
              </Link>
              <Link className="transition hover:text-white" to="/services">
                Services
              </Link>
              <Link className="transition hover:text-white" to="/about">
                About
              </Link>
              <Link className="transition hover:text-white" to="/contact">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Start a conversation</p>

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm transition hover:border-white hover:bg-white hover:text-neutral-950"
            >
              Tell us about your project
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Ethixweb. All rights reserved.
          </p>
          <p>Built with care for better digital experiences.</p>
        </div>
      </div>
    </footer>
  );
}

function SiteLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout />
    </BrowserRouter>
  );
}
