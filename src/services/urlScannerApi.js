
const DEV_KEY = import.meta.env.VITE_VT_KEY || ''

export function hasApiKey() {
  // Production uses the serverless function which has the key securely stored
  if (import.meta.env.PROD) return true
  
  // In development, we need the key in our local environment
  return DEV_KEY.length > 0
}

export async function scanUrl(urlToScan) {
  const target = urlToScan.trim()
  if (!target) throw new Error('You need to provide a URL to scan.')

  // We hit our internal /api/vt-scan endpoint (which is proxied or a serverless function)
  const params = new URLSearchParams({ resource: target })
  const response = await fetch(`/api/vt-scan?${params}`)

  if (!response.ok) {
    if (response.status === 403) throw new Error('API key issues. Check your configuration.')
    if (response.status === 429) throw new Error("Slow down! We've hit the rate limit (4 requests per minute).")
    throw new Error(`The scan failed with status: ${response.status}`)
  }

  return await response.json()
}

/**
 * We normalize the messy VirusTotal v2 response into something
 * our frontend can actually use easily.
 */
export function parseVtResult(data) {
  if (!data) return null

  // response_code 0 means it's not in the VirusTotal database yet
  if (data.response_code === 0) {
    return {
      found: false,
      safe: true,
      status: 'Unknown / Not Scanned',
      description: "This URL hasn't been scanned before. Be extra careful as it might be new.",
      positives: 0,
      total: 0,
      engines: [],
      scanDate: null,
      vtLink: null,
    }
  }

  // response_code -2 means it's currently being scanned
  if (data.response_code === -2) {
    return {
      found: true,
      safe: null,
      status: 'Scan in Progress',
      description: 'VirusTotal is currently scanning this link. Refresh in a few seconds.',
      positives: 0,
      total: 0,
      engines: [],
      scanDate: null,
      vtLink: data.permalink,
    }
  }

  const positives = data.positives || 0
  const total = data.total || 0

  // Grab the first few engines that flagged it to show the user
  const flaggedBy = data.scans
    ? Object.entries(data.scans)
        .filter(([, details]) => details.detected)
        .map(([engine, details]) => ({ engine, result: details.result }))
        .slice(0, 10)
    : []

  // Simple logic for safety levels
  const isSafe = positives === 0
  const isSuspect = positives > 0 && positives < 4
  const isMalicious = positives >= 4

  return {
    found: true,
    safe: isSafe,
    suspect: isSuspect,
    malicious: isMalicious,
    status: isMalicious ? `DANGER: ${positives} Threats Found` :
            isSuspect ? `Suspicious: ${positives} Warnings` :
            `Clean: 0 Threats Found`,
    description: isMalicious ? `Serious threat! ${positives} engines identified this as malicious.` :
                 isSuspect ? `Caution advised. ${positives} engines flagged this URL.` :
                 `Good news! None of the ${total} engines flagged this URL.`,
    positives,
    total,
    engines: flaggedBy,
    scanDate: data.scan_date,
    vtLink: data.permalink,
  }
}
