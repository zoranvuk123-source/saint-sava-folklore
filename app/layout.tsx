import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EuroArt4.me — Designer Showroom',
  description:
    'Curate and share European fine art collections. AI-powered room curation for interior designers, influencers, and corporate buyers.',
  metadataBase: new URL('https://euroart4.me'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
