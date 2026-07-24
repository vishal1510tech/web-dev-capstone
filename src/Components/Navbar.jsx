import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/threats', label: 'Threat Gallery' },
  { path: '/quiz', label: 'Safety Quiz' },
  { path: '/resources', label: 'Resources' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev)
  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-lg">🛡️</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1">
              Cyber<span className="text-indigo-400">Shield</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wide">DIGITAL SAFETY HUB</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 items-center bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          {NAVIGATION_ITEMS.map(({ path, label }) => {
            const isActive = pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Action Badge */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="tel:1930"
            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
            title="National Cyber Crime Helpline"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Helpline: 1930
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-slate-900 border border-slate-800"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {NAVIGATION_ITEMS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMenu}
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === path
                  ? 'text-white bg-indigo-600/90'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2">
            <a 
              href="tel:1930" 
              className="block text-center text-xs font-mono py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              📞 National Cyber Crime Helpline: 1930
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}