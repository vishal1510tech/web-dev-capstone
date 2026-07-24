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

  const runSecurityCheck = async (e) => {
    if (e) e.preventDefault()
    if (!password.trim()) return

    setStatus('loading')
    setBreachCount(null)
    setErrorMsg('')

    try {
      // Send only SHA-1 prefix (k-anonymity) for complete client-side privacy
      const count = await checkPasswordBreach(password)

      if (count) {
        const cleanCount = parseInt(count.replace(/,/g, ''), 10)
        setBreachCount(cleanCount)
        setStatus('breached')
      } else {
        setStatus('safe')
      }
    } catch (err) {
      console.error('Password check failed:', err)
      setStatus('error')
      setErrorMsg("Unable to reach breach database. Please check your network connection.")
    }
  }

  const clearForm = () => {
    setPassword('')
    setStatus('idle')
    setBreachCount(null)
    setErrorMsg('')
  }

  return (
    <div className="cyber-card p-6 sm:p-8 bg-slate-900/90 border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{stateIcons[status]}</span>
            <h3 className="font-bold text-lg text-white">Data Breach Exposure Check</h3>
          </div>
          <p className="text-xs text-slate-400">
            Check if a password has been leaked in past public data breaches.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          K-Anonymity Privacy Protected
        </div>
      </div>

      <form onSubmit={runSecurityCheck} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type a password to test..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3.5 pr-24 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <PasswordStrengthMeter password={password} />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!password.trim() || status === 'loading'}
            className="cyber-btn-primary flex-1 py-3"
          >
            {status === 'loading' ? 'Searching Breach Logs...' : 'Check Password Safety'}
          </button>

          {password && (
            <button
              type="button"
              onClick={clearForm}
              className="cyber-btn-secondary"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Results Feedback */}
      {status === 'breached' && (
        <div className="mt-5 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-rose-400 mb-1">
                Breached Password — Exposed {breachCount?.toLocaleString()} times!
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                This password has appeared in known public data dumps. If you currently use this password for any email, bank, or social account, <strong>change it immediately</strong> to prevent credential stuffing attacks.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === 'safe' && (
        <div className="mt-5 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-bold text-emerald-400 mb-1">
                Clean Result — No Known Exposure
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                This password was not found in public breach records. Make sure it remains unique to a single service and is never reused across multiple sites.
              </p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-5 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
          <p className="text-xs font-mono text-amber-300">❌ {errorMsg}</p>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span>Powered by HaveIBeenPwned API</span>
        <span className="font-mono text-slate-400">Zero Password Storage</span>
      </div>
    </div>
  )
}