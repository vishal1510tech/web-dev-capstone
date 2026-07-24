import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreachChecker from '../Components/BreachChecker'

const QUICK_STATS = [
  { value: '3.5B+', label: 'Phishing attempts sent daily worldwide' },
  { value: '₹37 Cr', label: 'Average cost of a corporate data breach in India' },
  { value: '82%', label: 'Cyber security incidents caused by human error' },
  { value: '100%', label: 'Free, private & client-side safety tools' },
]

const CORE_FEATURES = [
  {
    icon: '📚',
    title: 'Threat Knowledge Base',
    desc: 'Detailed breakdown of 8 common digital attacks with prevention steps and real-world cases.',
    href: '/threats',
    cta: 'Explore threat library →',
    badge: 'Educational',
    badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    icon: '🎯',
    title: 'Interactive Safety Quiz',
    desc: 'Test your security knowledge with realistic phishing, UPI scam, and password scenarios.',
    href: '/quiz',
    cta: 'Take safety assessment →',
    badge: 'Interactive',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    icon: '🛠️',
    title: 'Privacy & Security Tools',
    desc: 'Vetted list of free password managers, ad blockers, and official Indian cybercrime reporting portals.',
    href: '/resources',
    cta: 'View recommended tools →',
    badge: 'Curated',
    badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
]

const MESSAGES = [
  'Simple Cyber Safety for Everyday Life.',
  'Check if your password was leaked online.',
  'Learn to spot scams before clicking.',
  'Protect your bank accounts & privacy.',
]

function useTypewriter(lines, typeSpeed = 50, pauseTime = 2200) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentLine = lines[lineIndex]
    let timer

    if (!isDeleting && charIndex < currentLine.length) {
      timer = setTimeout(() => {
        setDisplayText(currentLine.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, typeSpeed)
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentLine.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, typeSpeed / 2)
    } else if (!isDeleting && charIndex === currentLine.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime)
    } else {
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
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="section-label">Cybersecurity Awareness</span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 min-h-[4rem] sm:min-h-[4.5rem] tracking-tight">
            {animatedHeader}
            <span className="text-indigo-400 animate-pulse ml-0.5">|</span>
          </h1>

          <p className="mt-4 text-base text-slate-300 font-sans leading-relaxed">
            Cybersecurity doesn't have to be overwhelming. CyberShield helps you build practical digital safety habits, check for password leaks, and protect yourself against online fraud and scams.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#password-check" className="cyber-btn-primary">
              <span>🔑</span> Check Password Safety
            </a>
            <Link to="/threats" className="cyber-btn-secondary">
              Explore Threat Gallery
            </Link>
            <Link to="/quiz" className="cyber-btn-secondary border-indigo-500/30 text-indigo-300 hover:text-white">
              <span>🎯</span> Take Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {QUICK_STATS.map(({ value, label }) => (
            <div key={label} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-center">
              <p className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">
                {value}
              </p>
              <p className="text-xs text-slate-400 font-sans leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Safety Ecosystem</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">How CyberShield Helps You</h2>
          <p className="text-sm text-slate-400 mt-2">Everything you need to navigate the digital world with confidence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CORE_FEATURES.map(({ icon, title, desc, href, cta, badge, badgeStyle }) => (
            <Link
              key={title}
              to={href}
              className="cyber-card p-6 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-slate-800/70 border border-slate-700/60">{icon}</span>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{desc}</p>
              </div>
              <span className="text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                {cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Good Digital Habits */}
      <section className="border-t border-slate-800 bg-slate-950/40 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="section-label">Daily Protection</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">6 Habits for Digital Peace of Mind</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🔑', title: 'Unique Passwords', tip: 'Never reuse passwords across sites. Use a password manager like Bitwarden.' },
              { icon: '📱', title: 'Enable Two-Factor (2FA)', tip: 'Turn on 2FA on WhatsApp, Gmail, and banking apps for an extra protective layer.' },
              { icon: '🔄', title: 'Keep Devices Updated', tip: 'Software updates contain critical security patches. Don’t delay system updates.' },
              { icon: '💳', title: 'Never Share UPI PIN', tip: 'UPI PIN is ONLY required to send money or check balance—never to receive payments.' },
              { icon: '💾', title: 'Backup Essential Data', tip: 'Store copies of important documents on an external drive or secure cloud storage.' },
              { icon: '🌐', title: 'Avoid Public Wi-Fi for Banking', tip: 'Never log into bank accounts on public Wi-Fi without using a trusted VPN.' },
            ].map(({ icon, title, tip }) => (
              <div key={title} className="cyber-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl p-2 rounded-lg bg-slate-800">{icon}</span>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Password Breach Checker Section */}
      <section id="password-check" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <span className="section-label">Instant Security Test</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Password Vulnerability Test</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Test passwords against known public breach databases. Powered by k-anonymity for 100% privacy.
          </p>
        </div>
        <BreachChecker />
      </section>
    </div>
  )
}