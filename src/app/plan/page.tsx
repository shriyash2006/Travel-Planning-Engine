'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TripPreferences,
  Itinerary,
  WeatherData,
  FlightOption,
  HotelOption,
} from '@/lib/types';
import TripForm from '@/components/TripForm';
import WeatherWidget from '@/components/WeatherWidget';
import ItineraryView from '@/components/ItineraryView';
import BudgetTracker from '@/components/BudgetTracker';
import FlightHotelCards from '@/components/FlightHotelCards';
import MapView from '@/components/MapView';

const LOADING_STEPS = [
  '🤖 Asking Gemini AI to craft custom day-by-day activities...',
  '🌤️ Fetching real-time weather forecasts and climate data...',
  '✈️ Scanning flight routes and price optimization matrix...',
  '🏨 Filtering top-rated stays matching your budget...',
  '🗺️ Calibrating local transportation and maps...',
  '✨ Assembling your dynamic travel experience engine...',
];

export default function PlanPage() {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [hotels, setHotels] = useState<HotelOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'itinerary' | 'budget' | 'flights' | 'hotels' | 'map'>('itinerary');

  // Cycle loading messages smoothly
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (prefs: TripPreferences) => {
    setLoading(true);
    setError(null);
    setPreferences(prefs);
    setLoadingTextIndex(0);

    try {
      // Execute all 4 external calls in parallel for optimal 5-10s response time
      const [itineraryRes, weatherRes, flightsRes, hotelsRes] = await Promise.all([
        fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prefs),
        }),
        fetch(`/api/weather?city=${encodeURIComponent(prefs.destination)}`),
        fetch(
          `/api/search?type=flights&origin=${encodeURIComponent(
            prefs.origin
          )}&destination=${encodeURIComponent(prefs.destination)}&budget=${
            prefs.budget
          }&currency=${encodeURIComponent(prefs.currency)}`
        ),
        fetch(
          `/api/search?type=hotels&destination=${encodeURIComponent(
            prefs.destination
          )}&budget=${prefs.budget}&currency=${encodeURIComponent(prefs.currency)}`
        ),
      ]);

      if (!itineraryRes.ok) {
        throw new Error('Failed to generate trip plan from AI');
      }

      const itineraryData = await itineraryRes.json();
      const weatherData = weatherRes.ok ? await weatherRes.json() : null;
      const flightsData = flightsRes.ok ? await flightsRes.json() : [];
      const hotelsData = hotelsRes.ok ? await hotelsRes.json() : [];

      setItinerary(itineraryData);
      setWeather(weatherData);
      setFlights(flightsData);
      setHotels(hotelsData);

      setStep('results');
    } catch (err: any) {
      console.error('Trip generation error:', err);
      setError(err?.message || 'Something went wrong while generating your trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: 80 }}>
      {/* Background Orbs */}
      <div
        className="glow-orb"
        style={{
          top: 0,
          right: '10%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-orb"
        style={{
          top: '40%',
          left: '5%',
          width: 550,
          height: 550,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Top Navbar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 36px',
          maxWidth: 1320,
          margin: '0 auto',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            🧭
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            Trip<span className="gradient-text">Craft</span>
          </span>
        </Link>

        {step === 'results' && (
          <button
            onClick={() => setStep('form')}
            className="btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            ← Modify Preferences
          </button>
        )}
      </header>

      {/* Main Workspace Content */}
      <main
        style={{
          maxWidth: 1240,
          margin: '36px auto 0',
          padding: '0 20px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {error && (
          <div
            className="glass"
            style={{
              padding: '16px 20px',
              border: '1px solid #f87171',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#fca5a5',
              borderRadius: 'var(--radius-md)',
              marginBottom: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>⚠️ {error}</span>
            <button
              onClick={() => setError(null)}
              style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <TripForm onSubmit={handleSubmit} loading={loading} />
        )}

        {/* STEP 2: RESULTS DASHBOARD */}
        {step === 'results' && itinerary && preferences && (
          <div>
            {/* Header Status Bar */}
            <div
              className="glass"
              style={{
                padding: '24px 28px',
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 20,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {preferences.origin} ✈️ {preferences.destination}
                  </h1>
                  <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>
                    {preferences.travelStyle} Vibe
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 4 }}>
                  📅 {preferences.startDate} to {preferences.endDate} · 👥 {preferences.travelers} Traveler(s) · 💰 Budget: {preferences.currency} {preferences.budget.toLocaleString()}
                </p>
              </div>

              {/* Weather Quick Widget */}
              {weather && (
                <WeatherWidget
                  weather={weather}
                  destination={preferences.destination}
                />
              )}
            </div>

            {/* Navigation Tab Bar */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 24,
                overflowX: 'auto',
                paddingBottom: 4,
              }}
            >
              <button
                className={`btn-secondary ${activeTab === 'itinerary' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}
                onClick={() => setActiveTab('itinerary')}
              >
                📅 Dynamic Itinerary
              </button>
              <button
                className={`btn-secondary ${activeTab === 'budget' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}
                onClick={() => setActiveTab('budget')}
              >
                💰 Budget Tracker
              </button>
              <button
                className={`btn-secondary ${activeTab === 'flights' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}
                onClick={() => setActiveTab('flights')}
              >
                ✈️ Flights ({flights.length})
              </button>
              <button
                className={`btn-secondary ${activeTab === 'hotels' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}
                onClick={() => setActiveTab('hotels')}
              >
                🏨 Stays & Resorts ({hotels.length})
              </button>
              <button
                className={`btn-secondary ${activeTab === 'map' ? 'btn-primary' : ''}`}
                style={{ borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}
                onClick={() => setActiveTab('map')}
              >
                🗺️ Dark Map Explorer
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'itinerary' && <ItineraryView itinerary={itinerary} />}
            {activeTab === 'budget' && (
              <BudgetTracker
                totalBudget={preferences.budget}
                currency={preferences.currency}
                tripDays={itinerary.duration}
              />
            )}
            {activeTab === 'flights' && (
              <FlightHotelCards type="flights" flights={flights} />
            )}
            {activeTab === 'hotels' && (
              <FlightHotelCards type="hotels" hotels={hotels} />
            )}
            {activeTab === 'map' && <MapView destination={preferences.destination} />}
          </div>
        )}
      </main>

      {/* Full-Screen Loading Overlay */}
      {loading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 11, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 24,
          }}
        >
          <div
            className="glass"
            style={{
              maxWidth: 480,
              width: '100%',
              padding: '40px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.25)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '4px solid rgba(56, 189, 248, 0.2)',
                borderTopColor: 'var(--accent-blue)',
                animation: 'spin 1s linear infinite',
              }}
            />

            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>
                Synthesizing Trip Experience
              </h3>
              <p
                style={{
                  color: 'var(--accent-blue)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {LOADING_STEPS[loadingTextIndex]}
              </p>
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '6px 14px',
                borderRadius: 9999,
              }}
            >
              Parallel APIs in progress • Estimated time ~8-12 seconds
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
