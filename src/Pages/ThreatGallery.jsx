import { useState, useMemo } from 'react'
import { threats, categories } from '../Data/Threat'
import ThreatCard from '../Components/ThreatCard'

export default function ThreatGallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Memoize the filtering to keep it snappy as the list grows
  const filteredThreats = useMemo(() => {
    return threats.filter(t => {
      const q = searchTerm.toLowerCase()
      const matchesSearch = 
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, activeCategory])

  const clearFilters = () => {
    setSearchTerm('')
    setActiveCategory('All')
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        
        <div className="mb-12">
          <p className="section-label">Knowledge Base</p>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">
            Threat Gallery
          </h1>
          <p className="text-sm text-cyber-muted font-mono max-w-xl leading-relaxed">
            A comprehensive look at modern cyber threats. Understanding how these attacks 
            work is the first step in defending against them.
          </p>
        </div>

        <div className="cyber-card p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
            <div className="flex-1">
              <p className="text-xs font-mono text-cyber-muted mb-2 uppercase tracking-tighter">Search Threats</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted opacity-50">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Try 'phishing', 'email', or 'critical'..."
                  className="w-full bg-cyber-dark border border-cyber-border rounded px-10 py-2.5 text-sm font-mono text-cyber-text focus:outline-none focus:border-cyber-green/50 transition-colors"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-white transition-colors text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="shrink-0">
              <p className="text-xs font-mono text-cyber-muted mb-2 uppercase tracking-tighter">Filter by Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded font-mono text-xs border transition-all ${
                      activeCategory === cat
                        ? 'bg-cyber-green/10 border-cyber-green text-cyber-green'
                        : 'bg-transparent border-cyber-border text-cyber-muted hover:border-cyber-muted/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredThreats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThreats.map(threat => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
        ) : (
          <div className="cyber-card p-20 text-center">
            <p className="text-3xl mb-4">🕵️‍♂️</p>
            <h3 className="font-mono text-lg font-bold text-white mb-2">No threats found</h3>
            <p className="text-xs font-mono text-cyber-muted">
              We couldn't find anything matching your filters.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-6 text-xs font-mono text-cyber-blue hover:text-white transition-colors underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="mt-16 p-6 border border-cyber-border/30 rounded bg-cyber-surface/10">
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            <span className="text-cyber-amber font-bold">Disclaimer:</span> This gallery is for educational purposes. 
            For real-time security alerts, always follow official sources like CISA or CERT-In.
          </p>
        </div>
      </div>
    </div>
  )
}