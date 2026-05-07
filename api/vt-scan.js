/**
 * Vercel Serverless Function — proxies VirusTotal URL report requests.
 * The API key lives server-side in VT_KEY env var and is never exposed to the browser.
 */
export default async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const apiKey = process.env.VT_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'VT_KEY not configured on this server.' })
  }

  const resource = req.query.resource
  if (!resource) {
    return res.status(400).json({ error: 'resource query param required.' })
  }

  try {
    const vtUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=${apiKey}&resource=${encodeURIComponent(resource)}`
    const vtRes = await fetch(vtUrl)

    // 204 = rate-limited (free tier: 4 req/min)
    if (vtRes.status === 204) {
      return res.status(429).json({ error: 'Rate limit reached. Wait a moment and try again.' })
    }

    const data = await vtRes.json()
    // Cache results for 5 minutes on Vercel edge
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach VirusTotal API.' })
  }
}
