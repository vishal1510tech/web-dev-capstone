import { useState } from 'react'
import { severityConfig } from '../Data/Threat'

export default function ThreatCard({ threat }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const sev = severityConfig[threat.severity] || { label: 'Medium', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' }

  return (
    <div className={`cyber-card p-6 flex flex-col justify-between transition-all duration-300 ${isExpanded ? 'border-indigo-500/50 shadow-indigo-500/10' : ''}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0">{threat.icon}</span>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">{threat.name}</h3>
              <span className="text-xs text-slate-400 font-mono">{threat.category}</span>
            </div>
          </div>
          <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${sev.color}`}>
            {sev.label}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{threat.shortDesc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {threat.tags.map(tag => (
            <span key={tag} className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="border-t border-slate-800 pt-4 mt-2 space-y-4 animate-fade-in">
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 font-mono">Detailed Analysis</h4>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">{threat.fullDesc}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono">Prevention Checklist</h4>
              <ul className="space-y-2">
                {threat.prevention.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {threat.realWorldExample && (
              <div className="bg-slate-950/60 rounded-xl p-3.5 border-l-2 border-amber-500/80">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono mb-1">Real-World Case Study</p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{threat.realWorldExample}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-between w-full"
      >
        <span>{isExpanded ? 'Hide details' : 'Learn more & prevention guide'}</span>
        <span>{isExpanded ? '↑' : '↓'}</span>
      </button>
    </div>
  )
}