const resources = [
  {
    category: 'Essential Tools', icon: '🛠️',
    items: [
      { name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', desc: 'Check if your email appeared in any known data breach. Free service by security researcher Troy Hunt.', tags: ['Free', 'Privacy'] },
      { name: 'Bitwarden', url: 'https://bitwarden.com', desc: 'Open-source, end-to-end encrypted password manager. Generate and store unique passwords for every account.', tags: ['Free', 'Open Source', 'Passwords'] },
      { name: 'Proton VPN', url: 'https://protonvpn.com', desc: 'Swiss-based VPN with a genuinely free tier. Encrypts your internet traffic on public Wi-Fi.', tags: ['Free Tier', 'VPN', 'Privacy'] },
      { name: 'Authy', url: 'https://authy.com', desc: 'Two-factor authentication app. Enable MFA on every service that supports it.', tags: ['Free', 'MFA'] },
    ],
  },
  {
    category: 'Learning Resources', icon: '📚',
    items: [
      { name: 'SANS Cyber Aces', url: 'https://cyberaces.org', desc: 'Free online courses from SANS Institute covering networking, OS fundamentals, and systems security.', tags: ['Free', 'Beginner', 'Course'] },
      { name: 'TryHackMe', url: 'https://tryhackme.com', desc: 'Gamified cybersecurity learning platform with guided rooms for beginners through to advanced practitioners.', tags: ['Free Tier', 'Hands-On'] },
      { name: 'CERT-In (India)', url: 'https://www.cert-in.org.in', desc: "India's national cybersecurity agency. Advisories, incident reporting, and awareness resources for Indian users.", tags: ['Free', 'India', 'Official'] },
      { name: 'CISA', url: 'https://www.cisa.gov/cybersecurity', desc: 'Official US government cybersecurity resources, alerts, and best-practice guides.', tags: ['Free', 'Official'] },
    ],
  },
  {
    category: 'Privacy-First Tools', icon: '🔐',
    items: [
      { name: 'Brave Browser', url: 'https://brave.com', desc: 'Chromium-based browser with built-in ad and tracker blocking. Significantly reduces your data footprint.', tags: ['Free', 'Browser', 'Privacy'] },
      { name: 'DuckDuckGo', url: 'https://duckduckgo.com', desc: "Search engine that doesn't track your searches or build a profile on you.", tags: ['Free', 'Search', 'Privacy'] },
      { name: 'Signal', url: 'https://signal.org', desc: 'End-to-end encrypted messaging app recommended by cryptography experts. No ads. No data collection.', tags: ['Free', 'Messaging', 'E2E'] },
      { name: 'ProtonMail', url: 'https://proton.me', desc: 'End-to-end encrypted email hosted in Switzerland. Your emails cannot be read by anyone else.', tags: ['Free Tier', 'Email', 'E2E'] },
    ],
  },
  {
    category: 'Incident Reporting', icon: '🚨',
    items: [
      { name: 'Cybercrime.gov.in', url: 'https://cybercrime.gov.in', desc: "India's official portal to report cybercrimes including phishing, financial fraud, and online harassment.", tags: ['India', 'Official', 'Report'] },
      { name: 'No More Ransom', url: 'https://www.nomoreransom.org', desc: 'Free ransomware decryption tools for many known ransomware families. Joint law enforcement project.', tags: ['Free', 'Ransomware'] },
      { name: 'IC3 (FBI)', url: 'https://www.ic3.gov', desc: "FBI's internet crime complaint center for reporting cybercrime.", tags: ['USA', 'Official', 'Report'] },
      { name: 'Action Fraud (UK)', url: 'https://www.actionfraud.police.uk', desc: "UK's national fraud and cybercrime reporting centre.", tags: ['UK', 'Official', 'Report'] },
    ],
  },
]

const quickTips = [
  { icon: '🔑', tip: 'Use a password manager and enable MFA everywhere.' },
  { icon: '🔄', tip: 'Install security updates the same day they drop.' },
  { icon: '💾', tip: 'Follow the 3-2-1 backup rule for important data.' },
  { icon: '🔒', tip: 'Only use HTTPS sites for anything sensitive.' },
  { icon: '📧', tip: 'Verify sender identity before clicking any link in email.' },
  { icon: '📵', tip: 'Use mobile data, not public Wi-Fi, for banking apps.' },
  { icon: '🧩', tip: 'Uninstall apps you no longer use.' },
  { icon: '👁️', tip: 'Review and revoke unnecessary app permissions.' },
]

export default function Resources() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-12">
          <p className="section-label">Toolbox</p>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">Resources & Tools</h1>
          <p className="text-sm text-cyber-muted font-mono max-w-lg leading-relaxed">
            Vetted free tools, learning platforms, and official reporting channels. Practical starting points — not paid promotions.
          </p>
        </div>

        {/* Quick tips */}
        <div className="cyber-card p-6 mb-14">
          <p className="section-label mb-5">Quick Security Wins</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickTips.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg shrink-0">{item.icon}</span>
                <p className="text-xs font-mono text-cyber-muted leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resource sections */}
        <div className="space-y-14">
          {resources.map(section => (
            <div key={section.category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">{section.icon}</span>
                <h2 className="font-display text-lg font-bold text-white tracking-wider">{section.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map(item => (
                  <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="cyber-card p-5 block hover:border-cyber-green/30 transition-colors duration-200 group">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-mono text-sm font-medium text-cyber-text group-hover:text-cyber-green transition-colors leading-snug">{item.name}</h3>
                      <span className="text-cyber-muted/40 group-hover:text-cyber-green/60 transition-colors ml-3 mt-0.5 shrink-0">↗</span>
                    </div>
                    <p className="text-xs text-cyber-muted font-mono leading-relaxed mb-3">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-cyber-border/50 text-cyber-muted rounded font-mono">{tag}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-5 border border-cyber-border/40 rounded bg-cyber-surface/20">
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            <span className="text-cyber-amber">Note:</span> All external links open in a new tab. This project is not affiliated with or sponsored by any tools listed above. Resources are included purely as educational aids.
          </p>
        </div>
      </div>
    </div>
  )
}