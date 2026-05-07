import { useState } from 'react'
import { scanUrl, parseVtResult, hasApiKey } from '../services/urlScannerApi'

const EXAMPLE_URLS = [
  'https://github.com',
  'http://google.com',
  'https://facebook.com',
]

/* ── Setup guide shown when no API key is configured ── */
function SetupGuide() {
  return (
    <div className="cyber-card p-6 sm:p-8 border-cyber-amber/40 bg-cyber-amber/5">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-3xl shrink-0">🔑</span>
        <div>
          <h2 className="font-mono text-base font-bold text-cyber-amber mb-1">API Key Required</h2>
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            This feature uses the{' '}
            <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer"
              className="text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
              VirusTotal
            </a>{' '}
            URL scanning API. VirusTotal is free — just create an account.
          </p>
        </div>
      </div>

      <ol className="space-y-4 mb-6">
        {[
          { n: '1', text: 'Go to', link: 'https://www.virustotal.com/gui/join-us', label: 'virustotal.com/gui/join-us', after: 'and create a free account.' },
          { n: '2', text: 'After logging in, click your profile icon → API Key. Copy the key.' },
          { n: '3', text: 'Open your project\'s .env.local file and add this line:' },
          { n: '4', text: 'Save the file and restart the dev server (Ctrl+C then npm run dev).' },
        ].map((step, i) => (
          <li key={i} className="flex gap-4 items-start">
            <span className="font-mono text-sm font-black text-cyber-amber/60 w-5 shrink-0">{step.n}</span>
            <div className="text-xs font-mono text-cyber-muted leading-relaxed">
              {step.text}{' '}
              {step.link && (
                <a href={step.link} target="_blank" rel="noopener noreferrer"
                  className="text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
                  {step.label}
                </a>
              )}{' '}
              {step.after}
            </div>
          </li>
        ))}
      </ol>

      {/* Code snippet */}
      <div className="bg-cyber-dark rounded border border-cyber-border p-4 mb-4">
        <p className="text-xs font-mono text-cyber-muted mb-1 text-xs"># .env.local</p>
        <p className="text-sm font-mono text-cyber-green">
          VITE_VT_KEY=<span className="text-cyber-text">your_api_key_here</span>
        </p>
      </div>

      <p className="text-xs font-mono text-cyber-muted/60">
        Free tier: 500 requests/day · 4 requests/minute · No credit card required.
      </p>
    </div>
  )
}

