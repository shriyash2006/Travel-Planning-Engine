'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NextripHomePage() {
  const router = useRouter();

  // Search Widget State
  const [destination, setDestination] = useState('Bali, Indonesia');
  const [departure, setDeparture] = useState('Nov 18, 2026');
  const [returnDate, setReturnDate] = useState('Nov 25, 2026');
  const [travelers, setTravelers] = useState('02 Adults, 1 Room');

  // Interactive Pricing Calculator State
  const [calcTravelers, setCalcTravelers] = useState(2);
  const [cabinClass, setCabinClass] = useState<'economy' | 'premium' | 'business'>('economy');
  const [selectedStay, setSelectedStay] = useState<'jungle' | 'cliffside' | 'beach'>('jungle');
  const [includedExperiences, setIncludedExperiences] = useState([
    'Surf lesson at Uluwatu',
    'Temple & rice-terrace tour',
    'Mount Batur sunrise trek',
    'Balinese spa & wellness',
  ]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic calculation for the pricing engine
  const baseFlight = cabinClass === 'economy' ? 775 : cabinClass === 'premium' ? 1250 : 2100;
  const stayPerNight = selectedStay === 'jungle' ? 130 : selectedStay === 'cliffside' ? 210 : 240;
  const nights = 8;
  const totalFlights = baseFlight * calcTravelers;
  const totalStays = stayPerNight * nights;
  const foodTotal = 256 * calcTravelers;
  const experiencesTotal = 129.5 * calcTravelers * (includedExperiences.length / 4);
  const calculatedGrandTotal = Math.round(totalFlights + totalStays + foodTotal + experiencesTotal);
  const perTraveler = Math.round(calculatedGrandTotal / calcTravelers);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDest = destination.split(',')[0].trim();
    router.push(`/plan?destination=${encodeURIComponent(cleanDest)}`);
  };

  const handleExploreDestination = (destName: string) => {
    router.push(`/plan?destination=${encodeURIComponent(destName)}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#F6F5F2] text-[#191919] font-sans antialiased selection:bg-brand-red selection:text-white min-h-screen">
      {/* BEGIN: NavigationBar */}
      <nav className="sticky top-0 z-50 bg-[#EE4336] text-white border-b border-red-400/30 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center space-x-6">
            <button
              aria-label="Toggle menu"
              className="p-2 -ml-2 rounded-lg hover:bg-black/10 focus:outline-none transition"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
            <Link className="font-display text-3xl tracking-widest uppercase flex items-center gap-1" href="/">
              NEXTRIP<span className="text-white/80">.AI</span>
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
            <a className="hover:text-black/80 transition-colors" href="#destinations">
              Destinations
            </a>
            <a className="hover:text-black/80 transition-colors" href="#itinerary-builder">
              AI Itinerary
            </a>
            <a className="hover:text-black/80 transition-colors" href="#pricing-engine">
              Live Pricing
            </a>
            <a className="hover:text-black/80 transition-colors" href="#toolkit">
              Toolkit
            </a>
            <a className="hover:text-black/80 transition-colors" href="#plans">
              Pricing
            </a>
          </div>

          {/* Right: Action CTA */}
          <div className="flex items-center space-x-4">
            <Link
              href="/plan"
              className="bg-white text-brand-dark px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm hover:bg-black hover:text-white transition duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      {/* END: NavigationBar */}

      {/* BEGIN: HeroSection */}
      <header className="relative bg-brand-red text-white overflow-hidden pt-8 pb-20">
        {/* Huge Watermark Typography */}
        <div className="absolute inset-x-0 top-2 pointer-events-none select-none text-center">
          <span className="font-display text-[15vw] leading-none tracking-tight text-white/[0.08] block uppercase">
            TIMELESS TRAVEL
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Top Subtitle */}
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-white/90">
              AI PRECISION • HUMAN ELEGANCE • UNRIVALED VOYAGES
            </p>
          </div>

          {/* Main Grid: Left Search Panel / Center Hero Image / Right Floating Vignettes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Left: Tour & Package Search Widget */}
            <div className="lg:col-span-4 z-20">
              <div className="bg-white/10 backdrop-blur-md border border-white/25 p-7 rounded-xl shadow-2xl text-white">
                <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                  <span className="font-display text-xl tracking-wider uppercase">TOUR &amp; PACKAGE</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-white text-brand-red uppercase">
                    Live AI Rates
                  </span>
                </div>

                <form className="space-y-4" onSubmit={handleHeroSearch}>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-white/80 mb-1">
                      WHERE TO
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2 text-sm text-white placeholder-white/60 focus:bg-white/25 focus:ring-0 focus:border-white transition"
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Bali, Kyoto, Goa"
                        required
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-white/70">▾</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider uppercase text-white/80 mb-1">
                        DEPARTURE
                      </label>
                      <input
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2 text-xs text-white focus:bg-white/25 focus:ring-0 focus:border-white"
                        type="text"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-wider uppercase text-white/80 mb-1">
                        RETURN DATE
                      </label>
                      <input
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2 text-xs text-white focus:bg-white/25 focus:ring-0 focus:border-white"
                        type="text"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-white/80 mb-1">
                      TRAVELER
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-white/15 border border-white/30 rounded px-3 py-2 text-xs text-white focus:bg-white/25 focus:ring-0 focus:border-white"
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-white/70">▾</span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-4 bg-brand-dark hover:bg-black text-white font-bold py-3.5 px-4 rounded text-xs uppercase tracking-widest flex items-center justify-center gap-2 group transition"
                    type="submit"
                  >
                    <span>EXPLORE NOW</span>
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">
                      ↗
                    </span>
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/75">
                  <span>
                    Avg savings: <strong>$412 / trip</strong>
                  </span>
                  <span>Zero booking fees</span>
                </div>
              </div>
            </div>

            {/* Center: Hero Traveler Image & Collage Elements */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative max-w-sm sm:max-w-md w-full">
                {/* Traveler Main Cutout Image - High Quality 2400x3200px */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Happy traveler with backpack exploring tropical destination"
                  className="relative z-10 w-full h-[520px] object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=95&w=2400&h=3200&fit=crop&auto=format"
                />

                {/* Floating Social Proof Badge */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-white text-brand-dark p-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-100">
                  <div className="flex -space-x-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtFTNyu1A25jzNE5FKw0f7a4i38Gw9P1OuovAv26zL9EDbEl2B8xJ6_isbj-OdLP9KrcVZ9RLPYG4EToPrMXJjUnbPv0gR_G056TkxHNf1mWAsyX3s29kN3BHkViNPW4XXPbSvsXU6nQ_zCzLXIr5HOarH9hvwCE-HoZT5CQ-tMQ3gcZeLXyqZ4snTOUI5rpyE-WFG598YUDc3imUvBeY9RkvrckaO1olsHfUq4EY"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvt_gjSYWMdjKV5-LBemkag9_qNEeJpNNyeQcJs7Fc6nxdHC3cGbGuTvMGnljk5NFTBWHeXxrgV6rjfKRIMUmkp2e8cDDnqSKj4ucucSroaJNXA15yGQUUGjrkApHLbHrsZFaiknFBfeJKOukGmVNWi60_wh-sNQjtncAV6NTq2XANnijunWZsAtCDUhpV05tFdL1vr6SSeLRIULWSYPdlfH8kecIg7vVuKX1Lhk8"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Avatar"
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwupB25A8Gh5qsDGxPdr31u-rx6O_YcDqOiMLV-2X4bRLggJGYxCnEtyyQA19KNXlz94XHMskwqsPZ9iQU59JOcd3h3gV6FBIJpA6ouXl66bXjGnllK-iFwz5RPoi1ylRc11LhgIdtR31QTlDlLeP0e4XLTbrZoJkh8e1Zu1OaCBouNfhOYqjz07JVpytoLN2s0a-jJ73-e8c-rVsr--VUCD6njpVlBC-XlpvWLfY"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-black leading-none">50K+</p>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Happy Voyagers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating Postcard / Vignette Gallery */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
              <div
                onClick={() => handleExploreDestination('Maldives')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transform rotate-2 hover:rotate-0 transition duration-300 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Tropical Beach Destination"
                  className="w-full h-36 object-cover rounded-lg mb-2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo05V9mO3iCiVFlhU-YItUIMOSborj5r6t0R5LXG_QVo-5PrnG2F6Rdhz0DO6QhkrozY0J3VZ7ly5zF7B1Psx2GnKmXCZ6Oi_ItJL2d2-4NPCNAnQIiukVom5yGeUqhdMDg2k4erdqH5rBVecLL6Gd21WWSdOTlow2BseIs40MGqwlXbFgXZlVDiBuz2y8wh3H4RZNh46M6mExvDOPm8BuIAk4LGESPu3MO2Cpqcw"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider uppercase">MALDIVES ATOLLS</span>
                  <span className="text-white/80 font-mono">$1,420 avg</span>
                </div>
              </div>

              <div
                onClick={() => handleExploreDestination('Kyoto')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 transform -rotate-1 hover:rotate-0 transition duration-300 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Kyoto Japan Pagoda"
                  className="w-full h-36 object-cover rounded-lg mb-2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Jw-37TmsjfY23-Q3sq2zcTFwxtUSPyVN-NcIDngBnLPd2fFALC8haNMD3YUG3iHsaUgFU9kO3R5tP64BbY6leylwfqM1JihVepNt1YQYqUmZVUMAdrSg_NX14tqfhhlzgehW0lRDrF0_FHyw5Jj7I7CWOHV4hWfZ1EV7paBbkk3RTPVOSBuSQTkEk1yHTh81Ztb5emCGxLoijpAX6VEXRcBmld3KfWbAMmI_EEU"
                />
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider uppercase">KYOTO BLOSSOM</span>
                  <span className="text-white/80 font-mono">Best in Mar-May</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* END: HeroSection */}

      {/* BEGIN: AIRecommendationBar */}
      <section className="bg-brand-dark text-white border-y border-brand-borderdark py-8 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Callout */}
          <div className="text-center mb-6">
            <p className="font-condensed text-xl tracking-wider text-zinc-400 uppercase">
              RECOMMENDED ACROSS CHATGPT • GEMINI • CLAUDE • PERPLEXITY
            </p>
          </div>

          {/* Metric Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-800 text-center">
            <div className="pt-4 md:pt-0">
              <div className="font-condensed text-5xl lg:text-6xl text-white">
                50K<span className="text-brand-red">+</span>
              </div>
              <div className="text-xs uppercase font-medium tracking-widest text-zinc-400 mt-1">Travelers Guided</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-condensed text-5xl lg:text-6xl text-white">
                200<span className="text-brand-red">+</span>
              </div>
              <div className="text-xs uppercase font-medium tracking-widest text-zinc-400 mt-1">
                Curated Destinations
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-condensed text-5xl lg:text-6xl text-white">
                1M<span className="text-brand-red">+</span>
              </div>
              <div className="text-xs uppercase font-medium tracking-widest text-zinc-400 mt-1">
                AI Recommendations
              </div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-condensed text-5xl lg:text-6xl text-white">
                98<span className="text-brand-red">%</span>
              </div>
              <div className="text-xs uppercase font-medium tracking-widest text-zinc-400 mt-1">Planning Accuracy</div>
            </div>
          </div>
        </div>
      </section>
      {/* END: AIRecommendationBar */}

      {/* BEGIN: DestinationsGrid */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto" id="destinations">
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">AI Curated Escapes</span>
            <h2 className="font-condensed text-6xl md:text-7xl uppercase tracking-tight text-brand-dark mt-1 leading-[0.9]">
              DESTINATIONS
              <br />
              TRAVELERS LOVE
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-600 text-sm font-medium uppercase tracking-wide leading-relaxed">
              DISCOVER THE DESTINATIONS TRAVELERS LOVE MOST, FROM VIBRANT CITIES AND CULTURAL LANDMARKS TO BREATHTAKING
              BEACHES AND HIDDEN GEMS.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Destination Card 1: Bali */}
          <div
            onClick={() => handleExploreDestination('Bali')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Lempuyang Temple Gates in Bali Indonesia"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxcgNDcQvNtx6O779AACsuzINs4F5-tV0Vi9ahhtsIshS3UMAUBLOgRgIUHWU4JPxaKbUS3Qzp8lSbRqvQeJECFEUYw6grrg5Yl70DvCEDnEqJbHd5pPcTKSF9aiAYQ-FvIk-HkJl-4Ns_XcxwopKphMpE2rthaUnWreio9NHDYjZ9qGPojJq_rXs4ulPdu78uWiez8GZaNPCnn0NRmAfW2GJ1Aqll9kcavkxC4fQ"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: APR - OCT
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  BALI
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$940 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">INDONESIA</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>98.4% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>

          {/* Destination Card 2: Santorini */}
          <div
            onClick={() => handleExploreDestination('Santorini')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="White domes and caldera view in Santorini Greece"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuXZOr3aOy6kuWX1XTlf-SRqdmZ9U6aoSEyda2_0F-podtmC_vAwIzFtj7YKjNr7azI4-SN2g8R3OvDHZ1azwl2p-rtRO095GcXxaHdtX6aGqx1mjntKV54Hnn84I9_qvHZ4D74nZoNQjHsH8py5-WuuZnQcUIa727ROZAA3ZdpVyHNYVbvCSaZiED346xJOFJnCHdwJb-w_NXgve6ErEtO-CeuchbaHSGo0VfHxQ"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: MAY - OCT
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  SANTORINI
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$1,680 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">GREECE</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>97.1% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>

          {/* Destination Card 3: Kyoto */}
          <div
            onClick={() => handleExploreDestination('Kyoto')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Scenic traditional tea garden in Kyoto Japan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyBw10o0NqQyhbYn88FM-IUkKJJRMpkgzA8eRWB9slj0WPvL_8U2HudIwufv-QuiZrQKsCNZW5vft0r0xYCJj1xlW7acPMxHqHKVW3WFVQYWDeGFmWGDkK2DsDHCIBRXHf7C5gC6PW--b2MkbkzKSct8SC5t6ewSQyPH84TsZ4iAIEPnuBX21pKygE0A8gpOELGIZ1zdSPDjGYlOywtjUBaf7iO5ccn6JyCloUEQ4"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: MAR - MAY
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  KYOTO
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$1,410 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">JAPAN</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>99.2% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>

          {/* Destination Card 4: Phuket */}
          <div
            onClick={() => handleExploreDestination('Phuket')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Cliffs and turquoise lagoons in Phuket Thailand"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2PSDYAIypDHv6r2JuCPPsU3GcTLajkKXxs9wBRBnrxQG6v_hWP8PJ_BBBDRbh6X0Wyz_0z-7qBYPyj3N0lXcHxDIed8rR2aaGKQ2EDfSPoo8nLhHeDAeZIaWjlSgKgE-sJitPhZT9K2WxzPB_DLQcmvnCFyFInUYXtBgacXPvviPxkn60768tcRTJDX_cEQanwsUZ2UiLXnxo1qQ4_G7OjiG1wv5msg8xC27o8Xg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: NOV - APR
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  PHUKET
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$780 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">THAILAND</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>95.8% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>

          {/* Destination Card 5: Maldives */}
          <div
            onClick={() => handleExploreDestination('Maldives')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Overwater bungalows in Maldives"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBong5nXu7zx3sidUarur0nviLTWMDZxB9qif2VOKpkrUCguoI6p6U1BMUTZVmsLLYtUfvdAm7RUWufyZ4cfCicmN3sWusN4klmxPM0JyDQ-P4tFwxj0RGsIphUDSE1jsQrkrfmP-koRSh0LUTvmmkfuz77acmn2JBKAB_-g7h-_sMVtq12rjMHqRW9rZeAKwnebO9cMKgfA_N__YGlbgD5uuA1CKLFS6D5GovBTLs"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: DEC - APR
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  MALDIVES
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$2,450 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">REP. OF MALDIVES</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>96.5% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>

          {/* Destination Card 6: Dubai */}
          <div
            onClick={() => handleExploreDestination('Dubai')}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-200/80 cursor-pointer"
          >
            <div className="relative h-80 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Burj Al Arab and Marina sunset in Dubai"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXeFNCTYcmCOQH1Rjle3VchAA5cQydKAAgABCw1Gj5pOs3Komo77_DiG12K5J_jhjv_3t3qzbkY_QZO-2iW4AVUI_jTp3Nnjs8n3Ahi3PYke7wtqz__53ZGZQrz1y2F8GGHdxw_ImcRscfrQsdxtUsuubf14CVpscGxo-fs7GVyfDo3vKs79UpxLWc1r_Bnmn18T_H55HwLOG2rT31q_FLaE8bxiIpIZgrN3baZhw"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-800">
                ♦ BEST SEASON: NOV - MAR
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-condensed text-4xl text-zinc-900 group-hover:text-brand-red transition-colors">
                  DUBAI
                </h3>
                <span className="text-xs font-mono font-bold text-zinc-500">$1,890 / wk</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">UAE</p>
              <div className="flex items-center justify-between text-xs pt-4 border-t border-zinc-100 text-zinc-600">
                <span>97.9% AI Match Score</span>
                <span className="font-bold text-brand-dark group-hover:translate-x-1 transition-transform">
                  Explore Guide →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* View All Destinations Bar */}
        <div className="mt-12 text-center">
          <Link
            href="/plan"
            className="inline-flex items-center gap-3 border-2 border-brand-dark hover:bg-brand-dark hover:text-white px-8 py-3.5 rounded text-xs font-bold uppercase tracking-widest transition"
          >
            <span>EXPLORE ALL 200+ DESTINATIONS</span>
            <span>↗</span>
          </Link>
        </div>
      </section>
      {/* END: DestinationsGrid */}

      {/* BEGIN: InteractiveItineraryBuilder */}
      <section className="bg-white py-24 px-6 border-t border-zinc-200" id="itinerary-builder">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">Effortless Generation</span>
            <h2 className="font-condensed text-5xl md:text-7xl text-brand-dark uppercase tracking-tight mt-1">
              FROM IDEA TO ITINERARY IN SECONDS
            </h2>
            <p className="text-zinc-600 text-sm mt-3">
              Our intelligent trip synthesis engine coordinates flight pricing, boutique stays, curated culinary
              reservations, and transportation schedules into a cohesive roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Configuration Steps */}
            <div className="lg:col-span-5 space-y-4">
              {/* Step 1 */}
              <div
                onClick={() => router.push('/plan')}
                className="p-5 bg-[#FAF9F5] border-2 border-brand-red/30 rounded-xl transition hover:border-brand-red cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-zinc-900 block">
                      CHOOSE DESTINATION
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">BALI, INDONESIA (DPS)</span>
                  </div>
                  <span className="text-brand-red font-bold text-xs">EDIT</span>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => router.push('/plan')}
                className="p-5 bg-white border border-zinc-200 rounded-xl hover:border-zinc-400 transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-zinc-900 block">
                      SELECT BUDGET
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">$1,500 — $2,500 TOTAL</span>
                  </div>
                  <span className="text-zinc-400 text-xs">CHANGE</span>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => router.push('/plan')}
                className="p-5 bg-white border border-zinc-200 rounded-xl hover:border-zinc-400 transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-zinc-900 block">
                      PICK TRAVEL DATES
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">JUN 12 — JUN 19 (7 NIGHTS)</span>
                  </div>
                  <span className="text-zinc-400 text-xs">CHANGE</span>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => router.push('/plan')}
                className="p-5 bg-white border border-zinc-200 rounded-xl hover:border-zinc-400 transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-wider font-bold text-zinc-900 block">
                      GENERATE PLAN
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">AI BUILDS YOUR ROUTE IN 3.2s</span>
                  </div>
                  <span className="text-zinc-400 text-xs">ACTIVE</span>
                </div>
              </div>

              {/* CTA Trigger */}
              <Link
                href="/plan"
                className="w-full block text-center bg-brand-red hover:bg-brand-darkred text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg transition"
              >
                GENERATE PLAN NOW
              </Link>
            </div>

            {/* Right: AI-Generated Output Card */}
            <div className="lg:col-span-7 bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    AI GENERATED
                  </div>
                  <h3 className="font-condensed text-3xl text-zinc-900 uppercase">7-DAY BALI IMMERSION PLAN</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">
                    ESTIMATED TOTAL
                  </span>
                  <span className="font-mono text-2xl font-black text-brand-red">$1,840</span>
                </div>
              </div>

              {/* Timeline Days */}
              <div className="mt-6 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-zinc-200/80 flex items-start gap-4">
                  <div className="bg-brand-dark text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded text-center">
                    DAY 1
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900">ARRIVE IN DENPASAR • SEMINYAK SUNSET</h4>
                      <span className="text-[11px] text-zinc-400 uppercase font-mono font-bold">ARRIVAL</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Private VIP transfer to villa, beachfront sundowners at La Lucciola, gentle acclimatization.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-zinc-200/80 flex items-start gap-4">
                  <div className="bg-brand-dark text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded text-center">
                    DAY 2
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900">UBUD RICE TERRACES • MONKEY FOREST</h4>
                      <span className="text-[11px] text-zinc-400 uppercase font-mono font-bold">NATURE</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Morning coffee walk through Tegallalang, artisan woodcarving studios, twilight temple sound bath.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-zinc-200/80 flex items-start gap-4">
                  <div className="bg-brand-dark text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded text-center">
                    DAY 3
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900">NUSA PENIDA ISLAND HOPPING</h4>
                      <span className="text-[11px] text-zinc-400 uppercase font-mono font-bold">ADVENTURE</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Speedboat to Kelingking T-Rex cliff, manta ray snorkel safari, sunset return cruise.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-zinc-200/80 flex items-start gap-4">
                  <div className="bg-brand-dark text-white text-[11px] font-black uppercase px-2.5 py-1.5 rounded text-center">
                    DAY 4
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900">ULUWATU TEMPLE • KECAK FIRE DANCE</h4>
                      <span className="text-[11px] text-zinc-400 uppercase font-mono font-bold">CULTURE</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">
                      Cliffside ocean amphitheater performance, Jimbaran bay fresh grilled seafood dinner.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-zinc-500 font-medium">Includes flights estimate, stay, 4 activities &amp; transfers</span>
                <Link
                  href="/plan"
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-darkred text-white px-6 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition text-center"
                >
                  Customise This Itinerary →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: InteractiveItineraryBuilder */}

      {/* BEGIN: CostTransparencyDarkSection */}
      <section className="bg-brand-dark text-white py-24 px-6 border-t border-zinc-800" id="pricing-engine">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Heading Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">
                Predictive Forecasting
              </span>
              <h2 className="font-condensed text-6xl md:text-7xl uppercase tracking-tight text-white mt-1 leading-[0.9]">
                KNOW THE COST
                <br />
                BEFORE YOU GO
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-zinc-400 text-sm font-medium uppercase tracking-wide leading-relaxed">
                ADJUST THE TRIP AND WATCH EVERY RUPIAH UPDATE INSTANTLY. PRICING MODELLED FROM LIVE FARES, STAYS AND
                LOCAL EXPERIENCES.
              </p>
            </div>
          </div>

          {/* Main Layout: Live Calculator & Hero Destination Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Interactive Pricing Calculator Card */}
            <div className="lg:col-span-6 bg-brand-carddark border border-brand-borderdark rounded-2xl p-7 shadow-2xl">
              {/* Card Header & Total */}
              <div className="flex justify-between items-start pb-6 border-b border-zinc-800">
                <div>
                  <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold block">
                    ESTIMATED TOTAL
                  </span>
                  <div className="font-mono text-5xl font-black text-white mt-1">
                    ${calculatedGrandTotal.toLocaleString()}
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">
                    ${perTraveler.toLocaleString()} per traveler • {nights} nights
                  </span>
                </div>
                <button
                  onClick={() => router.push(`/plan?budget=${calculatedGrandTotal}`)}
                  className="bg-brand-red text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:bg-brand-darkred transition"
                >
                  LOCK RATE
                </button>
              </div>

              {/* Controls: Travelers & Cabin */}
              <div className="grid grid-cols-2 gap-4 py-6 border-b border-zinc-800">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2">
                    TRAVELERS
                  </label>
                  <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 w-fit">
                    <button
                      type="button"
                      onClick={() => setCalcTravelers((prev) => Math.max(1, prev - 1))}
                      className="text-zinc-400 hover:text-white font-mono px-2 py-0.5 rounded hover:bg-zinc-800"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-sm min-w-4 text-center">{calcTravelers}</span>
                    <button
                      type="button"
                      onClick={() => setCalcTravelers((prev) => prev + 1)}
                      className="text-zinc-400 hover:text-white font-mono px-2 py-0.5 rounded hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2">
                    CABIN CLASS
                  </label>
                  <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setCabinClass('economy')}
                      className={`px-3 py-1 rounded transition ${
                        cabinClass === 'economy' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Economy
                    </button>
                    <button
                      type="button"
                      onClick={() => setCabinClass('premium')}
                      className={`px-3 py-1 rounded transition ${
                        cabinClass === 'premium' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Premium
                    </button>
                    <button
                      type="button"
                      onClick={() => setCabinClass('business')}
                      className={`px-3 py-1 rounded transition ${
                        cabinClass === 'business' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Business
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation Picker */}
              <div className="py-6 border-b border-zinc-800">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-3">
                  WHERE YOU STAY
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setSelectedStay('jungle')}
                    className={`rounded-lg p-3 text-center cursor-pointer transition ${
                      selectedStay === 'jungle'
                        ? 'border border-brand-red bg-brand-red/10'
                        : 'border border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    <span className="text-xs font-bold block text-white">Jungle Villa</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Ubud • $130/nt</span>
                  </div>

                  <div
                    onClick={() => setSelectedStay('cliffside')}
                    className={`rounded-lg p-3 text-center cursor-pointer transition ${
                      selectedStay === 'cliffside'
                        ? 'border border-brand-red bg-brand-red/10'
                        : 'border border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    <span className="text-xs font-bold block text-zinc-300">Cliffside Boutique</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Uluwatu • $210/nt</span>
                  </div>

                  <div
                    onClick={() => setSelectedStay('beach')}
                    className={`rounded-lg p-3 text-center cursor-pointer transition ${
                      selectedStay === 'beach'
                        ? 'border border-brand-red bg-brand-red/10'
                        : 'border border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    <span className="text-xs font-bold block text-zinc-300">Beach Resort</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Seminyak • $240/nt</span>
                  </div>
                </div>
              </div>

              {/* Included Experiences Checklist */}
              <div className="py-6 border-b border-zinc-800">
                <label className="block text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-3">
                  EXPERIENCES INCLUDED
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    'Surf lesson at Uluwatu',
                    'Temple & rice-terrace tour',
                    'Mount Batur sunrise trek',
                    'Balinese spa & wellness',
                  ].map((exp) => {
                    const isChecked = includedExperiences.includes(exp);
                    return (
                      <div
                        key={exp}
                        onClick={() =>
                          setIncludedExperiences((prev) =>
                            prev.includes(exp) ? prev.filter((i) => i !== exp) : [...prev, exp]
                          )
                        }
                        className="flex items-center gap-2 bg-zinc-900 p-2.5 rounded border border-zinc-800 text-zinc-300 cursor-pointer hover:border-zinc-700 select-none"
                      >
                        <span className={isChecked ? 'text-emerald-400' : 'text-zinc-600'}>
                          {isChecked ? '✓' : '○'}
                        </span>
                        <span className={isChecked ? 'text-zinc-200' : 'text-zinc-500'}>{exp}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar Line Items Breakdown */}
              <div className="pt-6 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Flights ({calcTravelers}x Return)</span>
                    <span className="font-mono text-zinc-200 font-bold">${totalFlights.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-red h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((totalFlights / calculatedGrandTotal) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Stays ({nights} Nights {selectedStay})</span>
                    <span className="font-mono text-zinc-200 font-bold">${totalStays.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-accent h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((totalStays / calculatedGrandTotal) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Food &amp; Dining</span>
                    <span className="font-mono text-zinc-200 font-bold">${foodTotal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((foodTotal / calculatedGrandTotal) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Experiences &amp; Passes</span>
                    <span className="font-mono text-zinc-200 font-bold">${Math.round(experiencesTotal).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((experiencesTotal / calculatedGrandTotal) * 100))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Destination Presentation */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Luxury infinity pool overlooking Bali rainforest and mountains"
                  className="w-full h-[580px] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBei1-IrIljYYUJfFZIEKGXA_ej8MlFmr5I1ph-8kwQeJNBT986SwS566iJDEh_HPPWwBbjt3rPTbLOPjrGEaiTrzyNH8Sk787tfznEJuI-eGjFNXX2cV6o900i7DKAkZcJyau2vRUSrs2UQQkdvLhX6xWz_UsDwjmTVri8rbsGNq5bVFHuwN439rR_FeMxwz6JHvXRJ0B-_bPlXtG9jaTH4XR4ryshAb3T2AV6rMA"
                />

                {/* Floating Live Rate Badge */}
                <div className="absolute top-6 left-6 max-w-xs bg-brand-dark/85 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white shadow-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-brand-red animate-ping"></span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red">AIRFARE INSIGHT</span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    Fares to Denpasar dip -14% for 8-night stays departing mid-week. We&apos;ve priced that window below.
                  </p>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-6 inset-x-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 rounded-xl flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">DESTINATION</span>
                    <h4 className="font-condensed text-5xl uppercase text-white leading-none">BALI</h4>
                  </div>
                  <div className="text-right text-xs text-zinc-300 font-mono">
                    <div>
                      BEST SEASON: <span className="font-bold text-white">Apr – Oct</span>
                    </div>
                    <div>
                      AVG TEMP: <span className="font-bold text-white">29°C</span>
                    </div>
                    <div>
                      TIME ZONE: <span className="font-bold text-white">GMT+8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CostTransparencyDarkSection */}

      {/* BEGIN: ToolkitSection */}
      <section className="bg-brand-dark text-white py-24 px-6 border-t border-zinc-800" id="toolkit">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">Travel Smarter</span>
            <h2 className="font-condensed text-6xl md:text-7xl uppercase tracking-tight text-white mt-1">
              A FULL TOOLKIT FOR EVERY TRIP
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
              Integrated intelligence apps replacing dozens of fragmented spreadsheets, tabs, and booking bookmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Travel Flatlay Photography */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Luggage flatlay with headphones, camera, passport and travel gear"
                className="w-full h-[520px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWZy-i8H0s0VQg1SZYlvFBRnP9uQ2CiLOhOPq7FJzCBNlNKooM3SHGg4pWZjrqcazGXoFlTVlgaKNfRuTiVX8XQRZSRqQyTQXTNm4qoFLxieifb2sYhQ8gjtcqVxydX7Tq76PBt4b_BwxsViFVEcK1ghcTIqbrMM9GC9LXkXhz8Gx0xuq6-dlGZ4jFkVf_yV3Z1UR3WMWPgMH6q_ZgxF6gfNPrCqoGh1E3xiL_D2I"
              />
            </div>

            {/* Right: 5 Feature Cards Vertical Grid */}
            <div className="lg:col-span-6 space-y-4">
              <Link
                href="/plan"
                className="p-4 bg-brand-carddark border border-zinc-800 rounded-xl hover:border-brand-red transition flex items-center gap-4 block"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl flex-shrink-0">
                  ⊙
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">AI ITINERARY GENERATOR</h4>
                  <p className="text-xs text-zinc-400">Full day-by-day plans tuned to your personal travel pace &amp; interests.</p>
                </div>
              </Link>

              <Link
                href="/plan"
                className="p-4 bg-brand-carddark border border-zinc-800 rounded-xl hover:border-brand-red transition flex items-center gap-4 block"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl flex-shrink-0">
                  ⊞
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">VISA &amp; ENTRY CHECKER</h4>
                  <p className="text-xs text-zinc-400">Instant entry requirements, transit regulations &amp; health mandates for any passport.</p>
                </div>
              </Link>

              <Link
                href="/plan"
                className="p-4 bg-brand-carddark border border-zinc-800 rounded-xl hover:border-brand-red transition flex items-center gap-4 block"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl flex-shrink-0">
                  $
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">BUDGET CALCULATOR</h4>
                  <p className="text-xs text-zinc-400">Transparent cost breakdown before booking with real-world price modeling.</p>
                </div>
              </Link>

              <Link
                href="/plan"
                className="p-4 bg-brand-carddark border border-zinc-800 rounded-xl hover:border-brand-red transition flex items-center gap-4 block"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl flex-shrink-0">
                  ✶
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">PACKING LIST GENERATOR</h4>
                  <p className="text-xs text-zinc-400">Weather-aware packing check-lists based on forecast and scheduled excursions.</p>
                </div>
              </Link>

              <Link
                href="/plan"
                className="p-4 bg-brand-carddark border border-zinc-800 rounded-xl hover:border-brand-red transition flex items-center gap-4 block"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-red/20 text-brand-red flex items-center justify-center font-bold text-xl flex-shrink-0">
                  ¥
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-white">LIVE CURRENCY CONVERTER</h4>
                  <p className="text-xs text-zinc-400">Real-time bank exchange estimates with merchant fee penalty prevention.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* END: ToolkitSection */}

      {/* BEGIN: StoriesSection */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">Editorial Journal</span>
            <h2 className="font-condensed text-6xl md:text-7xl uppercase tracking-tight text-brand-dark leading-none">
              STORIES WORTH
              <br />
              THE DETOUR
            </h2>
          </div>
          <Link
            href="/plan"
            className="border-2 border-brand-dark px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-brand-dark hover:text-white transition"
          >
            BROWSE ALL GUIDES ↗
          </Link>
        </div>

        {/* Editorial Cards 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={() => handleExploreDestination('Kyoto')} className="group cursor-pointer">
            <div className="relative h-[440px] rounded-xl overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Kyoto traditional shrine path"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuEHRkuEjJxiNfG3ShyQ6e1IMdEXodf--GYSZCEw7Jf1X5pvQRA0ael_4K5oJcrPUNTLK8i0p5MDpNlt2L3KxPxVMDm3mjxlhcrEd1e8DJdUOuJp1VWTRsD2DKgjPIC42MhE6GpTvjgL-TSUlNaVqlojwCaBV-C3gA6koedZeVzA38rX2dOHbRTr4UvajKz6kEtKp8CAcmpFBAjMC2IQoRZHTO0xZo6atE19mqobM"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">JAPAN • 8 MIN READ</span>
                <h3 className="font-heading font-bold text-xl mt-1 leading-snug">
                  The Slow-Travel Guide to Kyoto&apos;s Hidden Temples
                </h3>
                <span className="text-xs text-zinc-400 mt-2">Mina Tanaka • Aug 12, 2026</span>
              </div>
            </div>
          </div>

          <div onClick={() => handleExploreDestination('Santorini')} className="group cursor-pointer">
            <div className="relative h-[440px] rounded-xl overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Santorini caldera terrace view"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZy65gJBX-2Hkr_4kW8E4UuxIN5R5d2AKvUQh6xdyjGpV9DfQ1qRNkj3LSWX2iObfpJ_nH5laO6lNpfYpyVsFnAGFUg07ZjOMHvEV8vD4P5qwC0mgFpfnpj2IG9b9sR-B5OZzzQg7zywyT8_X8BWi-RUa-ZJ_xEWan7lEIWUvPma2wZS8WlzL9c9IVJmit_-zawaI2g_q3eRIrPyaAutQ9GTr2QRhBBA_ZLx75QLs"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">GREECE • 6 MIN READ</span>
                <h3 className="font-heading font-bold text-xl mt-1 leading-snug">
                  Caldera Living: Best Cliffside Tavernas in Oia
                </h3>
                <span className="text-xs text-zinc-400 mt-2">Elena Rostova • Jul 29, 2026</span>
              </div>
            </div>
          </div>

          <div onClick={() => handleExploreDestination('Vietnam')} className="group cursor-pointer">
            <div className="relative h-[440px] rounded-xl overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Emerald waters and wooden footbridge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDVkycLaCdiGEuXakSn6LzpBZZav8iiipjpxKfgD8hOKeS7wmBRVWpK3lplEuTasPFa8OAdkHGUJFPDkrDM126ibV25fMqav5MazxubfTGtVI9Am1tlppEBamvea-BSjDk95a2cX1OwGkNzs6uCCU450VRmgeI2aBJRPReQjEpE_ZqqJlepZqcazWQSgEw0qb3rypNtd43iAKcFk8gW2o-ppP8X8HrL7tFFCA7f-c"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-300">VIETNAM • 10 MIN READ</span>
                <h3 className="font-heading font-bold text-xl mt-1 leading-snug">
                  Kayaking Through Ninh Binh&apos;s Submerged Caverns
                </h3>
                <span className="text-xs text-zinc-400 mt-2">Liam Chen • Jul 14, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: StoriesSection */}

      {/* BEGIN: TestimonialsBar */}
      <section className="bg-brand-dark text-white py-16 px-6 border-t border-brand-borderdark">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-condensed text-3xl tracking-widest uppercase text-white/90">
              TRUSTED BY EXPLORERS EVERYWHERE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-brand-carddark p-5 rounded-xl border border-zinc-800">
              <div className="flex text-amber-400 text-xs mb-2">★★★★★</div>
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                &ldquo;I asked ChatGPT for trip help and it pointed me here. Comparing destinations took five minutes.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWvimJlMvUhmptDjMmAEabiK2i1mFNzDYU9ubKIOLNKfZ70YkfmNH8AYKD1EOXeZ1_R9nLdaFw5ROcTyOP2DAzzjE5puzfBnvMn5qT5DMlPffI0oNwLCSEfZH5D3VOILblrnh3wF4343Uv5qPoAd8v-m_Am4E-F93TNXxFdROKWgQTK0zjmme9ZZrWp6mGot3RByIm25DEvmLi5Sp1EnUjobcfYRCgrGiazIWKJ1g"
                />
                <div>
                  <div className="text-xs font-bold text-white">Yuki Sato</div>
                  <div className="text-[10px] text-zinc-500">Japan Explorer</div>
                </div>
              </div>
            </div>

            <div className="bg-brand-carddark p-5 rounded-xl border border-zinc-800">
              <div className="flex text-amber-400 text-xs mb-2">★★★★★</div>
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                &ldquo;The budget simulator saved our group over $800 on our Bali accommodations and transfer booking.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3rmZ7HRB_apnaqeQGieD1OhYTAovLghIMBPWLgNE-cCuiuvnC8mJa_mIT7UcfwSGHSsB9bnkXAyaUJN6tZm0gqHyZoYyZfdg5xHvTOxzRc2J8w4VsllSztkHt4CCaGEqM0qNyg0Zwo47N1sU7nnt8OWUrqPhwuK9PL5BBXZH1CzHyDQGeTsiXlFjiCJ-92YgN3wM5GvUETIUevNQDUgHfkOhYzujd0KnU56jwHpA"
                />
                <div>
                  <div className="text-xs font-bold text-white">Marcus Vance</div>
                  <div className="text-[10px] text-zinc-500">London, UK</div>
                </div>
              </div>
            </div>

            <div className="bg-brand-carddark p-5 rounded-xl border border-zinc-800">
              <div className="flex text-amber-400 text-xs mb-2">★★★★★</div>
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                &ldquo;Replaced 4 different apps with NEXTRIP. The visa check and packing lists were scarily accurate.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZgnZi6xkCYZShZes9TQYcvR4hI_VNeSXj-qNMCHAa4Pd6LQ560fCzBeWL4C6PShT9CuE90vGoZSVaCcJpx1hYrOtuoJtTrqKKkIgPk85u9KG1O0uKfiZHoCLEm3vMkJE86UmBVggcHEvNE1kg1aIIQ92jw4sB_VqlNDCFdipEwLcRey-nFYzX7xuNKRWq1adErnoQvQji5YvPGl3aadxQI_5R5v9w3PrSlzpvJ84"
                />
                <div>
                  <div className="text-xs font-bold text-white">Clara Diaz</div>
                  <div className="text-[10px] text-zinc-500">Madrid, Spain</div>
                </div>
              </div>
            </div>

            <div className="bg-brand-carddark p-5 rounded-xl border border-zinc-800">
              <div className="flex text-amber-400 text-xs mb-2">★★★★★</div>
              <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
                &ldquo;Cleanest interface in the travel space. It actually feels like planning luxury travel with AI.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3bWPg7kdqZe4PnmOzX7wlCx_Jco4BihM72cfAzBC_DLfVF7iOR6JrC_RkkMsJpvrjU0-W17M7h_8z2OC2mfRe1i8F2UxCvuD6h7-U6nbmwdyywCr-bqcEGkiec_ls6DH7MmZ03J9bE1g6_-Cu9o434gfD9TgATh7inJzyRRCkfXzyx_-AAQrk_p2Neb7fkvDX0N-WGhfTm_UofNLSOjvC14Xe5UnNO2cFDTxnpzo"
                />
                <div>
                  <div className="text-xs font-bold text-white">David Miller</div>
                  <div className="text-[10px] text-zinc-500">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: TestimonialsBar */}

      {/* BEGIN: PricingPlansSection */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto" id="plans">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-red text-xs uppercase tracking-[0.25em] font-black">Membership &amp; Access</span>
          <h2 className="font-condensed text-6xl md:text-7xl uppercase tracking-tight text-brand-dark mt-1">
            PLANS THAT SCALE WITH YOUR WANDERLUST
          </h2>
          <p className="text-zinc-600 text-sm mt-3">
            From spontaneous weekend breaks to agency-scale itineraries for clients worldwide.
          </p>
        </div>

        {/* Pricing 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Starter */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block mb-2">STARTER</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-mono text-5xl font-black text-zinc-900">$0</span>
                <span className="text-xs text-zinc-500 font-bold uppercase">/ Forever</span>
              </div>
              <p className="text-xs text-zinc-600 mb-6 pb-6 border-b border-zinc-100">
                Starter is perfect for casual travelers who want quick trip ideas without spending a dime.
              </p>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                WHAT&apos;S INCLUDED
              </span>
              <ul className="space-y-3 text-xs text-zinc-700">
                <li className="flex items-center gap-2">✓ 3 AI Itineraries / Month</li>
                <li className="flex items-center gap-2">✓ Budget Calculator</li>
                <li className="flex items-center gap-2">✓ Community Guides</li>
                <li className="flex items-center gap-2">✓ Basic Destination Compare</li>
              </ul>
            </div>
            <Link
              href="/plan"
              className="w-full block text-center mt-8 border-2 border-zinc-300 hover:border-brand-dark py-3 rounded font-bold text-xs uppercase tracking-wider transition"
            >
              START FREE
            </Link>
          </div>

          {/* Tier 2: Pro (Highlighted) */}
          <div className="bg-brand-dark text-white rounded-2xl p-8 border-2 border-brand-red flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 right-6 bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-red block mb-2">
                PRO EXPLORER
              </span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-mono text-5xl font-black text-white">$19</span>
                <span className="text-xs text-zinc-400 font-bold uppercase">/ Per Month</span>
              </div>
              <p className="text-xs text-zinc-400 mb-6 pb-6 border-b border-zinc-800">
                Pro unlocks the full power of AI travel planning for frequent global explorers.
              </p>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                WHAT&apos;S INCLUDED
              </span>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand-red">✓</span> Unlimited AI Itineraries
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-red">✓</span> Advanced Budget &amp; Currency Tools
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-red">✓</span> Visa &amp; Packing Generators
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-red">✓</span> Priority AI Recommendations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-red">✓</span> Offline Trip PDF Export
                </li>
              </ul>
            </div>
            <Link
              href="/plan"
              className="w-full block text-center mt-8 bg-brand-red hover:bg-brand-darkred text-white py-3.5 rounded font-bold text-xs uppercase tracking-wider shadow-lg transition"
            >
              START FREE TRIAL
            </Link>
          </div>

          {/* Tier 3: Agency */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block mb-2">AGENCY / CREW</span>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-mono text-5xl font-black text-zinc-900">$79</span>
                <span className="text-xs text-zinc-500 font-bold uppercase">/ Per Month</span>
              </div>
              <p className="text-xs text-zinc-600 mb-6 pb-6 border-b border-zinc-100">
                Explore destinations, compare travel options, and generate up to 50 AI-powered itineraries each month.
              </p>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                WHAT&apos;S INCLUDED
              </span>
              <ul className="space-y-3 text-xs text-zinc-700">
                <li className="flex items-center gap-2">✓ Everything in Pro</li>
                <li className="flex items-center gap-2">✓ Client Trip Workspaces</li>
                <li className="flex items-center gap-2">✓ White-label Itineraries</li>
                <li className="flex items-center gap-2">✓ Team Collaboration</li>
                <li className="flex items-center gap-2">✓ API Access</li>
              </ul>
            </div>
            <Link
              href="/plan"
              className="w-full block text-center mt-8 border-2 border-zinc-300 hover:border-brand-dark py-3 rounded font-bold text-xs uppercase tracking-wider transition"
            >
              CONTACT SALES
            </Link>
          </div>
        </div>
      </section>
      {/* END: PricingPlansSection */}

      {/* BEGIN: FAQSection */}
      <section className="bg-white py-24 px-6 border-t border-zinc-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-condensed text-6xl uppercase tracking-tight text-brand-dark">QUESTIONS ANSWERED</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Graphic / Mini Photos */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="p-6 bg-brand-sand border border-zinc-200 rounded-xl">
                <h4 className="font-bold text-sm uppercase text-zinc-900 mb-1">Need help deciding?</h4>
                <p className="text-xs text-zinc-600 mb-4">Our concierge team and AI model train on 1,400+ destinations weekly.</p>
                <div className="grid grid-cols-2 gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Travel vignette"
                    className="rounded-lg h-24 w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1yjCpgWVi25XxerKKCbn4OUboc8z_QhPN_GbQ3LZQ9oW0OiRRs-qAKQpLcF16PXjGNbijdP5bbvz4qOc8DQMmaVa8j3PQeEORd68CuAl97YlSBdCevY7ZBn5CW1remA8M3xzABpclrtpAj9InwItMJh4j94hk5hetvoaAFZvi6p09gMeLiBYcWXqZCnQPDNgphGPi_o9bmRwM5hjzJznwh9-bOt-MK6rFzAV5Cc"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Travel map"
                    className="rounded-lg h-24 w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvz8NK-0xfypT3gQ4CMBL4SdcYgKkLiPZbpG_mxxhOjCKG_Zd9tQk1is_dKXAj4zBCJj_hw7nkqdMznWYZctnFAoezrxLnELXuSJpzbwSR1iDyrsV0Kdeh8qfLzQ1rZeD9hmGeMtmx8DA85zeylwd3RYbZ3BjzRDpw8u6kddhAN4RpDzTNE661uu0Y_hXJOLqG61Xxl_7_TPaKSiFUai8Rrpg3020BeNDycpu0A-Y"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Accordion */}
            <div className="lg:col-span-8 space-y-3">
              {[
                {
                  q: 'HOW DOES THE AI TRIP GENERATOR WORK?',
                  a: 'It combines live pricing, weather, reviews and millions of real trips to build a day-by-day plan tuned to your budget, dates and travel style — in seconds.',
                },
                {
                  q: 'IS NEXTRIP REALLY USED BY AI ASSISTANTS?',
                  a: 'Yes, our semantic search and structured itinerary schemas are queried via API by leading AI models like Gemini, ChatGPT, Claude, and Perplexity for authoritative real-time travel intelligence.',
                },
                {
                  q: 'HOW ACCURATE IS THE BUDGET CALCULATOR?',
                  a: 'Our budget engine models live airfare schedules, verified hotel rates, local meal costs, and entry tickets within 95%+ precision of actual on-ground expenditure.',
                },
                {
                  q: 'CAN I USE NEXTRIP FOR FREE?',
                  a: 'Absolutely! Our Starter plan provides up to 3 complete AI itineraries each month, real-time weather forecasting, and complete community guides with zero credit card required.',
                },
              ].map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? 'border border-brand-red bg-brand-red text-white'
                        : 'border border-zinc-200 bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <div
                      onClick={() => toggleFaq(idx)}
                      className="p-4 flex justify-between items-center cursor-pointer select-none"
                    >
                      <span className={`font-bold text-sm uppercase tracking-wide ${isOpen ? 'text-white' : 'text-zinc-800'}`}>
                        {item.q}
                      </span>
                      <span className={`font-mono text-sm ${isOpen ? 'text-white' : 'text-zinc-400'}`}>
                        {isOpen ? '∧' : '∨'}
                      </span>
                    </div>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-white/90 leading-relaxed border-t border-white/20 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 text-right">
                <Link
                  href="/plan"
                  className="inline-block border border-zinc-300 hover:border-zinc-800 text-zinc-700 text-xs font-bold uppercase tracking-wider px-5 py-2 rounded transition"
                >
                  VIEW ALL FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: FAQSection */}

      {/* BEGIN: NewsletterSection */}
      <section className="bg-brand-red text-white py-20 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="inline-flex gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Thumb"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxc064ncvmTqj8dNC5Lh5II4G4r6t5fJZu4AuY1L2N2zkfTSp_-oWgJNvaRXXclKi4TC3k68iIVKA7o_TFU2iVMtVjhlHpcIZexpFiiVM_mOp8AAC5ml8zpsuXkeScOPVOZug671m_NxaELfSyXTytvf9WxnlE-exAlnSXuUaw_Vgxz05PFYyWZ0lvoUjnSOd-Jsusvj2dGCx0e1twP-TEmmslqrsG0lXPmCxsuO8"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Thumb"
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO8yRfDfvkF0LHe09ddIkFeE1uzPJPYOdrL-vtUCcRAf3HJY7UEnHUEQmrYcsbeE8yrnHoQy9auCuNBZBkqS7_aI0fuoBmQNYrZypjzHpZscoHK3QzgmyEkLT8xjf0Odo_zedu7Qtlt-k6gD5L93LG0phNIGvjuVumzClhuJiqrHT9Uj5useDB_24DysiMEVhXKezUb52_BFUoqBhMPkWVEqpC5jnNXcZQuodJuqI"
            />
          </div>

          <h2 className="font-condensed text-5xl md:text-6xl uppercase tracking-tight">
            GET WEEKLY AI TRAVEL INSIGHTS
          </h2>
          <p className="text-xs uppercase font-medium tracking-widest text-white/80 max-w-md mx-auto mt-2 mb-8">
            FRESH DESTINATIONS, PRICE DROPS AND PLANNING TIPS CURATED BY AI, DELIVERED EVERY THURSDAY.
          </p>

          <form
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert('✨ Thanks for subscribing to NEXTRIP AI Weekly!');
            }}
          >
            <input
              className="flex-1 bg-white text-zinc-900 placeholder-zinc-400 text-sm px-4 py-3 rounded border-0 focus:ring-2 focus:ring-black"
              placeholder="Enter your email address"
              required
              type="email"
            />
            <button
              className="bg-brand-dark hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded transition"
              type="submit"
            >
              GET STARTED
            </button>
          </form>
        </div>
      </section>
      {/* END: NewsletterSection */}

      {/* BEGIN: Footer */}
      <footer className="bg-brand-dark text-white pt-20 pb-12 px-6 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Huge Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end pb-16 border-b border-zinc-800 gap-8">
            <div>
              <h2 className="font-condensed text-6xl md:text-8xl uppercase tracking-tight leading-[0.85] text-white">
                LUXURY TRAVEL MEETS
                <br />
                AI INTELLIGENCE.
              </h2>
            </div>
            <div>
              <span className="font-display text-4xl tracking-widest uppercase text-white/90">NEXTRIP.AI</span>
            </div>
          </div>

          {/* Sitemap Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 text-xs border-b border-zinc-800">
            <div>
              <h5 className="font-bold uppercase tracking-wider text-white mb-4">PRODUCT</h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    AI Itineraries
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    Budget Calculator
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    Compare Cities
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    Travel Tools
                  </Link>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#plans">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-wider text-white mb-4">RESOURCES</h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li>
                  <a className="hover:text-white transition" href="#destinations">
                    Destination Guides
                  </a>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    AI Prompt Library
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/plan">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Release Notes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-wider text-white mb-4">DESTINATIONS</h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li>
                  <button onClick={() => handleExploreDestination('Bali')} className="hover:text-white transition">
                    Bali • Indonesia
                  </button>
                </li>
                <li>
                  <button onClick={() => handleExploreDestination('Kyoto')} className="hover:text-white transition">
                    Kyoto • Japan
                  </button>
                </li>
                <li>
                  <button onClick={() => handleExploreDestination('Santorini')} className="hover:text-white transition">
                    Santorini • Greece
                  </button>
                </li>
                <li>
                  <button onClick={() => handleExploreDestination('Phuket')} className="hover:text-white transition">
                    Phuket • Thailand
                  </button>
                </li>
                <li>
                  <button onClick={() => handleExploreDestination('Dubai')} className="hover:text-white transition">
                    Dubai • UAE
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-wider text-white mb-4">COMPANY</h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li>
                  <a className="hover:text-white transition" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Careers (Hiring!)
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Press &amp; Media
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Brand Assets
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-wider text-white mb-4">LEGAL</h5>
              <ul className="space-y-2.5 text-zinc-400">
                <li>
                  <a className="hover:text-white transition" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Cookie Settings
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Security &amp; Trust
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    AI Ethics Notice
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Status */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
            <p>© 2026 NEXTRIP Technologies Inc. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                All AI Systems Operational
              </span>
              <span>1440px Desktop Master Layout</span>
            </div>
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}
