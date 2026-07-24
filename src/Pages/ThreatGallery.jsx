import { useState, useMemo } from 'react'
import { threats, categories } from '../Data/Threat'
import ThreatCard from '../Components/ThreatCard'

export default function ThreatGallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredThreats = useMemo(() => {
    return threats.filter(t => {
      const q = searchTerm.toLowerCase()
      const matchesSearch = 
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.shortDesc.toLowerCase().includes(q) ||
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
        
        {/* Header */}
        <div className="mb-10">
          <span className="section-label">Knowledge Base</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Cyber Threat Gallery
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Understand how online scams, malware, and social engineering tactics operate so you can spot them before they cause harm.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="cyber-card p-5 mb-10 bg-slate-900/90 border-slate-800">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search threats (e.g. phishing, ransomware, passwords)..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    activeCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Display */}
        {filteredThreats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThreats.map(threat => (
              <ThreatCard key={threat.id} threat={threat} />
            ))}
          </div>
        ) : (
          <div className="cyber-card p-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-white mb-1">No threats match your query</h3>
            <p className="text-xs text-slate-400 mb-6">Try searching with a different keyword or resetting filters.</p>
            <button 
              onClick={clearFilters}
              className="cyber-btn-secondary"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Disclaimer Card */}
        <div className="mt-16 p-5 border border-slate-800 rounded-xl bg-slate-950/60 flex items-start gap-3">
          <span className="text-xl shrink-0">ℹ️</span>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            <strong className="text-slate-200">Note:</strong> This gallery is intended for public safety education. For immediate reporting of ongoing cyber crimes or financial fraud in India, call the official National Cyber Crime Helpline at <strong className="text-emerald-400 font-mono">1930</strong> or register a complaint at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">cybercrime.gov.in</a>.
          </p>
        </div>
      </div>
    </div>
  )
}