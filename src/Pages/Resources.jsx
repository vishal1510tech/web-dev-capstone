import { Link } from 'react-router-dom'

const RESOURCE_CATEGORIES = [
  {
    id: 'tools',
    title: 'Essential Privacy & Security Tools',
    icon: '🛠️',
    description: "Start with these basics. Using a password manager and an ad blocker protects you against 90% of automated threats.",
    links: [
      { name: 'Bitwarden', desc: 'Free, open-source, and cross-platform password manager.', url: 'https://bitwarden.com' },
      { name: 'uBlock Origin', desc: 'The most effective, lightweight open-source ad and tracker blocker.', url: 'https://ublockorigin.com' },
      { name: 'Brave Browser', desc: 'Fast, privacy-focused web browser with built-in ad protection.', url: 'https://brave.com' },
      { name: 'Signal Messenger', desc: 'End-to-end encrypted messaging with zero commercial tracking.', url: 'https://signal.org' },
    ]
  },
  {
    id: 'reporting',
    title: 'Official Reporting Portals (India)',
    icon: '📢',
    description: "If you encounter financial fraud or cybercrime, reporting it promptly can help freeze stolen funds and protect others.",
    links: [
      { name: 'National Cyber Crime Portal (India)', desc: 'Official portal (cybercrime.gov.in) to file complaints for financial and online fraud.', url: 'https://cybercrime.gov.in' },
      { name: 'CERT-In Security Advisories', desc: 'Indian Computer Emergency Response Team security alerts and vulnerability reports.', url: 'https://www.cert-in.org.in' },
      { name: 'Chakshu Portal (Sanchar Saathi)', desc: 'Report suspected fraudulent calls, SMS, and WhatsApp messages in India.', url: 'https://sancharsaathi.gov.in' },
      { name: 'RBI Financial Awareness', desc: 'Reserve Bank of India guidelines on safe digital banking and UPI payments.', url: 'https://rbidocs.rbi.org.in' },
    ]
  },
  {
    id: 'checkers',
    title: 'Breach Checkers & Verification',
    icon: '🔍',
    description: "Public verification tools to check if your credentials or accounts were compromised.",
    links: [
      { name: 'Have I Been Pwned', desc: 'The trusted global standard to check if your email was leaked in a breach.', url: 'https://haveibeenpwned.com' },
      { name: 'Google Password Checkup', desc: 'Audit passwords saved in your Google Account for weak or reused passwords.', url: 'https://passwords.google.com' },
    ]
  },
  {
    id: 'learning',
    title: 'Free Cybersecurity Education',
    icon: '📚',
    description: "Practical platforms to learn security concepts, network safety, and ethical hacking.",
    links: [
      { name: 'TryHackMe', desc: 'Hands-on, gamified learning labs for beginner to intermediate levels.', url: 'https://tryhackme.com' },
      { name: 'Cybrary', desc: 'Free video courses covering fundamental cybersecurity certifications.', url: 'https://cybrary.it' },
      { name: 'OverTheWire', desc: 'Interactive Linux and cybersecurity wargames for hands-on practice.', url: 'https://overthewire.org' },
    ]
  }
]

export default function Resources() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">Curated Recommendations</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Security Tools & Resources
          </h1>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Handpicked tools, official reporting portals, and free learning platforms trusted by security professionals worldwide.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESOURCE_CATEGORIES.map(category => (
            <div key={category.id} className="cyber-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-slate-800 border border-slate-700/60">{category.icon}</span>
                  <h2 className="text-lg font-bold text-white">{category.title}</h2>
                </div>
                
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-3">
                  {category.links.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-xl border border-slate-800 hover:border-indigo-500/50 bg-slate-950/60 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {link.name}
                        </h3>
                        <span className="text-slate-500 group-hover:text-indigo-400 transition-colors text-xs">↗</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {link.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Quiz Box */}
        <div className="mt-16 cyber-card p-8 border-indigo-500/30 bg-slate-900/90 text-center max-w-3xl mx-auto">
          <span className="text-3xl mb-2 inline-block">🎯</span>
          <h3 className="text-xl font-bold text-white mb-2">Ready to test your digital safety skills?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Take our 10-question interactive assessment to see how well you can spot phishing, UPI scams, and password risks.
          </p>
          <Link to="/quiz" className="cyber-btn-primary inline-flex items-center gap-2">
            <span>🎯</span> Start Safety Quiz
          </Link>
        </div>
        
        <div className="mt-10 p-4 border border-slate-800 rounded-xl bg-slate-950/60 text-center">
          <p className="text-xs text-slate-500">
            <strong className="text-slate-400">Disclaimer:</strong> External links open in a new browser tab. CyberShield is an educational project not affiliated with or sponsored by any third-party tools listed.
          </p>
        </div>
      </div>
    </div>
  )
}