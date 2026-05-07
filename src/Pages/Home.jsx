import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreachChecker from '../Components/BreachChecker'

const QUICK_STATS = [
  { value: '3.5B+', label: 'Phishing emails sent every day' },
  { value: '4,000+', label: 'Daily ransomware attacks' },
  { value: '$4.45M', label: 'Average cost of a data breach' },
  { value: '82%', label: 'Breaches that involve human error' },
]

const CORE_FEATURES = [
  {
    icon: '🗂️',
    title: 'Threat Library',
    desc: 'Deep dives into 8 common attack types with prevention tips and real-world examples.',
    href: '/threats',
    cta: 'Explore the library →',
    style: 'group-hover:text-cyber-green',
  },
  {
    icon: '🔍',
    title: 'Link Scanner',
    desc: 'Verify suspicious links against the VirusTotal database in seconds.',
    href: '/scanner',
    cta: 'Scan a link now →',
    style: 'group-hover:text-cyber-blue',
    isNew: true,
  },
  {
    icon: '🛠️',
    title: 'Security Tools',
    desc: 'Vetted list of free privacy apps, password managers, and official reporting portals.',
    href: '/resources',
    cta: 'Browse resources →',
    style: 'group-hover:text-cyber-amber',
  },
]

const MESSAGES = [
  'Stay Ahead of Cyber Threats.',
  'Is your password actually safe?',
  'Scan suspicious links instantly.',
  'Think like an attacker to stay safe.',
]

/**
 * Custom hook for that classic typewriter effect on the hero section.
 */
function useTypewriter(lines, typeSpeed = 60, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentLine = lines[lineIndex]
    let timer

    if (!isDeleting && charIndex < currentLine.length) {
      // Typing mode
      timer = setTimeout(() => {
        setDisplayText(currentLine.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, typeSpeed)
    } else if (isDeleting && charIndex > 0) {
      // Deleting mode
      timer = setTimeout(() => {
        setDisplayText(currentLine.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, typeSpeed / 2)
    } else if (!isDeleting && charIndex === currentLine.length) {
      // Pause at the end of the line
      timer = setTimeout(() => setIsDeleting(true), pauseTime)
    } else {
      // Move to the next line after a tiny pause to avoid sync state update issues
      timer = setTimeout(() => {
        setIsDeleting(false)
        setLineIndex(prev => (prev + 1) % lines.length)
        setCharIndex(0)
      }, 0)
    }

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, lineIndex, lines, typeSpeed, pauseTime])

  return displayText
}

export default function Home() {
  const animatedHeader = useTypewriter(MESSAGES)

  return (
    <div className="pt-24 min-h-screen bg-grid">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <p className="section-label mb-4">Protect Your Digital Life</p>

        <h1 className="font-mono text-3xl sm:text-5xl font-black text-white leading-tight mb-2 min-h-[3.5rem] sm:min-h-[4rem]">
          {animatedHeader}
          <span className="text-cyber-green animate-pulse ml-0.5">|</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm text-cyber-muted font-mono leading-relaxed">
          The internet is a dangerous place, but it doesn't have to be confusing. 
          Use our tools to check your credentials, scan suspicious links, and learn 
          how to stay one step ahead of hackers.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/scanner" className="cyber-btn cyber-btn-primary flex items-center gap-2">
            <span>🔍</span> Scan a Link
            <span className="text-xs px-1.5 py-0.5 rounded bg-cyber-dark/40 text-cyber-blue border border-cyber-blue/30">NEW</span>
          </Link>
          <Link to="/threats" className="cyber-btn cyber-btn-secondary">
            Learn About Threats
          </Link>
        </div>
      </section>

      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {QUICK_STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-2xl sm:text-3xl font-black text-cyber-green text-glow-green mb-1">
                {value}
              </p>
              <p className="text-xs font-mono text-cyber-muted leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <p className="section-label mb-2">What we offer</p>
        <h2 className="font-mono text-2xl font-bold text-white mb-10">Key Features</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {CORE_FEATURES.map(({ icon, title, desc, href, cta, style, isNew }) => (
            <Link
              key={title}
              to={href}
              className="cyber-card p-6 group block hover:border-cyber-green/20 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className={`font-mono text-sm font-bold text-cyber-text transition-colors ${style}`}>
                  {title}
                </h3>
                {isNew && (
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-5">{desc}</p>
              <span className={`text-xs font-mono transition-colors text-cyber-muted ${style}`}>{cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="section-label mb-2">Security 101</p>
          <h2 className="font-mono text-2xl font-bold text-white mb-10">Good Habits to Start Today</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔑', tip: "Don't reuse passwords. Ever. A password manager makes this way easier." },
              { icon: '📲', tip: 'Enable 2FA on everything—especially your email and bank accounts.' },
              { icon: '🔄', tip: "Updates are annoying, but they fix critical security holes. Don't skip them." },
              { icon: '🔍', tip: 'Hover before you click. Check if that link is actually where it says it is.' },
              { icon: '💾', tip: 'Back up your stuff. 3 copies, 2 media types, 1 offsite (like cloud).' },
              { icon: '📵', tip: "Public Wi-Fi is like a public bathroom—convenient, but don't trust it with sensitive data." },
            ].map(({ icon, tip }) => (
              <div key={tip} className="cyber-card p-5 flex gap-4 items-start">
                <span className="text-xl shrink-0">{icon}</span>
                <p className="text-xs font-mono text-cyber-muted leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <p className="section-label mb-2">Real-time Safety Check</p>
        <h2 className="font-mono text-2xl font-bold text-white mb-8">Password Vulnerability Test</h2>
        <BreachChecker />
      </section>
    </div>
  )
}