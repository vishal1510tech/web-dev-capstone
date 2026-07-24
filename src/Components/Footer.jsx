import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛡️</span>
              <span className="font-bold text-base text-white">
                Cyber<span className="text-indigo-400">Shield</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              An educational digital safety initiative built to help everyday individuals and families understand online threats, protect personal privacy, and build smart cybersecurity habits.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase mb-3">Explore</p>
            <div className="flex flex-col gap-2.5">
              {[
                ['/', 'Home & Password Check'],
                ['/threats', 'Threat Knowledge Base'],
                ['/quiz', 'Interactive Safety Quiz'],
                ['/resources', 'Free Security Tools']
              ].map(([to, label]) => (
                <Link key={to} to={to} className="text-xs text-slate-300 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <span className="text-indigo-500/70">›</span> {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-400 font-mono tracking-wider uppercase mb-3">National Helplines (India)</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              If you have experienced financial fraud or cybercrime, report immediately to official authorities:
            </p>
            <div className="space-y-1.5">
              <a href="tel:1930" className="text-xs font-mono text-emerald-400 hover:underline block">
                📞 Cyber Crime Helpline: <strong>1930</strong>
              </a>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-slate-300 hover:text-indigo-400 hover:underline block">
                🌐 Portal: <strong>cybercrime.gov.in</strong>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-sans">
            © {new Date().getFullYear()} CyberShield Hub. Created for educational awareness. No personal passwords or user data are ever stored or transmitted.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400 font-mono">System Active & Privacy Protected</span>
          </div>
        </div>
      </div>
    </footer>
  )
}