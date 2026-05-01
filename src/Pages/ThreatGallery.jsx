import { useState, useMemo } from 'react'
import { threats, categories, severityConfig } from '../data/Threat'
import ThreatCard from '../components/ThreatCard'

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
const severities = ['All', 'critical', 'high', 'medium', 'low']

export default function ThreatGallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeSeverity, setActiveSeverity] = useState('All')
  const [searchQuery,    setSearchQuery]    = useState('')

  const filtered = useMemo(() => threats
    .filter(t => activeCategory === 'All' || t.category === activeCategory)
    .filter(t => activeSeverity === 'All' || t.severity === activeSeverity)
    .filter(t => {
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return t.name.toLowerCase().includes(q) || t.shortDesc.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))
    })
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  , [activeCategory, activeSeverity, searchQuery])

  const clearAll = () => { setActiveCategory('All'); setActiveSeverity('All'); setSearchQuery('') }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="section-label">Threat Intelligence</p>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">Threat Gallery</h1>
          <p className="text-sm text-cyber-muted font-mono max-w-lg leading-relaxed">
            A curated index of the most common cybersecurity threats. Click any card to expand the full breakdown and prevention guide.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted text-xs font-mono pointer-events-none">{'> '}</span>
            <input type="text" placeholder="Search threats..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-cyber-surface border border-cyber-border rounded text-xs font-mono text-cyber-text placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-green/50 transition-colors" />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-cyber-muted font-mono self-center mr-1">Category:</span>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded border font-mono transition-all ${
                  activeCategory === cat ? 'border-cyber-green text-cyber-green bg-cyber-green/5' : 'border-cyber-border text-cyber-muted hover:border-cyber-muted hover:text-cyber-text'
                }`}>{cat}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-cyber-muted font-mono self-center mr-1">Severity:</span>
            {severities.map(sev => (
              <button key={sev} onClick={() => setActiveSeverity(sev)}
                className={`text-xs px-3 py-1.5 rounded border font-mono transition-all capitalize ${
                  activeSeverity === sev
                    ? sev !== 'All' ? `${severityConfig[sev].color}` : 'border-cyber-green text-cyber-green bg-cyber-green/5'
                    : 'border-cyber-border text-cyber-muted hover:border-cyber-muted hover:text-cyber-text'
                }`}>{sev === 'All' ? 'All' : severityConfig[sev].label}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-cyber-muted font-mono">
            Showing <span className="text-cyber-green">{filtered.length}</span> of {threats.length} threats
          </p>
          {(activeCategory !== 'All' || activeSeverity !== 'All' || searchQuery) && (
            <button onClick={clearAll} className="text-xs font-mono text-cyber-muted hover:text-cyber-red transition-colors">× Clear filters</button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
            {filtered.map(threat => <ThreatCard key={threat.id} threat={threat} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-cyber-muted font-mono">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-sm">No threats found for this filter combination.</p>
            <button onClick={clearAll} className="mt-4 text-xs text-cyber-green hover:text-white transition-colors">→ Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  )
}