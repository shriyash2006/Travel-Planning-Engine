import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="font-condensed text-9xl text-[#EE4336] mb-4">404</h1>
          <h2 className="font-condensed text-4xl uppercase tracking-wider mb-4">
            Destination Not Found
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Looks like this route doesn't exist in our itinerary. Let's get you back on track!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
          >
            ← Back to Home
          </Link>
          <Link
            href="/plan"
            className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
          >
            Plan a Trip →
          </Link>
        </div>

        <div className="mt-12 pt-12 border-t border-white/10">
          <p className="text-zinc-500 text-sm uppercase tracking-widest">
            NEXTRIP.AI — Smart Travel Planning
          </p>
        </div>
      </div>
    </div>
  );
}
