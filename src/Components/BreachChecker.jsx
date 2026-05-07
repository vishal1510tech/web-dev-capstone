import { useState } from 'react'
import { checkPasswordBreach } from '../services/pwnedApi'
import PasswordStrengthMeter from './PasswordStrengthMeter'

const stateIcons = { idle: '🔑', loading: '⏳', safe: '✅', breached: '⚠️', error: '❌' }

export default function BreachChecker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle')
  const [breachCount, setBreachCount] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const runSecurityCheck = async () => {
    if (!password.trim()) return

    // Show the user we're working on it
    setStatus('loading')
    setBreachCount(null)
    setErrorMsg('')

    try {
      // We only send a prefix of the hash to HIBP for privacy (k-anonymity)
      const count = await checkPasswordBreach(password)

      if (count) {
        // Clean up the count in case the API returned formatted numbers
        const cleanCount = parseInt(count.replace(/,/g, ''), 10)
        setBreachCount(cleanCount)
        setStatus('breached')
      } else {
        setStatus('safe')
      }
    } catch (err) {
      console.error('Password check failed:', err)
      setStatus('error')
      setErrorMsg("Something went wrong with the API. Check your internet connection?")
    }
  }

  const clearForm = () => {
    setPassword('')
    setStatus('idle')
    setBreachCount(null)
    setErrorMsg('')
  }

  return (
    <div className="cyber-card p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{stateIcons[status]}</span>
        <div>
          <p className="section-label">HIBP Passwords API</p>
          <h2 className="font-mono text-lg font-bold text-cyber-text">Password Breach Checker</h2>
        </div>
      </div>

      <p className="text-xs font-mono text-cyber-muted mb-6 leading-relaxed">
        Your password is <span className="text-cyber-green">never sent</span> to any server.
        We use k-anonymity — only the first 5 characters of a SHA-1 hash leave your device.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <div className="relative flex-1">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && runSecurityCheck()}
            placeholder="Enter a password to check…"
            className="w-full bg-cyber-dark border border-cyber-border rounded px-4 py-2.5 pr-10 text-sm font-mono text-cyber-text placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-green/60 transition-colors"
          />
          <button
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-cyber-text transition-colors text-xs font-mono"
            title={showPassword ? 'Hide' : 'Show'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button
          onClick={runSecurityCheck}
          disabled={!password || status === 'loading'}
          className="cyber-btn cyber-btn-primary whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Checking…' : 'Check'}
        </button>
      </div>

      <PasswordStrengthMeter password={password} />

      {status === 'breached' && (
        <div className="mt-5 p-4 rounded border border-cyber-red/40 bg-cyber-red/5">
          <p className="text-sm font-mono font-bold text-cyber-red mb-1">
            ⚠️ Breached — found {breachCount?.toLocaleString()} times
          </p>
          <p className="text-xs font-mono text-cyber-muted">
            This password has appeared in data breaches. Please don't use it!
          </p>
          <button onClick={clearForm} className="mt-3 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
            × Clear and try another
          </button>
        </div>
      )}

      {status === 'safe' && (
        <div className="mt-5 p-4 rounded border border-cyber-green/40 bg-cyber-green/5">
          <p className="text-sm font-mono font-bold text-cyber-green mb-1">
            ✅ Not found in any known breach
          </p>
          <p className="text-xs font-mono text-cyber-muted">
            This password hasn't been seen in public breaches — but make sure it's still strong.
          </p>
          <button onClick={clearForm} className="mt-3 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
            × Check another
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-5 p-4 rounded border border-orange-500/40 bg-orange-500/5">
          <p className="text-sm font-mono text-orange-400">❌ {errorMsg}</p>
        </div>
      )}

      <p className="mt-5 text-xs font-mono text-cyber-muted/50">
        Powered by <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer"
          className="hover:text-cyber-blue transition-colors underline underline-offset-2">
          HaveIBeenPwned Passwords API
        </a>
      </p>
    </div>
  )
}