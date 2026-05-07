import { Link } from 'react-router-dom'

const RESOURCE_CATEGORIES = [
  {
    id: 'tools',
    title: 'Essential Privacy Tools',
    icon: '🛠️',
    description: "These are the basics. If you aren't using a password manager and a privacy-first browser, start here.",
    links: [
      { name: 'Bitwarden', desc: 'Open-source, free, and cross-platform password manager.', url: 'https://bitwarden.com' },
      { name: 'uBlock Origin', desc: 'The only ad blocker you actually need. Fast and honest.', url: 'https://ublockorigin.com' },
      { name: 'Brave Browser', desc: 'Chromium-based browser with built-in ad and tracker blocking.', url: 'https://brave.com' },
      { name: 'Signal Messenger', desc: 'End-to-end encrypted messaging that actually respects your privacy.', url: 'https://signal.org' },
    ]
  },
  {
    id: 'learning',
    title: 'Free Learning Platforms',
    icon: '📚',
    description: "Want to go deeper? These sites offer excellent, free courses on cybersecurity and ethical hacking.",
    links: [
      { name: 'TryHackMe', desc: 'Hands-on, gamified learning for all skill levels. Highly recommended.', url: 'https://tryhackme.com' },
      { name: 'Cybrary', desc: 'Huge library of free video courses on security certifications.', url: 'https://cybrary.it' },
      { name: 'OverTheWire', desc: 'Learn Linux and security basics through fun wargames.', url: 'https://overthewire.org' },
    ]
  },
  {
    id: 'checkers',
    title: 'Instant Security Checkers',
    icon: '🔍',
    description: "Quick ways to check if your accounts or local files have been compromised.",
    links: [
      { name: 'Have I Been Pwned', desc: 'The gold standard for checking if your email has been in a data breach.', url: 'https://haveibeenpwned.com' },
      { name: 'VirusTotal', desc: 'Upload files or paste links to scan them with 70+ antivirus engines.', url: 'https://virustotal.com' },
      { name: 'URLhaus', desc: 'Community-driven database of malicious URLs being used for malware.', url: 'https://urlhaus.abuse.ch' },
    ]
  },
  {
    id: 'reporting',
    title: 'Where to Report Scams',
    icon: '📢',
    description: "If you've been targeted by a scam, reporting it helps protect others from falling for the same trap.",
    links: [
      { name: 'Report Phishing (Google)', desc: 'Report malicious sites directly to Google Safe Browsing.', url: 'https://safebrowsing.google.com/safebrowsing/report_phish/' },
      { name: 'FTC Fraud Report', desc: 'Official US portal to report identity theft and scams.', url: 'https://reportfraud.ftc.gov' },
      { name: 'Action Fraud (UK)', desc: 'National reporting center for fraud and cybercrime in the UK.', url: 'https://www.actionfraud.police.uk' },
    ]
  }
]

export default function Resources() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-12">
          <p className="section-label">Curated Recommendations</p>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">
            Security Resources
          </h1>
          <p className="text-sm text-cyber-muted font-mono max-w-xl leading-relaxed">
            I've put together a list of tools and platforms that are actually useful. 
            Most of these are free, open-source, and widely trusted by the security community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESOURCE_CATEGORIES.map(category => (
            <div key={category.id} className="cyber-card p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className="font-mono text-xl font-bold text-cyber-text">{category.title}</h2>
                </div>
              </div>
              
              <p className="text-xs font-mono text-cyber-muted mb-8 leading-relaxed italic">
                "{category.description}"
              </p>

              <div className="space-y-4">
                {category.links.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded border border-cyber-border/40 hover:border-cyber-blue/40 bg-cyber-dark/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-mono text-sm font-bold text-cyber-text group-hover:text-cyber-blue transition-colors">
                        {link.name}
                      </h3>
                      <span className="text-cyber-muted group-hover:text-cyber-blue transition-colors text-xs">↗</span>
                    </div>
                    <p className="text-xs font-mono text-cyber-muted leading-relaxed group-hover:text-cyber-text/80 transition-colors">
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 cyber-card p-8 border-cyber-blue/30 bg-cyber-blue/5 text-center">
          <h3 className="font-mono text-lg font-bold text-white mb-4">Want a real challenge?</h3>
          <p className="text-sm font-mono text-cyber-muted max-w-xl mx-auto mb-8 leading-relaxed">
            Put your knowledge to the test. See if you can spot the phishing attempts 
            and identify common security pitfalls in our interactive quiz.
          </p>
          <Link to="/quiz" className="cyber-btn cyber-btn-primary inline-flex items-center gap-2">
            <span>🛡️</span> Take the Security Quiz
          </Link>
        </div>
        
        <div className="mt-10 p-5 border border-cyber-border/40 rounded bg-cyber-surface/20">
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            <span className="text-cyber-amber">Note:</span> All external links open in a new tab. This project is not affiliated with or sponsored by any tools listed above.
          </p>
        </div>
      </div>
    </div>
  )
}