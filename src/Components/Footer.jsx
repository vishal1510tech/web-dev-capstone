import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-sm font-bold text-white tracking-widest mb-3">
              CYBER<span className="text-cyber-green">SHIELD</span>
            </div>
            <p className="text-xs text-cyber-muted leading-relaxed font-mono">
              A cybersecurity awareness project to help everyday users understand modern threats and adopt safer digital habits.
            </p>
          </div>
          <div>
            <p className="section-label mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/threats', 'Threat Gallery'], ['/quiz', 'Self-Assessment'], ['/resources', 'Resources']].map(([to, label]) => (
                <Link key={to} to={to} className="text-xs font-mono text-cyber-muted hover:text-cyber-green transition-colors">
                  <span className="text-cyber-green/40 mr-1.5">›</span>{label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-4">About</p>
            <p className="text-xs text-cyber-muted font-mono leading-relaxed">
              Built as a B.Tech college project using React + Vite + Tailwind CSS. No personal data is collected.
            </p>
          </div>
        </div>
        <div className="border-t border-cyber-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-cyber-muted font-mono">
            <span className="text-cyber-green/50">[</span> Educational Use Only <span className="text-cyber-green/50">]</span>
          </p>
          <p className="text-xs text-cyber-muted font-mono">
            <span className="inline-block w-1.5 h-1.5 bg-cyber-green rounded-full mr-2 align-middle animate-pulse-green" />
            System Secure
          </p>
        </div>
      </div>
    </footer>
  )
}