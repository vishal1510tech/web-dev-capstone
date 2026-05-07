import { useState } from 'react'
import { scanUrl, parseVtResult, hasApiKey } from '../services/urlScannerApi'

const SUGGESTED_URLS = [
  'https://github.com',
  'http://google.com',
  'https://facebook.com',
]

function SetupGuide() {
  return (
    <div className="cyber-card p-6 sm:p-8 border-cyber-amber/40 bg-cyber-amber/5">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-3xl shrink-0">🔑</span>
        <div>
          <h2 className="font-mono text-base font-bold text-cyber-amber mb-1">API Key Needed</h2>
          <p className="text-xs font-mono text-cyber-muted leading-relaxed">
            This tool uses the{' '}
            <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer"
              className="text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
              VirusTotal
            </a>{' '}
            API to check for threats. It's free, you just need a key.
          </p>
        </div>
      </div>

      <ol className="space-y-4 mb-6">
        {[
          { n: '1', text: 'Create a free account at', link: 'https://www.virustotal.com/gui/join-us', label: 'virustotal.com' },
          { n: '2', text: 'Grab your API Key from your profile settings.' },
          { n: '3', text: 'Add it to your .env.local file as VITE_VT_KEY.' },
          { n: '4', text: 'Restart your dev server to apply the changes.' },
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
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="bg-cyber-dark rounded border border-cyber-border p-4 mb-4">
        <p className="text-xs font-mono text-cyber-muted mb-1"># .env.local</p>
        <p className="text-sm font-mono text-cyber-green">
          VITE_VT_KEY=<span className="text-cyber-text">your_key_here</span>
        </p>
      </div>
    </div>
  )
}

function ResultCard({ scanResult }) {
  if (!scanResult) return null

  // If the URL isn't in their database yet
  if (scanResult.safe === null) {
    return (
      <div className="cyber-card p-6 border-cyber-amber/40 bg-cyber-amber/5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">⏳</span>
          <p className="font-mono text-sm font-bold text-cyber-amber">{scanResult.status}</p>
        </div>
        <p className="text-xs font-mono text-cyber-muted">{scanResult.description}</p>
      </div>
    )
  }

  // Handle clean or unknown results
  if (!scanResult.found || scanResult.safe) {
    const isNewSite = !scanResult.found
    return (
      <div className={`cyber-card p-6 ${isNewSite ? 'border-cyber-amber/30 bg-cyber-amber/5' : 'border-cyber-green/40 bg-cyber-green/5'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{isNewSite ? '❓' : '✅'}</span>
          <p className={`font-mono text-sm font-bold ${isNewSite ? 'text-cyber-amber' : 'text-cyber-green'}`}>
            {scanResult.status}
          </p>
        </div>
        <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-3">{scanResult.description}</p>
        
        {scanResult.total > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-cyber-border rounded-full h-1.5">
              <div className="bg-cyber-green h-1.5 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-xs font-mono text-cyber-muted">{scanResult.total} engines checked</span>
          </div>
        )}
        
        {scanResult.vtLink && (
          <a href={scanResult.vtLink} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-block text-xs font-mono text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
            Full Report on VirusTotal ↗
          </a>
        )}
      </div>
    )
  }

  // We found a threat
  const isDangerous = scanResult.malicious
  const statusColor = isDangerous ? 'text-cyber-red' : 'text-cyber-amber'
  const cardStyle = isDangerous ? 'border-cyber-red/50 bg-cyber-red/5' : 'border-cyber-amber/40 bg-cyber-amber/5'

  return (
    <div className={`cyber-card p-6 ${cardStyle}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isDangerous ? '🚨' : '⚠️'}</span>
          <div>
            <p className={`font-mono text-sm font-bold ${statusColor}`}>{scanResult.status}</p>
            {scanResult.scanDate && (
              <p className="text-xs font-mono text-cyber-muted mt-0.5">
                Last checked: {new Date(scanResult.scanDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {isDangerous && (
          <span className="text-xs font-mono px-2 py-1 rounded bg-cyber-red/20 text-cyber-red border border-cyber-red/30 animate-pulse">
            DANGER
          </span>
        )}
      </div>

      <p className="text-xs font-mono text-cyber-muted leading-relaxed mb-4">{scanResult.description}</p>

      {scanResult.total > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-mono text-cyber-muted mb-1">
            <span>Detection rate</span>
            <span className={statusColor}>{scanResult.positives} / {scanResult.total}</span>
          </div>
          <div className="flex-1 bg-cyber-border rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${isDangerous ? 'bg-cyber-red' : 'bg-cyber-amber'}`}
              style={{ width: `${Math.min(100, (scanResult.positives / scanResult.total) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {scanResult.engines.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-mono text-cyber-muted mb-2">Engines that flagged this:</p>
          <div className="flex flex-wrap gap-2">
            {scanResult.engines.map(({ engine, result: r }) => (
              <div key={engine} className={`text-xs font-mono px-2 py-1 rounded border ${isDangerous ? 'border-cyber-red/30 text-cyber-red bg-cyber-red/10' : 'border-cyber-amber/30 text-cyber-amber bg-cyber-amber/10'}`}>
                <span className="font-semibold">{engine}</span>
                {r && <span className="text-cyber-muted ml-1">· {r}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {scanResult.vtLink && (
        <a href={scanResult.vtLink} target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-mono text-cyber-blue hover:text-white transition-colors underline underline-offset-2">
          View full VirusTotal report ↗
        </a>
      )}

      <div className="mt-4 p-3 rounded bg-cyber-dark/60 border border-cyber-border/40">
        <p className="text-xs font-mono text-cyber-muted">
          <span className="text-cyber-amber">⚠ Warning:</span> Stay away from this URL. If you found it in an email, it's likely a trap.
        </p>
      </div>
    </div>
  )
}

export default function URLScanner() {
  const [targetUrl, setTargetUrl] = useState('')
  const [scanStatus, setScanStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastScannedUrl, setLastScannedUrl] = useState('')

  const hasKey = hasApiKey()

  const startScan = async (urlOverride) => {
    const finalUrl = (urlOverride ?? targetUrl).trim()
    if (!finalUrl || !hasKey) return

    setScanStatus('loading')
    setResult(null)
    setErrorMessage('')
    setLastScannedUrl(finalUrl)

    try {
      const rawData = await scanUrl(finalUrl)
      setResult(parseVtResult(rawData))
      setScanStatus('done')
    } catch (err) {
      if (err.message === 'NO_KEY') {
        setScanStatus('idle')
        return
      }
      setScanStatus('error')
      setErrorMessage(err.message || "Couldn't complete the scan. Try again?")
    }
  }

  const resetScanner = () => {
    setTargetUrl('')
    setScanStatus('idle')
    setResult(null)
    setLastScannedUrl('')
    setErrorMessage('')
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

        <div className="mb-10">
          <p className="section-label">VirusTotal Integration</p>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white tracking-wide mb-4">
            URL Threat Scanner
          </h1>
          <p className="text-sm text-cyber-muted font-mono max-w-lg leading-relaxed">
            Instantly check any link against 70+ antivirus engines using{' '}
            <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer"
              className="text-cyber-blue hover:text-white transition-colors">
              VirusTotal
            </a>.
          </p>
        </div>

        {!hasKey ? (
          <SetupGuide />
        ) : (
          <>
            <div className="flex items-start gap-3 p-4 rounded border border-cyber-amber/30 bg-cyber-amber/5 mb-8">
              <span className="text-lg shrink-0">⚠️</span>
              <p className="text-xs font-mono text-cyber-muted leading-relaxed">
                <span className="text-cyber-amber font-semibold">Heads up:</span> This tool only queries the VirusTotal database. It doesn't actually visit the site for you.
              </p>
            </div>

            <div className="cyber-card p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={targetUrl}
                  onChange={e => setTargetUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && startScan()}
                  placeholder="https://suspicious-site.com/..."
                  className="flex-1 bg-cyber-dark border border-cyber-border rounded px-4 py-2.5 text-sm font-mono text-cyber-text placeholder:text-cyber-muted/40 focus:outline-none focus:border-cyber-blue/60 transition-colors"
                />
                <button
                  onClick={() => startScan()}
                  disabled={!targetUrl.trim() || scanStatus === 'loading'}
                  className="cyber-btn cyber-btn-primary whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {scanStatus === 'loading' ? 'Scanning...' : 'Scan URL'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-cyber-muted/60">Try these:</span>
                {SUGGESTED_URLS.map(u => (
                  <button key={u} onClick={() => setTargetUrl(u)}
                    className="text-xs font-mono text-cyber-muted hover:text-cyber-blue transition-colors">
                    {u}
                  </button>
                ))}
              </div>

              {lastScannedUrl && scanStatus !== 'loading' && (
                <div className="mt-5 p-3 rounded bg-cyber-dark/70 border border-cyber-border/40">
                  <p className="text-xs font-mono text-cyber-muted break-all">
                    <span className="text-cyber-green/60">&gt; </span>Scanned:{' '}
                    <span className="text-cyber-text">{lastScannedUrl}</span>
                  </p>
                </div>
              )}
            </div>

            {scanStatus === 'loading' && (
              <div className="cyber-card p-8 text-center">
                <p className="text-sm font-mono text-cyber-muted">Asking the experts at VirusTotal...</p>
              </div>
            )}

            {scanStatus === 'error' && (
              <div className="cyber-card p-6 border-cyber-red/40 bg-cyber-red/5">
                <p className="text-sm font-mono text-cyber-red mb-2">❌ {errorMessage}</p>
                <button onClick={resetScanner} className="text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
                  × Try again
                </button>
              </div>
            )}

            {scanStatus === 'done' && result && (
              <div className="space-y-4">
                <ResultCard scanResult={result} />
                <button onClick={resetScanner} className="text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
                  ← Scan another URL
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-14 space-y-3">
          <p className="section-label">The Process</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Input URL', desc: 'Paste the full address you want to verify.' },
              { step: '02', title: 'Database Check', desc: 'We query VirusTotal, which checks 70+ security vendors.' },
              { step: '03', title: 'Instant Verdict', desc: 'You get a clear report on whether the link is safe or not.' },
            ].map(item => (
              <div key={item.step} className="cyber-card p-5">
                <p className="text-3xl font-mono font-black text-cyber-border mb-3">{item.step}</p>
                <h3 className="text-sm font-mono font-bold text-cyber-text mb-2">{item.title}</h3>
                <p className="text-xs font-mono text-cyber-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
