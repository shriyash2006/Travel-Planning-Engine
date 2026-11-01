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
import Radar from '@/components/Radar';

const LOADING_STEPS = [
  '🤖 Querying Gemini 1.5 AI for personalized day-by-day roadmap...',
  '🌤️ Connecting to live OpenWeather climate & atmospheric telemetry...',
  '✈️ Pricing multi-carrier flight routes and direct schedule matrix...',
  '🏨 Filtering boutique stays and private villas within budget...',
  '🗺️ Synthesizing local navigation, walking routes and maps...',
  '✨ Assembling your bespoke NEXTRIP.ai experience roadmap...',
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
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-20">
      {/* Top NEXTRIP Sticky Red Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#EE4336] to-[#D32F2F] text-white border-b border-white/10 shadow-lg shadow-red-900/20">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link className="font-display text-4xl tracking-widest uppercase flex items-center gap-1 hover:scale-105 transition-transform" href="/">
              NEXTRIP<span className="text-white/90">.AI</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {step === 'results' ? (
              <button
                onClick={() => setStep('form')}
                className="bg-white text-[#121212] px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:bg-black hover:text-white transition-all hover:scale-105"
              >
                ← New Itinerary
              </button>
            ) : (
              <Link
                href="/"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all backdrop-blur-sm hover:scale-105"
              >
                ← Back to Home
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[1360px] mx-auto px-6 pt-12 pb-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-300 p-5 rounded-2xl mb-8 flex justify-between items-center text-sm shadow-xl animate-pulse">
            <span className="flex items-center gap-2"><span className="text-2xl">⚠️</span> {error}</span>
            <button onClick={() => setError(null)} className="text-red-300 font-bold hover:text-white transition-colors text-xl">
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
          <div className="space-y-8">
            {/* Header Status Bar */}
            <div className="bg-gradient-to-br from-[#1C1C1E] to-[#252528] border border-[#2A2A2E] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <h1 className="font-condensed text-5xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                    {preferences.origin} <span className="text-[#EE4336]">✈</span> {preferences.destination}
                  </h1>
                  <span className="bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    {preferences.travelStyle} Vibe
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-zinc-400 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  <span className="flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-lg border border-[#2A2A2E]">
                    <span className="text-lg">📅</span> {preferences.startDate} → {preferences.endDate}
                  </span>
                  <span className="flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-lg border border-[#2A2A2E]">
                    <span className="text-lg">👥</span> {preferences.travelers} Adult(s)
                  </span>
                  <span className="flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-lg border border-[#2A2A2E]">
                    <span className="text-lg">💰</span> {preferences.currency} {preferences.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Weather Quick Widget */}
              {weather && (
                <div className="w-full md:w-auto">
                  <WeatherWidget weather={weather} destination={preferences.destination} />
                </div>
              )}
            </div>

            {/* Navigation Tabs Bar */}
            <div className="bg-[#1C1C1E] border border-[#2A2A2E] rounded-2xl p-2 shadow-xl">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`flex-1 min-w-fit px-6 py-4 rounded-xl font-condensed text-base sm:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'itinerary'
                      ? 'bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white shadow-lg scale-105'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#252528]'
                  }`}
                >
                  <span className="text-xl">📅</span>
                  <span className="hidden sm:inline">Itinerary</span> ({itinerary.days.length}d)
                </button>

                <button
                  onClick={() => setActiveTab('budget')}
                  className={`flex-1 min-w-fit px-6 py-4 rounded-xl font-condensed text-base sm:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'budget'
                      ? 'bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white shadow-lg scale-105'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#252528]'
                  }`}
                >
                  <span className="text-xl">💰</span>
                  <span className="hidden sm:inline">Budget</span>
                </button>

                <button
                  onClick={() => setActiveTab('flights')}
                  className={`flex-1 min-w-fit px-6 py-4 rounded-xl font-condensed text-base sm:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'flights'
                      ? 'bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white shadow-lg scale-105'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#252528]'
                  }`}
                >
                  <span className="text-xl">✈️</span>
                  <span className="hidden sm:inline">Flights</span> ({flights.length})
                </button>

                <button
                  onClick={() => setActiveTab('hotels')}
                  className={`flex-1 min-w-fit px-6 py-4 rounded-xl font-condensed text-base sm:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'hotels'
                      ? 'bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white shadow-lg scale-105'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#252528]'
                  }`}
                >
                  <span className="text-xl">🏨</span>
                  <span className="hidden sm:inline">Hotels</span> ({hotels.length})
                </button>

                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex-1 min-w-fit px-6 py-4 rounded-xl font-condensed text-base sm:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'map'
                      ? 'bg-gradient-to-r from-[#EE4336] to-[#FF5C4D] text-white shadow-lg scale-105'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#252528]'
                  }`}
                >
                  <span className="text-xl">🗺️</span>
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>

            {/* Active Content Tab */}
            <div className="animate-fadeIn">
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

      {/* Full-Screen Loading Overlay with Radar Effect */}
      {loading && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-2xl">
            {/* Radar Component */}
            <div style={{ width: '100%', height: '400px', position: 'relative', marginBottom: '40px' }}>
              <Radar
                color="#EE4336"
                mode="pulse"
                speed={1.2}
                trail={0.35}
                scale={0.85}
                ringCount={6}
                spokeCount={12}
                targets={3}
                clutter={0}
                mouseInteraction
                ticks
                glow={1.5}
                tilt={0}
                centerX={0.5}
                centerY={0.5}
                brightness={1}
                gridOpacity={1}
                lineWidth={1}
                grain={0.03}
                fade={0}
                opacity={1}
                intro
                lightMode={false}
              />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-4">
              <span className="text-[#EE4336] text-xs font-black uppercase tracking-[0.25em] block">
                NEXTRIP SYNTHESIS ENGINE
              </span>
              <h3 className="font-condensed text-5xl uppercase tracking-wider text-white leading-tight">
                CRAFTING YOUR<br />BESPOKE VOYAGE
              </h3>
              <div className="min-h-16 flex items-center justify-center">
                <p className="text-base text-zinc-300 leading-relaxed px-4 animate-fadeIn">
                  {LOADING_STEPS[loadingTextIndex]}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>

              <div className="text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-700/50 bg-black/30 px-5 py-2 rounded-full backdrop-blur-sm inline-block mt-6">
                Parallel Multi-API Streams • ~8s
              </div>
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
