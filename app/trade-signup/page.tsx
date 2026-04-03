'use client';

import { useState } from 'react';
import Link from 'next/link';

type UserType = 'designer' | 'influencer' | 'corporate';

export default function TradeSignupPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    user_type: 'designer' as UserType,
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/trade-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-gold font-heading text-xl mb-4">EuroArt4.me</p>
          <h1 className="font-heading text-3xl text-ink mb-4">
            Application Received
          </h1>
          <p className="text-steel mb-8">
            Thank you for applying for a Trade Account. Our team will review
            your application and get back to you within 48 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-gold font-heading text-xl">
            EuroArt4.me
          </Link>
          <h1 className="font-heading text-3xl text-ink mt-4 mb-2">
            Apply for Trade Account
          </h1>
          <p className="text-steel">
            Unlock unlimited AI credits, trade pricing, analytics, and
            white-label options.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-border p-8 space-y-5"
        >
          {error && (
            <div className="bg-crimson/10 text-crimson text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Benefits */}
          <div className="bg-ice/50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-medium text-ink">Trade Account Benefits:</p>
            <ul className="text-steel space-y-1 list-disc list-inside">
              <li>Unlimited AI room curations</li>
              <li>20% trade discount on all orders</li>
              <li>PDF framing spec export</li>
              <li>Analytics dashboard (views, shares, conversions)</li>
              <li>Client inquiry form on your showroom</li>
              <li>Custom slug & co-branded share cards</li>
            </ul>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-ink mb-1">
              Company / Studio *
            </label>
            <input
              id="company"
              type="text"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="user_type" className="block text-sm font-medium text-ink mb-1">
              Account Type *
            </label>
            <select
              id="user_type"
              required
              value={form.user_type}
              onChange={(e) => setForm({ ...form, user_type: e.target.value as UserType })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
            >
              <option value="designer">Interior Designer</option>
              <option value="influencer">Influencer / Content Creator</option>
              <option value="corporate">Corporate Buyer</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">
              Tell us about your business
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink text-sm resize-none h-20 focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
              maxLength={1000}
              placeholder="Projects, clients, volume expectations…"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold text-ink font-body font-semibold rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </main>
  );
}
