'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  '🤖 Querying Gemini 1.5 AI for personalized day-by-day roadmap...',
  '🌤️ Connecting to live OpenWeather climate & atmospheric telemetry...',
  '✈️ Pricing multi-carrier flight routes and direct schedule matrix...',
  '🏨 Filtering boutique stays and private villas within budget...',
  '🗺️ Synthesizing local navigation, walking routes and maps...',
  '✨ Assembling your bespoke Wayfare.ai experience roadmap...',
];

function PlanPageContent() {
  const searchParams = useSearchParams();
  const urlDest = searchParams.get('destination') || '';
  const urlBudget = searchParams.get('budget') ? Number(searchParams.get('budget')) : undefined;

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
      // Parallel execution for lightning speed
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
    <div className="bg-[#121212] text-white min-h-screen pb-20">
      {/* Top Wayfare Sticky Red Navbar */}
      <nav className="sticky top-0 z-50 bg-[#EE4336] text-white border-b border-red-400/30">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link className="font-display text-3xl tracking-widest uppercase flex items-center gap-1" href="/">
              WAYFARE<span className="text-white/80">.AI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {step === 'results' ? (
              <button
                onClick={() => setStep('form')}
                className="bg-white text-brand-dark px-5 py-2 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-black hover:text-white transition"
              >
                ← New Itinerary
              </button>
            ) : (
              <Link
                href="/"
                className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded transition"
              >
                ← Back to Home
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[1360px] mx-auto px-6 pt-10">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8 flex justify-between items-center text-sm">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="text-red-400 font-bold hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <TripForm
            onSubmit={handleSubmit}
            loading={loading}
            initialDestination={urlDest}
            initialBudget={urlBudget}
          />
        )}

        {/* STEP 2: RESULTS DASHBOARD */}
        {step === 'results' && itinerary && preferences && (
          <div>
            {/* Header Status Bar */}
            <div className="bg-[#1C1C1E] border border-[#2A2A2E] rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-condensed text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none">
                    {preferences.origin} ✈️ {preferences.destination}
                  </h1>
                  <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {preferences.travelStyle} Vibe
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm font-medium tracking-wide uppercase mt-2">
                  📅 {preferences.startDate} to {preferences.endDate} • 👥 {preferences.travelers} Adult(s) • 💰 Budget: {preferences.currency} {preferences.budget.toLocaleString()}
                </p>
              </div>

              {/* Weather Quick Widget */}
              {weather && (
                <div className="w-full md:w-auto">
                  <WeatherWidget weather={weather} destination={preferences.destination} />
                </div>
              )}
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-[#2A2A2E]">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-6 py-3 rounded-t-lg font-condensed text-lg tracking-wider uppercase transition flex items-center gap-2 ${
                  activeTab === 'itinerary'
                    ? 'bg-brand-red text-white'
                    : 'bg-[#1C1C1E] text-zinc-400 hover:text-white hover:bg-[#252528]'
                }`}
              >
                📅 Dynamic Itinerary ({itinerary.days.length} Days)
              </button>

              <button
                onClick={() => setActiveTab('budget')}
                className={`px-6 py-3 rounded-t-lg font-condensed text-lg tracking-wider uppercase transition flex items-center gap-2 ${
                  activeTab === 'budget'
                    ? 'bg-brand-red text-white'
                    : 'bg-[#1C1C1E] text-zinc-400 hover:text-white hover:bg-[#252528]'
                }`}
              >
                💰 Predictive Budget &amp; Expenses
              </button>

              <button
                onClick={() => setActiveTab('flights')}
                className={`px-6 py-3 rounded-t-lg font-condensed text-lg tracking-wider uppercase transition flex items-center gap-2 ${
                  activeTab === 'flights'
                    ? 'bg-brand-red text-white'
                    : 'bg-[#1C1C1E] text-zinc-400 hover:text-white hover:bg-[#252528]'
                }`}
              >
                ✈️ Live Flights ({flights.length})
              </button>

              <button
                onClick={() => setActiveTab('hotels')}
                className={`px-6 py-3 rounded-t-lg font-condensed text-lg tracking-wider uppercase transition flex items-center gap-2 ${
                  activeTab === 'hotels'
                    ? 'bg-brand-red text-white'
                    : 'bg-[#1C1C1E] text-zinc-400 hover:text-white hover:bg-[#252528]'
                }`}
              >
                🏨 Curated Stays ({hotels.length})
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className={`px-6 py-3 rounded-t-lg font-condensed text-lg tracking-wider uppercase transition flex items-center gap-2 ${
                  activeTab === 'map'
                    ? 'bg-brand-red text-white'
                    : 'bg-[#1C1C1E] text-zinc-400 hover:text-white hover:bg-[#252528]'
                }`}
              >
                🗺️ Geospatial Map Explorer
              </button>
            </div>

            {/* Active Content Tab */}
            <div>
              {activeTab === 'itinerary' && <ItineraryView itinerary={itinerary} />}
              {activeTab === 'budget' && (
                <BudgetTracker
                  totalBudget={preferences.budget}
                  currency={preferences.currency}
                  tripDays={itinerary.duration}
                />
              )}
              {activeTab === 'flights' && <FlightHotelCards type="flights" flights={flights} />}
              {activeTab === 'hotels' && <FlightHotelCards type="hotels" hotels={hotels} />}
              {activeTab === 'map' && <MapView destination={preferences.destination} />}
            </div>
          </div>
        )}
      </main>

      {/* Full-Screen Loading Overlay with Wayfare Aesthetics */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-[#1C1C1E] border border-[#2A2A2E] rounded-2xl p-10 max-w-md w-full text-center shadow-2xl flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-zinc-700 border-t-brand-red animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-red">
                AI
              </div>
            </div>

            <div>
              <span className="text-brand-red text-[11px] font-black uppercase tracking-[0.2em] block mb-1">
                WAYFARE SYNTHESIS ENGINE
              </span>
              <h3 className="font-condensed text-3xl uppercase tracking-wider text-white">
                CRAFTING YOUR BESPOKE VOYAGE
              </h3>
              <p className="text-xs text-zinc-400 mt-2 min-h-12 flex items-center justify-center">
                {LOADING_STEPS[loadingTextIndex]}
              </p>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-800 px-4 py-1.5 rounded-full">
              Parallel Multi-API Streams • ~8s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="bg-[#121212] min-h-screen" />}>
      <PlanPageContent />
    </Suspense>
  );
}
