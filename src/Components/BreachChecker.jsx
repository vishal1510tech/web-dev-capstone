import { useState } from 'react'
import { checkPasswordBreach } from '../services/pwnedApi'
import PasswordStrengthMeter from './PasswordStrengthMeter'

const stateIcons = { idle: '🔑', loading: '⏳', safe: '✅', breached: '⚠️', error: '❌' }

export default function BreachChecker() {
  const [password, setPassword]   = useState('')
  const [show, setShow]           = useState(false)
  const [status, setStatus]       = useState('idle') // idle | loading | safe | breached | error
  const [breachCount, setBreachCount] = useState(null)
  const [errorMsg, setErrorMsg]   = useState('')

  const handleCheck = async () => {
    if (!password.trim()) return
    setStatus('loading')
    setBreachCount(null)
    setErrorMsg('')
    try {
      const count = await checkPasswordBreach(password)
      if (count) {
        setBreachCount(parseInt(count.replace(/,/g, ''), 10))
        setStatus('breached')
      } else {
        setStatus('safe')
      }
    } catch (e) {
      setStatus('error')
      setErrorMsg('Failed to reach the API. Check your connection.')
    }
  }

  const reset = () => {
    setPassword('')
    setStatus('idle')
    setBreachCount(null)
    setErrorMsg('')
  }

  return (
    <div className="cyber-card p-6 sm:p-8">
      {/* Header */}
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

      {/* Input row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <div className="relative flex-1">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCheck()}
            placeholder="Enter a password to check…"
            className="w-full bg-cyber-dark border border-cyber-border rounded px-4 py-2.5 pr-10 text-sm font-mono text-cyber-text placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-green/60 transition-colors"
          />
          <button
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-cyber-text transition-colors text-xs font-mono"
            title={show ? 'Hide' : 'Show'}
          >
            {show ? '🙈' : '👁️'}
          </button>
        </div>
        <button
          onClick={handleCheck}
          disabled={!password || status === 'loading'}
          className="cyber-btn cyber-btn-primary whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Checking…' : 'Check'}
        </button>
      </div>

      {/* Real-time strength meter */}
      <PasswordStrengthMeter password={password} />

      {/* Result */}
      {status === 'breached' && (
        <div className="mt-5 p-4 rounded border border-cyber-red/40 bg-cyber-red/5">
          <p className="text-sm font-mono font-bold text-cyber-red mb-1">
            ⚠️ Breached — found {breachCount?.toLocaleString()} times
          </p>
          <p className="text-xs font-mono text-cyber-muted">
            This password has appeared in data breaches. Never use it anywhere.
          </p>
          <button onClick={reset} className="mt-3 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
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
            This password hasn't been seen in public breaches — but check the strength score above too.
          </p>
          <button onClick={reset} className="mt-3 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
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