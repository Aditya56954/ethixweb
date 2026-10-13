
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to sign in. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f6f1] text-[#20201e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-96 rounded-full border border-[#c1272d]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full border border-[#c1272d]/10"
      />

      <header className="relative z-10 border-b border-[#e9e6df] bg-[#faf9f6]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-[-0.07em]"
            aria-label="Ethixweb home"
          >
            ethixweb<span className="text-[#c1272d]">.</span>
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#c1272d]"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to website</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-20">
        {/* Brand panel */}
        <section className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e4ded5] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-600">
            <Sparkles size={15} className="text-[#c1272d]" />
            Admin workspace
          </div>

          <h1 className="mt-8 max-w-2xl text-6xl font-semibold leading-[0.98] tracking-[-0.065em] xl:text-7xl">
            Good work
            <br />
            starts with
            <br />
            <span className="text-[#c1272d]">good follow-through.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-neutral-600">
            Your private space to manage enquiries, follow up with potential
            clients, and keep every conversation moving.
          </p>

          <div className="mt-12 max-w-lg rounded-2xl bg-[#242421] p-6 text-white xl:p-7">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ffb8ad]">
                <Fingerprint size={23} />
              </div>

              <div>
                <h2 className="font-semibold">Private by design</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  This area is reserved for authorised administrators. Keep
                  your credentials private and sign out when you finish.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-5 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#ffb8ad]" />
                Protected sign-in
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#ffb8ad]" />
                Lead management
              </span>
            </div>
          </div>
        </section>

        {/* Login form */}
        <section className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4ded5] bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.13em] text-neutral-600">
              <ShieldCheck size={15} className="text-[#c1272d]" />
              Restricted access
            </div>
          </div>

          <div className="rounded-3xl border border-[#e9e6df] bg-white p-6 shadow-xl shadow-black/[0.035] sm:p-9">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f9e8e6] text-[#c1272d]">
              <LockKeyhole size={25} strokeWidth={1.8} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.19em] text-[#c1272d]">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
              Sign in to Ethixweb
            </h2>

            <p className="mt-3 text-sm leading-7 text-neutral-500">
              Enter your administrator credentials to access customer
              enquiries.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  maxLength={100}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your username"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#faf9f6] px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#c1272d] focus:bg-white focus:ring-4 focus:ring-[#c1272d]/[0.07] disabled:opacity-60"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-neutral-800"
                  >
                    Password
                  </label>
                  <LockKeyhole
                    size={15}
                    className="text-neutral-400"
                    aria-hidden="true"
                  />
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength={1024}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-[#faf9f6] px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#c1272d] focus:bg-white focus:ring-4 focus:ring-[#c1272d]/[0.07] disabled:opacity-60"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#c1272d] px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#a51e24] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in to dashboard"}
                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="mt-7 flex items-start gap-3 border-t border-neutral-100 pt-5">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#c1272d]"
              />
              <p className="text-xs leading-6 text-neutral-500">
                Authorised access only. Never share your password or leave
                your administrator session open on a shared device.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-neutral-400">
            Ethixweb Admin Workspace
            <span className="mx-2">·</span>
            Secure access
          </p>
        </section>
      </div>
    </main>
  );
}
