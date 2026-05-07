/**
 * VirusTotal v2 URL Report API — free, 500 requests/day.
 *
 * In DEV:  /api/vt-scan → Vite proxy → VirusTotal (key injected by vite.config.js)
 * In PROD: /api/vt-scan → Vercel serverless function (api/vt-scan.js, key in VT_KEY env var)
 *
 * The API key is NEVER in the browser bundle in production.
 */

// Used only in dev to show the setup guide when VITE_VT_KEY is missing
const DEV_KEY = import.meta.env.VITE_VT_KEY || ''

export function hasApiKey() {
  // In production the serverless function owns the key — always ready
  if (import.meta.env.PROD) return true
  return DEV_KEY.length > 0
}

export async function scanUrl(rawUrl) {
  const url = rawUrl.trim()
  if (!url) throw new Error('Please enter a URL to scan.')

  const params = new URLSearchParams({ resource: url })
  const response = await fetch(`/api/vt-scan?${params}`)

  if (!response.ok) {
    if (response.status === 403) throw new Error('Invalid API key. Check your VT_KEY environment variable.')
    if (response.status === 429) throw new Error('Rate limit reached (4 req/min on free tier). Wait a moment and try again.')
    throw new Error(`Scan failed: server responded with ${response.status}`)
  }

  return await response.json()
}

/**
 * Normalises a VirusTotal v2 URL report response.
 * response_code: 1 = found, 0 = not in database, -2 = still scanning
 */
export function parseVtResult(data) {
  if (!data) return null

  if (data.response_code === 0) {
    return {
      found: false,
      safe: true,
      status: 'Not in Database',
      description: 'This URL has not been scanned by VirusTotal before. It may be brand-new or very obscure — exercise caution.',
      positives: 0,
      total: 0,
      engines: [],
      scanDate: null,
      vtLink: null,
    }
  }

  if (data.response_code === -2) {
    return {
      found: true,
      safe: null,
      status: 'Scan Queued',
      description: 'VirusTotal has this URL queued for scanning. Try again in a few seconds.',
      positives: 0,
      total: 0,
      engines: [],
      scanDate: null,
      vtLink: data.permalink,
    }
  }

  const positives = data.positives || 0
  const total     = data.total     || 0

  const engines = data.scans
    ? Object.entries(data.scans)
        .filter(([, v]) => v.detected)
        .map(([engine, v]) => ({ engine, result: v.result }))
        .slice(0, 8)
    : []

  const isSafe      = positives === 0
  const isSuspect   = positives > 0 && positives < 4
  const isMalicious = positives >= 4

  return {
    found: true,
    safe: isSafe,
    suspect: isSuspect,
    malicious: isMalicious,
    status:
      isMalicious ? `Malicious — ${positives}/${total} engines flagged` :
      isSuspect   ? `Suspicious — ${positives}/${total} engines flagged` :
                    `Clean — 0/${total} engines flagged`,
    description:
      isMalicious ? `${positives} out of ${total} security engines identified this URL as malicious.` :
      isSuspect   ? `${positives} out of ${total} engines flagged this URL. Treat with caution.` :
                    `No security engine flagged this URL across ${total} scanners.`,
    positives,
    total,
    engines,
    scanDate: data.scan_date,
    vtLink: data.permalink,
  }
}