/* ── Result card ── */
function ResultCard({ result }) {
  if (!result) return null

  if (result.safe === null) {
    // Queued or invalid
    return (
      <div className="cyber-card p-6 border-cyber-amber/40 bg-cyber-amber/5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">⏳</span>
          <p className="font-mono text-sm font-bold text-cyber-amber">{result.status}</p>
        </div>
        <p className="text-xs font-mono text-cyber-muted">{result.description}</p>
      </div>
    )
  }

  if (!result.found || result.safe) {
    const notInDb = !result.found
    return (
      <div className={`cyber-card p-6 ${notInDb ? 'border-cyber-amber/30 bg-cyber-amber/5' : 'border-cyber-green/40 bg-cyber-green/5'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{notInDb ? '❓' : '✅'}</span>
          <p className={`font-mono text-sm font-bold ${notInDb ? 'text-cyber-amber' : 'text-cyber-green'}`}>
            {result.status}
          </p>
        </div>
        <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-3">{result.description}</p>
        {result.total > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-cyber-border rounded-full h-1.5">
              <div className="bg-cyber-green h-1.5 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-xs font-mono text-cyber-muted">{result.total} engines</span>
          </div>
        )}
        {result.vtLink && (
          <a href={result.vtLink} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-block text-xs font-mono text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
            View on VirusTotal ↗
          </a>
        )}
      </div>
    )
  }

  // Threat found
  const color = result.malicious ? 'cyber-red' : 'cyber-amber'
  const borderCls = result.malicious ? 'border-cyber-red/50 bg-cyber-red/5' : 'border-cyber-amber/40 bg-cyber-amber/5'
  const textCls   = result.malicious ? 'text-cyber-red' : 'text-cyber-amber'

  return (
    <div className={`cyber-card p-6 ${borderCls}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{result.malicious ? '🚨' : '⚠️'}</span>
          <div>
            <p className={`font-mono text-sm font-bold ${textCls}`}>{result.status}</p>
            {result.scanDate && (
              <p className="text-xs font-mono text-cyber-muted mt-0.5">
                Last scanned: {new Date(result.scanDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {result.malicious && (
          <span className="text-xs font-mono px-2 py-1 rounded bg-cyber-red/20 text-cyber-red border border-cyber-red/30 animate-pulse">
            DANGER
          </span>
        )}
      </div>

      <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-4">{result.description}</p>

      {/* Detection bar */}
      {result.total > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono text-cyber-muted mb-1">
            <span>Detection rate</span>
            <span className={textCls}>{result.positives} / {result.total}</span>
          </div>
          <div className="flex-1 bg-cyber-border rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${result.malicious ? 'bg-cyber-red' : 'bg-cyber-amber'}`}
              style={{ width: `${Math.min(100, (result.positives / result.total) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Engines that flagged it */}
      {result.engines.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-mono text-cyber-muted mb-2">Flagged by:</p>
          <div className="flex flex-wrap gap-2">
            {result.engines.map(({ engine, result: r }) => (
              <div key={engine} className={`text-xs font-mono px-2 py-1 rounded border ${borderCls.includes('red') ? 'border-cyber-red/30 text-cyber-red bg-cyber-red/10' : 'border-cyber-amber/30 text-cyber-amber bg-cyber-amber/10'}`}>
                <span className="font-semibold">{engine}</span>
                {r && <span className="text-cyber-muted ml-1">· {r}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {result.vtLink && (
        <a href={result.vtLink} target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-mono text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
          View full VirusTotal report ↗
        </a>
      )}

      <div className="mt-4 p-3 rounded bg-cyber-dark/60 border border-cyber-border/40">
        <p className="text-xs font-mono text-cyber-muted">
          <span className="text-cyber-amber">⚠ Warning:</span> Do NOT visit this URL. If you received it in an email or message, report it to your email provider.
        </p>
      </div>
    </div>
  )
}

export default function URLScanner() {
  const [url, setUrl]       = useState('')
  const [status, setStatus] = useState('idle')   // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [scanned, setScanned]  = useState('')

  const apiReady = hasApiKey()

  const handleScan = async (targetUrl) => {
    const u = (targetUrl ?? url).trim()
    if (!u || !apiReady) return
    setStatus('loading')
    setResult(null)
    setErrorMsg('')
    setScanned(u)
    try {
      const raw = await scanUrl(u)
      setResult(parseVtResult(raw))
      setStatus('done')
    } catch (e) {
      if (e.message === 'NO_KEY') {
        setStatus('idle')
        return
      }
      setStatus('error')
      setErrorMsg(e.message || 'Scan failed. Please try again.')
    }
  }

  const reset = () => {
    setUrl('')
    setStatus('idle')
    setResult(null)
    setScanned('')
    setErrorMsg('')
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

        {/* Header */}
        <div className="mb-10">
          <p className="section-label">VirusTotal API</p>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">
            URL Threat Scanner
          </h1>
          <p className="text-sm text-cyber-muted font-mono max-w-lg leading-relaxed">
            Check any suspicious URL against{' '}
            <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer"
              className="text-cyber-blue hover:text-white transition-colors">
              VirusTotal
            </a>
            {' '}— 70+ antivirus engines and URL scanners in one lookup.
          </p>
        </div>

        {/* Setup guide OR scanner */}
        {!apiReady ? (
          <SetupGuide />
        ) : (
          <>
            {/* Warning banner */}
            <div className="flex items-start gap-3 p-4 rounded border border-cyber-amber/30 bg-cyber-amber/5 mb-8">
              <span className="text-lg shrink-0">⚠️</span>
              <p className="text-xs font-mono text-cyber-muted leading-relaxed">
                <span className="text-cyber-amber font-semibold">Safety first:</span> Never actually visit suspicious URLs.
                This tool only looks up the URL in VirusTotal's database — it never visits the site on your behalf.
              </p>
            </div>

            {/* Scanner card */}
            <div className="cyber-card p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleScan()}
                  placeholder="https://suspicious-site.com/file.exe"
                  className="flex-1 bg-cyber-dark border border-cyber-border rounded px-4 py-2.5 text-sm font-mono text-cyber-text placeholder:text-cyber-muted/40 focus:outline-none focus:border-cyber-blue/60 transition-colors"
                />
                <button
                  onClick={() => handleScan()}
                  disabled={!url.trim() || status === 'loading'}
                  className="cyber-btn cyber-btn-primary whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75"/>
                      </svg>
                      Scanning…
                    </span>
                  ) : 'Scan URL'}
                </button>
              </div>

              {/* Example URLs */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-cyber-muted/60">Try:</span>
                {EXAMPLE_URLS.map(u => (
                  <button key={u} onClick={() => setUrl(u)}
                    className="text-xs font-mono text-cyber-muted hover:text-cyber-blue transition-colors">
                    {u}
                  </button>
                ))}
              </div>

              {/* Scanned URL echo */}
              {scanned && status !== 'loading' && (
                <div className="mt-5 p-3 rounded bg-cyber-dark/70 border border-cyber-border/40">
                  <p className="text-xs font-mono text-cyber-muted break-all">
                    <span className="text-cyber-green/60">&gt; </span>Scanned:{' '}
                    <span className="text-cyber-text">{scanned}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Loading */}
            {status === 'loading' && (
              <div className="cyber-card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="animate-spin h-8 w-8 text-cyber-blue" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-20"/>
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <p className="text-sm font-mono text-cyber-muted">Querying 70+ security engines…</p>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div className="cyber-card p-6 border-cyber-red/40 bg-cyber-red/5">
                <p className="text-sm font-mono text-cyber-red mb-2">❌ {errorMsg}</p>
                <button onClick={reset} className="text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
                  × Try again
                </button>
              </div>
            )}

            {/* Result */}
            {status === 'done' && result && (
              <div className="space-y-4">
                <ResultCard result={result} />
                <button onClick={reset} className="text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
                  ← Scan another URL
                </button>
              </div>
            )}
          </>
        )}

        {/* How it works */}
        <div className="mt-14 space-y-3">
          <p className="section-label">How it works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'You paste a URL', desc: 'Enter the full URL including the protocol (https://).' },
              { step: '02', title: '70+ engines checked', desc: 'VirusTotal checks the URL against antivirus engines, URL scanners, and domain blocklists simultaneously.' },
              { step: '03', title: 'Detailed verdict', desc: 'See how many engines flagged it, which ones, and what threat category was identified.' },
            ].map(item => (
              <div key={item.step} className="cyber-card p-5">
                <p className="text-3xl font-mono font-black text-cyber-border mb-3">{item.step}</p>
                <h3 className="text-sm font-mono font-bold text-cyber-text mb-2">{item.title}</h3>
                <p className="text-xs font-mono text-cyber-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 p-4 border border-cyber-border/30 rounded">
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            <span className="text-cyber-amber">Note:</span> Powered by{' '}
            <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:text-white transition-colors">
              VirusTotal
            </a>
            . A clean result does not guarantee safety — newly created malicious URLs may not yet be in the database.
            Always be cautious with unsolicited links.
          </p>
        </div>
      </div>
    </div>
  )
}
