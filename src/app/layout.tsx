import type { Metadata } from 'next';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'NEXTRIP.AI — Smart Travel Planning with AI Precision',
  description: 'Plan trips dynamically with preferences, constraints, live weather, real-time budget forecasting, and instant bookings.',
  keywords: ['travel planner', 'nextrip', 'ai trip planner', 'gemini ai', 'smart travel', 'hackathon'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F6F5F2] text-[#191919] font-sans antialiased selection:bg-brand-red selection:text-white">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
