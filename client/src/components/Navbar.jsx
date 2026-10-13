
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eae5df]/80 bg-[#f8f6f2]/90 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-3.5">
      <div className="mx-auto max-w-[1400px]">
        <nav
          aria-label="Main navigation"
          className="relative flex min-h-[66px] items-center justify-between rounded-[18px] border border-[#eae5df] bg-white/95 px-4 shadow-[0_3px_14px_rgba(36,30,25,0.035)] transition-shadow duration-300 hover:shadow-[0_5px_20px_rgba(36,30,25,0.055)] sm:px-7 lg:px-9"
        >
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Ethixweb home"
            className="group inline-flex shrink-0 items-center"
          >
            <span className="text-[25px] font-extrabold tracking-[-1.6px] text-[#c1272d] transition-colors duration-200 group-hover:text-[#a51e24] sm:text-[27px]">
              ethixweb
            </span>
            <span className="mb-0.5 text-[27px] font-black leading-none text-[#24211f]">
              .
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `group relative rounded-lg px-4 py-2.5 text-[14px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1272d] ${
                    isActive
                      ? "text-[#c1272d]"
                      : "text-[#625d58] hover:text-[#c1272d]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-[3px] left-4 right-4 h-[2px] origin-center rounded-full bg-[#c1272d] transition-transform duration-200 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="group hidden items-center gap-2 rounded-full bg-[#c1272d] px-5 py-[12px] text-[13px] font-semibold tracking-[0.1px] text-white shadow-[0_3px_9px_rgba(193,39,45,0.13)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a91f25] hover:shadow-[0_6px_15px_rgba(193,39,45,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c1272d] md:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eae5df] bg-[#faf8f5] text-[#292522] transition-colors hover:border-[#c1272d]/30 hover:bg-[#c1272d]/[0.04] hover:text-[#c1272d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1272d] md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "mt-2 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`rounded-[18px] border border-[#eae5df] bg-white p-3 shadow-[0_8px_24px_rgba(36,30,25,0.06)] ${
                menuOpen ? "" : "invisible"
              }`}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#c1272d]/[0.06] text-[#c1272d]"
                          : "text-[#625d58] hover:bg-[#f8f6f2] hover:text-[#c1272d]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c1272d]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}

                <Link
                  to="/contact"
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#c1272d] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#a91f25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1272d]"
                >
                  Let&apos;s talk
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <p className="mt-3 border-t border-[#efebe6] px-2 pt-3 text-xs text-[#89827c]">
                Thoughtful strategy. Practical execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
