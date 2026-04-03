'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { generateSlug, sanitizeInput } from '@/lib/utils';

type UserType = 'designer' | 'influencer' | 'corporate';

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    user_type: 'designer' as UserType,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const name = sanitizeInput(form.name, 100);
    const company = form.company ? sanitizeInput(form.company, 100) : null;
    const slug = generateSlug(name);

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (authError) throw authError;
      if (!authData.user) throw new Error('Signup failed');

      // 2. Check slug uniqueness and generate alternative if needed
      let finalSlug = slug;
      const { data: existing } = await supabase
        .from('users')
        .select('slug')
        .eq('slug', slug)
        .single();
      if (existing) {
        finalSlug = `${slug}-${Date.now().toString(36).slice(-4)}`;
      }

      // 3. Create user record
      const { error: insertError } = await supabase.from('users').insert({
        id: authData.user.id,
        slug: finalSlug,
        name,
        company,
        email: form.email,
        user_type: form.user_type,
      });
      if (insertError) throw insertError;

      // 4. Redirect to showroom edit page
      router.push(`/showroom/${finalSlug}/edit`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-gold font-heading text-xl">
            EuroArt4.me
          </Link>
          <h1 className="font-heading text-3xl text-ink mt-4 mb-2">
            Create Your Showroom
          </h1>
          <p className="text-steel">
            One page. Permanent URL. Start curating in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-border p-8 space-y-5">
          {error && (
            <div className="bg-crimson/10 text-crimson text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

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
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-ink mb-1">
              Company / Studio
            </label>
            <input
              id="company"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
              placeholder="Smith Interiors (optional)"
            />
          </div>

          <div>
            <label htmlFor="user_type" className="block text-sm font-medium text-ink mb-1">
              I am a… *
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
              placeholder="jane@smithinteriors.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">
              Password *
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg text-ink focus:ring-2 focus:ring-blue focus:border-transparent outline-none"
              placeholder="Min. 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue text-white font-body font-medium rounded-lg hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating…' : 'Create Showroom'}
          </button>

          <div className="pt-2 border-t border-border">
            <Link
              href="/trade-signup"
              className="block text-center text-gold text-sm font-medium hover:underline"
            >
              Apply for Trade Account &rarr;
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
