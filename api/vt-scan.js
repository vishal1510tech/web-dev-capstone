export default async function handler(req, res) {
  // Simple CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const apiKey = process.env.VT_KEY
  if (!apiKey) {
    console.error('VT_KEY is missing from environment variables')
    return res.status(500).json({ error: 'Server configuration error (missing API key).' })
  }

  const { resource } = req.query
  if (!resource) {
    return res.status(400).json({ error: 'No resource provided for scanning.' })
  }

  try {
    // Build the VirusTotal v2 API URL
    const vtUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=${apiKey}&resource=${encodeURIComponent(resource)}`
    
    const vtResponse = await fetch(vtUrl)

    // Handle rate limits (VirusTotal returns 204 when you hit the limit on the free tier)
    if (vtResponse.status === 204) {
      return res.status(429).json({ error: 'VirusTotal rate limit reached. Please wait a minute.' })
    }

    if (!vtResponse.ok) {
      throw new Error(`VirusTotal responded with ${vtResponse.status}`)
    }

    const data = await vtResponse.json()

    // Cache the result for 5 minutes to save on API calls
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    
    return res.status(200).json(data)
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(502).json({ error: 'Failed to communicate with the scanning service.' })
  }
}
