import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { path: '/',          label: 'Home'     },
  { path: '/threats',   label: 'Threats'  },
  { path: '/scanner',   label: 'Scanner'  },
  { path: '/resources', label: 'Resources'},
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cyber-dark/90 backdrop-blur-md border-b border-cyber-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-cyber-green font-mono text-xl font-black tracking-widest group-hover:text-glow-green transition-all">
            CYBER<span className="text-cyber-text">SHIELD</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-mono transition-colors ${
                pathname === path
                  ? 'text-cyber-green'
                  : 'text-cyber-muted hover:text-cyber-text'
              }`}
            >
              {label}
              {path === '/scanner' && (
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 font-mono">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden text-cyber-muted hover:text-cyber-text transition-colors p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-cyber-border bg-cyber-dark/95 backdrop-blur-md">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center px-6 py-3 text-sm font-mono border-b border-cyber-border/40 transition-colors ${
                pathname === path
                  ? 'text-cyber-green bg-cyber-green/5'
                  : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface/40'
              }`}
            >
              {label}
              {path === '/scanner' && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}