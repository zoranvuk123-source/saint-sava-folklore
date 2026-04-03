import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-ink text-white px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 to-ink" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-gold font-heading text-lg tracking-widest uppercase mb-4">
            EuroArt4.me
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Designer<br />Showroom
          </h1>
          <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-10">
            Curate and share European fine art collections. AI-powered room
            curation for interior designers, influencers, and corporate buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue text-white font-body font-medium rounded-lg hover:bg-blue/90 transition-colors"
            >
              Create Your Showroom
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-8 py-3 border border-steel/30 text-white font-body font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-6 bg-bg">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-ink text-center mb-16">
            Your Art, Your Brand, Your Sales Channel
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ice flex items-center justify-center">
                <svg className="w-6 h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="font-heading text-xl mb-3">Curate Collections</h3>
              <p className="text-steel">
                Build themed art collections by space type. Hotel lobbies,
                restaurants, residences — each with AI-assisted curation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ice flex items-center justify-center">
                <svg className="w-6 h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </div>
              <h3 className="font-heading text-xl mb-3">Share Everywhere</h3>
              <p className="text-steel">
                Branded share cards for Pinterest, X, and Instagram. Every share
                is an organic impression with a tracked conversion path.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ice flex items-center justify-center">
                <svg className="w-6 h-6 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-heading text-xl mb-3">Earn Commission</h3>
              <p className="text-steel">
                Every order placed through your showroom earns commission.
                Trade accounts unlock 20% margins and unlimited AI credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-ink text-white text-center">
        <h2 className="font-heading text-3xl md:text-4xl mb-6">
          Ready to Open Your Showroom?
        </h2>
        <p className="text-steel max-w-lg mx-auto mb-8">
          Set up your permanent page in under a minute. Start curating with AI
          and share your first collection today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/setup"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-ink font-body font-semibold rounded-lg hover:bg-gold/90 transition-colors"
          >
            Get Started — Free
          </Link>
          <Link
            href="/trade-signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-gold/40 text-gold font-body font-medium rounded-lg hover:bg-gold/10 transition-colors"
          >
            Apply for Trade Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-bg border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gold font-heading text-lg">EuroArt4.me</p>
          <p className="text-steel text-sm">
            &copy; {new Date().getFullYear()} EuroArt4 / PreApproved Capital. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
