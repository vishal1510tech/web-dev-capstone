function Home() {
  return (
    <div className="pt-24">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Stay Ahead of Cyber Threats
        </h1>

        <p className="text-cyber-muted max-w-xl mb-8">
          Learn how modern cyber attacks work and how to protect yourself with
          simple, practical habits. No jargon. Just useful knowledge.
        </p>

        <div className="flex gap-4">
          <a
            href="/threats"
            className="px-6 py-3 bg-cyber-primary text-white rounded-md text-sm hover:opacity-90 transition"
          >
            Explore Threats
          </a>

          <a
            href="/resources"
            className="px-6 py-3 border border-cyber-border rounded-md text-sm hover:border-cyber-primary hover:text-cyber-primary transition"
          >
            View Resources
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h2 className="text-xl font-semibold text-cyber-primary">3.5B+</h2>
            <p className="text-xs text-cyber-muted">Phishing emails daily</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyber-primary">4,000+</h2>
            <p className="text-xs text-cyber-muted">Attacks per day</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyber-primary">$4.45M</h2>
            <p className="text-xs text-cyber-muted">Avg breach cost</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyber-primary">82%</h2>
            <p className="text-xs text-cyber-muted">Human-related breaches</p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10">
          How to Stay Secure
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="cyber-card p-6">
            <h3 className="font-semibold mb-2">Learn the Threats</h3>
            <p className="text-sm text-cyber-muted mb-4">
              Understand common attack methods like phishing and malware.
            </p>
            <a href="/threats" className="text-sm text-cyber-primary">
              Explore →
            </a>
          </div>

          <div className="cyber-card p-6">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-cyber-muted mb-4">
              Keep yourself aware of evolving cyber risks.
            </p>
          </div>

          <div className="cyber-card p-6">
            <h3 className="font-semibold mb-2">Use Best Practices</h3>
            <p className="text-sm text-cyber-muted mb-4">
              Strong passwords, 2FA, and safe browsing habits go a long way.
            </p>
          </div>
        </div>
      </section>

      {/* THREATS PREVIEW */}
      <section className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Common Threats</h2>
            <a href="/threats" className="text-sm text-cyber-primary">
              View all →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="cyber-card p-6">
              <h3 className="font-semibold mb-2">Phishing</h3>
              <p className="text-sm text-cyber-muted">
                Fake emails or messages designed to steal your data.
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="font-semibold mb-2">Ransomware</h3>
              <p className="text-sm text-cyber-muted">
                Malware that locks your files and demands payment.
              </p>
            </div>

            <div className="cyber-card p-6">
              <h3 className="font-semibold mb-2">Man-in-the-Middle</h3>
              <p className="text-sm text-cyber-muted">
                Attackers intercept communication between two parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-cyber-border">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-cyber-muted">
          <p>CyberShield — Educational project using React + Tailwind.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;