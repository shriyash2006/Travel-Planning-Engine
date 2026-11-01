import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      {/* Dynamic Background Glowing Orbs */}
      <div
        className="glow-orb"
        style={{
          top: '-10%',
          left: '20%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-orb"
        style={{
          top: '30%',
          right: '-5%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          animationDelay: '-4s',
        }}
      />

      {/* Navigation Bar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
            }}
          >
            🧭
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Trip<span className="gradient-text">Craft</span>
            </span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Travel Experience Engine
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/plan" className="btn-primary">
            Plan a Trip Now →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          maxWidth: 1080,
          margin: '40px auto 60px',
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="badge badge-purple" style={{ marginBottom: 20, padding: '6px 18px', fontSize: '0.85rem' }}>
          🚀 Built for Next-Gen Explorers & Adventurers
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Plan Trips <span className="gradient-text">Dynamically</span> with AI, Real-Time Budgets & Constraints
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: 720,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          No more cookie-cutter itineraries. TripCraft factors in your real-time budget, travel vibe, live weather forecasts, transport routes, and dietary needs in seconds.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/plan" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
            ✨ Start Planning Your Trip →
          </Link>
          <a href="#features" className="btn-secondary" style={{ padding: '16px 28px', fontSize: '1rem' }}>
            Explore Engine Architecture ↓
          </a>
        </div>
      </section>

      {/* Stats Row */}
      <section
        style={{
          maxWidth: 1080,
          margin: '0 auto 80px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="glass" style={{ padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'Outfit' }}>
            &lt; 15s
          </div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>Full Multi-Day Synthesis</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Gemini 1.5 parallel generation for complete day-by-day activities
          </p>
        </div>

        <div className="glass" style={{ padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'Outfit' }}>
            100%
          </div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>Dynamic Budget Matching</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Breakdown across stays, food, transit & activities with expense logs
          </p>
        </div>

        <div className="glass" style={{ padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'Outfit' }}>
            Live
          </div>
          <div style={{ fontWeight: 600, marginTop: 4 }}>Weather & Flight Matrix</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            OpenWeather temperature forecasts and flight price comparisons
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section
        id="features"
        style={{
          maxWidth: 1180,
          margin: '0 auto 100px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="badge badge-blue">Feature Showcase</div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 700, marginTop: 10 }}>
            Powered by an Intelligent Travel Pipeline
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '8px auto 0' }}>
            Engineered to handle every constraint — from tight student budgets to luxury retreats.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>🤖</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Context-Aware AI Generation
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Considers your travel vibe (adventure, relaxed, cultural, backpacker, luxury), specific dietary limitations, and preferred pacing.
            </p>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>🌤️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Real-Time Weather Integration
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Fetches current temperatures and 5-day forecasts so you pack the right gear and schedule outdoor hikes during optimal windows.
            </p>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>💰</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Live Expense & Budget Tracker
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Interactive budget engine with category limits, real-time recalculations, localStorage persistence, and alerts when exceeding targets.
            </p>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>✈️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Smart Flight Comparison
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Sorts airfare by price, tags direct non-stop routes, highlights Best Value flights, and simulates one-click seat reservations.
            </p>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>🏨</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Curated Accommodations
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Verified stays ranging from nomad backpacker pods to 5-star luxury resorts with amenity tags and transparent night rates.
            </p>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>🗺️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>
              Interactive Dark Map Explorer
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Geospatial orientation of your destination with night-mode styling, satellite views, and local street exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '40px 24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
        }}
      >
        <p>Built with ❤️ for ML Bhopal Hackathon • TripCraft Travel Planning & Experience Engine</p>
      </footer>
    </main>
  );
}
