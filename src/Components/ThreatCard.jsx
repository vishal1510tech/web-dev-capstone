import { useState } from 'react'
import { severityConfig } from '../data/Threat'

export default function ThreatCard({ threat }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const sev = severityConfig[threat.severity]

  return (
    <div className={`cyber-card p-5 transition-all duration-300 ${isExpanded ? 'border-cyber-blue/50' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{threat.icon}</span>
          <div>
            <h3 className="font-display text-sm font-bold text-white tracking-wider">{threat.name}</h3>
            <span className="text-xs text-cyber-muted font-mono">{threat.category}</span>
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded border font-mono ${sev.color}`}>{sev.label}</span>
      </div>

      {/* Short desc */}
      <p className="text-xs text-cyber-muted font-mono leading-relaxed mb-4">{threat.shortDesc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {threat.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-cyber-border/50 text-cyber-muted rounded font-mono">#{tag}</span>
        ))}
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div className="border-t border-cyber-border pt-4 mt-2 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-4">
            <p className="section-label">Overview</p>
            <p className="text-xs text-cyber-text font-mono leading-relaxed whitespace-pre-line">{threat.fullDesc}</p>
          </div>
          <div className="mb-4">
            <p className="section-label">How to Protect Yourself</p>
            <ul className="space-y-2">
              {threat.prevention.map((tip, i) => (
                <li key={i} className="flex gap-2 text-xs font-mono text-cyber-text leading-relaxed">
                  <span className="text-cyber-green shrink-0">✓</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cyber-darker rounded p-3 border-l-2 border-cyber-amber/60">
            <p className="section-label text-cyber-amber/70">Real-World Case</p>
            <p className="text-xs font-mono text-cyber-muted leading-relaxed">{threat.realWorldExample}</p>
          </div>
        </div>
      )}

      <button onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-xs font-mono text-cyber-blue hover:text-cyber-green transition-colors flex items-center gap-1">
        {isExpanded ? <>↑ Show less</> : <>↓ Learn more &amp; prevention tips</>}
      </button>
    </div>
  )
}