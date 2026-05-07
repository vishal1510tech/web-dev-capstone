import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreachChecker from '../Components/BreachChecker'

const STATS = [
  { value: '3.5B+', label: 'Phishing emails sent daily'  },
  { value: '4,000+', label: 'Ransomware attacks per day' },
  { value: '$4.45M', label: 'Avg. cost of a breach'      },
  { value: '82%',    label: 'Breaches involve humans'    },
]

const FEATURES = [
  {
    icon: '🗂️',
    title: 'Threat Gallery',
    desc: 'Explore 8 real-world attack types with full breakdowns, prevention guides, and real-world examples.',
    href: '/threats',
    cta: 'Browse threats →',
    accent: 'group-hover:text-cyber-green',
  },
  {
    icon: '🔍',
    title: 'URL Scanner',
    desc: 'Paste any suspicious link and scan it against the URLhaus malware database in real-time.',
    href: '/scanner',
    cta: 'Scan a URL →',
    accent: 'group-hover:text-cyber-blue',
    badge: 'NEW',
  },
  {
    icon: '🛠️',
    title: 'Resources',
    desc: 'Vetted free tools, privacy-first apps, learning platforms, and official reporting channels.',
    href: '/resources',
    cta: 'View resources →',
    accent: 'group-hover:text-cyber-amber',
  },
]

const TYPING_STRINGS = [
  'Stay Ahead of Cyber Threats.',
  'Check if your password was breached.',
  'Scan suspicious URLs instantly.',
  'Learn how attackers think.',
]

function useTypingEffect(strings, speed = 60, pause = 2000) {
  const [text, setText]   = useState('')
  const [phase, setPhase] = useState('typing')  // typing | pausing | deleting
  const [strIdx, setStrIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const target = strings[strIdx]
    let timer

    if (phase === 'typing') {
      if (charIdx < target.length) {
        timer = setTimeout(() => {
          setText(target.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, speed)
      } else {
        timer = setTimeout(() => setPhase('deleting'), pause)
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setText(target.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, speed / 2)
      } else {
        setStrIdx(i => (i + 1) % strings.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timer)
  }, [phase, charIdx, strIdx, strings, speed, pause])

  return text
}

export default function Home() {
  const typedText = useTypingEffect(TYPING_STRINGS)

  return (
    <div className="pt-24 min-h-screen bg-grid">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <p className="section-label mb-4">Cybersecurity Awareness Platform</p>

        <h1 className="font-mono text-3xl sm:text-5xl font-black text-white leading-tight mb-2 min-h-[3.5rem] sm:min-h-[4rem]">
          {typedText}
          <span className="text-cyber-green animate-pulse ml-0.5">|</span>
        </h1>

        <p className="mt-6 max-w-xl text-sm text-cyber-muted font-mono leading-relaxed">
          Learn how modern attacks work, check if your credentials were leaked,
          and scan suspicious URLs — all from one place. No jargon, just useful knowledge.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/scanner" className="cyber-btn cyber-btn-primary flex items-center gap-2">
            <span>🔍</span> Scan a URL
            <span className="text-xs px-1.5 py-0.5 rounded bg-cyber-dark/40 text-cyber-blue border border-cyber-blue/30">NEW</span>
          </Link>
          <Link to="/threats" className="cyber-btn cyber-btn-secondary">
            Explore Threats
          </Link>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-mono text-2xl sm:text-3xl font-black text-cyber-green text-glow-green mb-1">
                {value}
              </p>
              <p className="text-xs font-mono text-cyber-muted leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <p className="section-label mb-2">What you can do here</p>
        <h2 className="font-mono text-2xl font-bold text-white mb-10">Platform Features</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, desc, href, cta, accent, badge }) => (
            <Link
              key={title}
              to={href}
              className="cyber-card p-6 group block hover:border-cyber-green/20 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className={`font-mono text-sm font-bold text-cyber-text transition-colors ${accent}`}>
                  {title}
                </h3>
                {badge && (
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-5">{desc}</p>
              <span className={`text-xs font-mono transition-colors text-cyber-muted ${accent}`}>{cta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── QUICK TIPS ───────────────────────────────────── */}
      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <p className="section-label mb-2">Security 101</p>
          <h2 className="font-mono text-2xl font-bold text-white mb-10">Essential Habits</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔑', tip: 'Use a unique password for every account — a password manager makes this easy.' },
              { icon: '📲', tip: 'Enable two-factor authentication on email, banking, and social accounts.' },
              { icon: '🔄', tip: 'Install security updates the same day they are released.' },
              { icon: '🔍', tip: 'Hover over links before clicking — check the real destination URL.' },
              { icon: '💾', tip: 'Follow the 3-2-1 backup rule: 3 copies, 2 media types, 1 offsite.' },
              { icon: '📵', tip: 'Avoid public Wi-Fi for sensitive tasks — use mobile data or a VPN.' },
            ].map(({ icon, tip }) => (
              <div key={tip} className="cyber-card p-5 flex gap-4 items-start">
                <span className="text-xl shrink-0">{icon}</span>
                <p className="text-xs font-mono text-cyber-muted leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BREACH CHECKER ───────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <p className="section-label mb-2">HIBP Passwords API + zxcvbn</p>
        <h2 className="font-mono text-2xl font-bold text-white mb-8">Password Health Check</h2>
        <BreachChecker />
      </section>

    </div>
  )
}