import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TripCraft — AI Travel Planning & Experience Engine',
  description: 'Plan trips dynamically with preferences, constraints, live weather, real-time budget tracking, and instant bookings.',
  keywords: ['travel planner', 'ai trip planner', 'gemini ai', 'dynamic itinerary', 'hackathon'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
