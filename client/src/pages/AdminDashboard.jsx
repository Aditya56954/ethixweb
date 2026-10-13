
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const statusConfig = {
  new: {
    label: "New",
    badge: "bg-blue-50 text-blue-700 ring-blue-600/10",
    dot: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/10",
    dot: "bg-amber-500",
  },
  closed: {
    label: "Closed",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    dot: "bg-emerald-500",
  },
};

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status || "Unknown",
    badge: "bg-gray-100 text-gray-700 ring-gray-500/10",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${config.badge}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function MetricCard({ label, count, description, icon: Icon, tone }) {
  const tones = {
    red: "bg-[#f9e8e6] text-[#c1272d]",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
  };

  return (
    <article className="rounded-2xl border border-[#e9e6df] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.03] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#20201e] sm:text-4xl">
            {count}
          </p>
        </div>

        <div
          className={`flex size-11 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon size={21} aria-hidden="true" />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-neutral-500">{description}</p>
    </article>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const loadEnquiries = useCallback(
    async (page = 1, selectedFilter = "all") => {
      setLoading(true);
      setError("");
      setNotice("");

      try {
        const params = { page, limit: 10 };

        if (selectedFilter !== "all") {
          params.status = selectedFilter;
        }

        const response = await axios.get(`${API_URL}/admin/enquiries`, {
          params,
          withCredentials: true,
        });

        setEnquiries(response.data.enquiries || []);
        setPagination(
          response.data.pagination || {
            page,
            limit: 10,
            total: 0,
            totalPages: 0,
          }
        );
      } catch (err) {
        if (err.response?.status === 401) {
          setEnquiries([]);
          navigate("/admin/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.message ||
            "We couldn't load your enquiries. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    loadEnquiries(1, filter);
  }, [filter, loadEnquiries]);

  const visibleEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return enquiries;

    return enquiries.filter((item) =>
      [
        item.name,
        item.email,
        item.company,
        item.service,
        item.message,
        item.status,
      ].some((value) => String(value || "").toLowerCase().includes(query))
    );
  }, [enquiries, search]);

  const newCount = enquiries.filter((item) => item.status === "new").length;
  const contactedCount = enquiries.filter(
    (item) => item.status === "contacted"
  ).length;
  const closedCount = enquiries.filter(
    (item) => item.status === "closed"
  ).length;

  async function updateStatus(id, status) {
    setUpdatingId(id);
    setError("");
    setNotice("");

    try {
      await axios.patch(
        `${API_URL}/admin/enquiries/${id}/status`,
        { status },
        { withCredentials: true }
      );

      setNotice("Enquiry status updated successfully.");

      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry((current) =>
          current ? { ...current, status } : current
        );
      }

      await loadEnquiries(pagination.page, filter);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to update this enquiry. Please try again."
      );
    } finally {
      setUpdatingId("");
    }
  }

  function changePage(page) {
    setSelectedEnquiry(null);
    loadEnquiries(page, filter);
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#20201e]">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b border-[#e9e6df] bg-[#faf9f6]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-7 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              aria-label="Ethixweb home"
              className="text-xl font-bold tracking-[-0.06em] sm:text-2xl"
            >
              ethixweb<span className="text-[#c1272d]">.</span>
            </Link>

            <div className="hidden h-7 w-px bg-neutral-200 sm:block" />

            <div className="hidden items-center gap-2 text-sm text-neutral-500 sm:flex">
              <LayoutDashboard size={16} />
              Admin workspace
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Private workspace
            </span>

            <button
              type="button"
              onClick={() => loadEnquiries(pagination.page, filter)}
              disabled={loading}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-[#c1272d] disabled:opacity-50 sm:w-auto sm:gap-2 sm:px-4"
              aria-label="Refresh enquiries"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              <span className="hidden text-sm font-medium sm:inline">
                Refresh
              </span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#242421] px-3 text-sm font-medium text-white transition hover:bg-[#c1272d] sm:px-4"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-7 sm:py-10 lg:px-10 lg:py-12">
        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-[#242421] p-6 text-white sm:p-9 lg:p-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-24 size-64 rounded-full border border-white/10 sm:-right-6 sm:size-96"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-12 size-48 rounded-full border border-white/10 sm:size-72"
          />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/75">
                <Sparkles size={14} className="text-[#ffb8ad]" />
                Your business, at a glance
              </div>

              <h1 className="mt-6 text-3xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-5xl">
                Enquiries deserve
                <br />
                <span className="text-[#ffb8ad]">your attention.</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
                Keep conversations moving, follow up with potential clients,
                and manage incoming enquiries from one place.
              </p>
            </div>

            <div className="relative max-w-xs border-l-2 border-[#c1272d] py-1 pl-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                Matching enquiries
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.06em] tabular-nums sm:text-5xl">
                {pagination.total}
              </p>
              <p className="mt-2 text-xs leading-5 text-white/50">
                Based on the selected status filter
              </p>
            </div>
          </div>
        </section>

        {/* Page title */}
        <section className="mt-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c1272d]">
              <Activity size={14} />
              Overview
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
              Your enquiry inbox
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Review leads, respond to prospects, and keep statuses up to date.
            </p>
          </div>
        </section>

        {/* Metrics */}
        <section
          aria-label="Enquiry statistics for the current page"
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <MetricCard
            label="Matching enquiries"
            count={pagination.total}
            description="All records matching the selected filter"
            icon={Inbox}
            tone="red"
          />
          <MetricCard
            label="New on this page"
            count={newCount}
            description="Awaiting your first follow-up"
            icon={MessageSquare}
            tone="blue"
          />
          <MetricCard
            label="Contacted on this page"
            count={contactedCount}
            description="Conversations already started"
            icon={Clock3}
            tone="amber"
          />
          <MetricCard
            label="Closed on this page"
            count={closedCount}
            description="Enquiries marked as closed"
            icon={CheckCircle2}
            tone="green"
          />
        </section>

        {/* Inbox */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e9e6df] bg-white shadow-sm shadow-black/[0.02]">
          <div className="flex flex-col justify-between gap-5 border-b border-[#eeece6] p-5 sm:p-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#f9e8e6] text-[#c1272d]">
                  <Inbox size={18} />
                </div>
                <h2 className="text-lg font-semibold tracking-[-0.035em]">
                  Incoming leads
                </h2>
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {loading
                  ? "Updating your inbox..."
                  : `Showing ${visibleEnquiries.length} of ${enquiries.length} loaded enquiries`}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block min-w-0 sm:min-w-56">
                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search this page..."
                  aria-label="Search loaded enquiries"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-[#faf9f6] pl-10 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#c1272d] focus:bg-white focus:ring-4 focus:ring-[#c1272d]/[0.06]"
                />
              </label>

              <label className="flex h-11 items-center gap-3 rounded-xl border border-neutral-200 bg-[#faf9f6] px-3">
                <span className="text-xs font-medium text-neutral-500">
                  Status
                </span>
                <select
                  value={filter}
                  onChange={(event) => {
                    setFilter(event.target.value);
                    setSearch("");
                    setSelectedEnquiry(null);
                  }}
                  className="min-w-24 bg-transparent text-sm font-medium outline-none"
                >
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </label>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="m-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={() => loadEnquiries(pagination.page, filter)}
                className="inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 font-semibold transition hover:bg-red-100"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          )}

          {notice && (
            <div
              role="status"
              className="mx-5 mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 sm:mx-6"
            >
              <CheckCircle2 size={18} className="shrink-0" />
              {notice}
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
                className="ml-auto rounded-lg p-1 transition hover:bg-emerald-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {loading ? (
            <div className="space-y-4 p-5 sm:p-6" aria-live="polite">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-xl border border-neutral-100 p-5"
                >
                  <div className="h-4 w-40 rounded bg-neutral-200" />
                  <div className="mt-3 h-3 w-56 max-w-full rounded bg-neutral-100" />
                  <div className="mt-5 h-3 w-full rounded bg-neutral-100" />
                  <div className="mt-2 h-3 w-2/3 rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          ) : visibleEnquiries.length === 0 ? (
            <div className="px-6 py-16 text-center sm:py-20">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#f9e8e6] text-[#c1272d]">
                <Inbox size={25} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">
                {search ? "No matching enquiries" : "Your inbox is clear"}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                {search
                  ? "Try another name, email, company, service, or keyword."
                  : "When someone submits the contact form, their enquiry will appear here."}
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 text-sm font-semibold text-[#c1272d] hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#eeece6]">
              {visibleEnquiries.map((enquiry) => {
                const isExpanded = selectedEnquiry?._id === enquiry._id;

                return (
                  <article
                    key={enquiry._id}
                    className="p-5 transition-colors hover:bg-[#fdfcf9] sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0eee7] text-sm font-semibold uppercase text-[#57564f]">
                            {(enquiry.name || "?")
                              .trim()
                              .slice(0, 1)}
                          </div>

                          <div className="min-w-0">
                            <h3 className="break-words font-semibold tracking-[-0.02em]">
                              {enquiry.name || "Unnamed contact"}
                            </h3>
                            <p className="mt-1 break-all text-sm text-neutral-500">
                              {enquiry.email}
                            </p>
                          </div>

                          <StatusBadge status={enquiry.status} />
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700">
                            {enquiry.service || "Service unspecified"}
                          </span>

                          {enquiry.company && (
                            <span className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600">
                              {enquiry.company}
                            </span>
                          )}
                        </div>

                        <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-neutral-600">
                          {isExpanded || (enquiry.message || "").length <= 220
                            ? enquiry.message
                            : `${enquiry.message.slice(0, 220).trimEnd()}…`}
                        </p>

                        {(enquiry.message || "").length > 220 && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedEnquiry(
                                isExpanded ? null : enquiry
                              )
                            }
                            className="mt-2 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-[#c1272d] hover:underline"
                          >
                            {isExpanded ? "Show less" : "Read full message"}
                            {isExpanded ? (
                              <ArrowUpRight size={14} />
                            ) : (
                              <ArrowDownRight size={14} />
                            )}
                          </button>
                        )}

                        <p className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                          <Clock3 size={14} aria-hidden="true" />
                          Received {formatDate(enquiry.createdAt)}
                        </p>
                      </div>

                      <div className="w-full rounded-xl border border-neutral-200 bg-white p-4 lg:w-52 lg:shrink-0">
                        <label
                          htmlFor={`status-${enquiry._id}`}
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
                        >
                          Lead status
                        </label>

                        <select
                          id={`status-${enquiry._id}`}
                          aria-label={`Status for ${enquiry.name}`}
                          value={enquiry.status}
                          disabled={updatingId === enquiry._id}
                          onChange={(event) =>
                            updateStatus(enquiry._id, event.target.value)
                          }
                          className="h-10 w-full rounded-lg border border-neutral-200 bg-[#faf9f6] px-3 text-sm font-medium outline-none transition focus:border-[#c1272d] focus:ring-4 focus:ring-[#c1272d]/[0.06] disabled:opacity-50"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>

                        {updatingId === enquiry._id && (
                          <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                            <RefreshCw size={12} className="animate-spin" />
                            Saving status...
                          </p>
                        )}

                        <a
                          href={`mailto:${enquiry.email}`}
                          className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 text-xs font-semibold text-neutral-700 transition hover:border-[#c1272d]/30 hover:bg-[#f9e8e6] hover:text-[#c1272d]"
                        >
                          <Mail size={14} />
                          Reply by email
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && pagination.totalPages > 1 && (
            <footer className="flex flex-col gap-4 border-t border-[#eeece6] bg-[#fdfcf9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-neutral-500">
                Page{" "}
                <span className="font-semibold text-neutral-800">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-neutral-800">
                  {pagination.totalPages}
                </span>
                <span className="hidden sm:inline">
                  {" "}
                  · {pagination.total} matching enquiries
                </span>
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={pagination.page <= 1}
                  onClick={() => changePage(pagination.page - 1)}
                  className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium transition hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => changePage(pagination.page + 1)}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#242421] px-4 text-sm font-medium text-white transition hover:bg-[#c1272d] disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                >
                  Next
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </footer>
          )}
        </section>

        <footer className="mt-8 flex flex-col gap-2 border-t border-[#e9e6df] pt-5 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Ethixweb Admin Workspace</p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Restricted access · Keep customer information private
          </p>
        </footer>
      </div>
    </main>
  );
}
