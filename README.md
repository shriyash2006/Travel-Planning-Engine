# TripCraft — AI Travel Planning & Experience Engine 🧭✈️

> **Problem Statement:** Plan trips dynamically with preferences, constraints, and real-time updates.  
> Built for **ML Bhopal Hackathon**.

![TripCraft Demo](https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Key Capabilities

1. **Dynamic AI Synthesis (Gemini 1.5):** Generates structured day-by-day itineraries personalized by travel vibes (*Adventure, Relaxed, Cultural, Luxury, Backpacker*), dietary restrictions, and pace.
2. **Real-Time Climate Engine (OpenWeather):** Live temperature feeds and 5-day weather forecasts to optimize activity scheduling.
3. **Smart Budget & Expense Engine:** Automatic categorization across Stays, Food, Flights, Transit, and Activities with a live expense log and over-budget alerts.
4. **Flight & Accommodation Matrix:** Compares flights with "Best Value" and "Direct" tags, plus verified stays with one-click reservation simulation.
5. **Dark Mode Map Explorer:** Interactive geospatial map visualization of destinations with custom dark themes.
6. **Resilient Architecture:** High-speed parallel calls (`Promise.all`) with reliable fallback generators to ensure 100% demo uptime.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Vanilla CSS & CSS Modules (Glassmorphism, Dark UI, Smooth Animations)
- **AI Engine:** Google Gemini (`@google/generative-ai`)
- **APIs:** OpenWeather API, Google Maps Embed
- **Icons:** Lucide Icons & UTF-8 Badges

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your API keys:
```env
GEMINI_API_KEY=your_gemini_key
OPENWEATHER_API_KEY=your_openweather_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
```
*(Note: If API keys are not provided, the engine automatically uses built-in realistic mock data for zero-downtime judging and evaluation).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧭 Repository Structure

```
travel-engine/
├── .env.example
├── SKILL.md                          # 2-hour hackathon execution plan for Astra
├── src/
│   ├── app/
│   │   ├── globals.css               # Global dark glassmorphism design system
│   │   ├── layout.tsx                # Metadata and layout
│   │   ├── page.tsx                  # Landing hero and features showcase
│   │   ├── plan/page.tsx             # Interactive trip planner workspace
│   │   └── api/
│   │       ├── generate-itinerary/   # Gemini AI generation endpoint
│   │       ├── weather/              # OpenWeather current & 5-day forecast
│   │       └── search/               # Flights & accommodation search
│   ├── components/
│   │   ├── TripForm.tsx              # Preferences & constraints input
│   │   ├── WeatherWidget.tsx         # Real-time weather widget
│   │   ├── ItineraryView.tsx         # Daily schedule timeline & checklist
│   │   ├── BudgetTracker.tsx         # Real-time expense tracker
│   │   ├── FlightHotelCards.tsx      # Flight & stay comparison cards
│   │   └── MapView.tsx               # Geospatial dark map explorer
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces
│       └── gemini.ts                 # Gemini AI integration & fallback
```

---

## 🏆 Hackathon Round 1 Highlights
- Rapid 5-10s multi-provider generation
- Complete timeline view with packing checklists & emergency helplines
- Responsive across mobile and desktop devices
