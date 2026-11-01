---
name: tripcraft-hackathon
description: Complete 2-hour execution plan for TripCraft — AI Travel Planning Engine. Astra reads this file and builds the full app end-to-end.
---

# TripCraft — AI Travel Planning & Experience Engine
## 🏁 Hackathon Execution Plan (2 Hours)

> **Stack:** Next.js 15 · TypeScript · Gemini 1.5 Pro · OpenWeather API · Google Maps · Vanilla CSS
> **APIs needed:** GEMINI_API_KEY · OPENWEATHER_API_KEY · NEXT_PUBLIC_GOOGLE_MAPS_KEY

---

## ⏱️ Time Breakdown

| Phase | Time | Tasks |
|-------|------|-------|
| Phase 1 — Scaffold & Config | 0:00–0:15 | Next.js setup, env vars, deps |
| Phase 2 — Types & API Routes | 0:15–0:35 | TypeScript types, 3 API routes |
| Phase 3 — Core Components | 0:35–1:05 | TripForm, WeatherWidget, ItineraryView, BudgetTracker |
| Phase 4 — Pages | 1:05–1:30 | Landing page + Planner page |
| Phase 5 — FlightHotel + Map | 1:30–1:50 | Search cards + Google Maps embed |
| Phase 6 — Polish & Run | 1:50–2:00 | CSS polish, npm run dev |

---

## 📁 File Structure

```
travel-engine/
├── .env.local
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Landing hero
│   │   ├── plan/page.tsx             ← Main planner (MOST IMPORTANT)
│   │   └── api/
│   │       ├── generate-itinerary/route.ts  ← Gemini AI
│   │       ├── weather/route.ts             ← OpenWeather
│   │       └── search/route.ts             ← Simulated flights+hotels
│   ├── components/
│   │   ├── TripForm.tsx + .module.css
│   │   ├── WeatherWidget.tsx + .module.css
│   │   ├── ItineraryView.tsx + .module.css
│   │   ├── BudgetTracker.tsx + .module.css
│   │   ├── FlightHotelCards.tsx + .module.css
│   │   └── MapView.tsx
│   └── lib/
│       ├── types.ts
│       └── gemini.ts
```

---

## Phase 1: Scaffold

```bash
npx -y create-next-app@latest ./travel-engine --typescript --app --eslint --src-dir --import-alias "@/*" --use-npm --disable-git --no-tailwind --yes
cd travel-engine
npm install @google/generative-ai lucide-react framer-motion
```

.env.local:
```
GEMINI_API_KEY=your_key
OPENWEATHER_API_KEY=your_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key
```

---

## Phase 2: Types & API Routes

### src/lib/types.ts — Full interfaces:

TripPreferences: destination, origin, startDate, endDate, budget, currency, travelers (number), travelStyle ('adventure'|'relaxed'|'cultural'|'luxury'|'backpacker'), dietaryRestrictions (string[]), interests (string[]), accommodation ('hostel'|'budget_hotel'|'mid_range'|'luxury'|'airbnb'), transportMode ('public'|'rental'|'taxi'|'mix')

DayActivity: time, activity, location, description, estimatedCost (per person), duration, category ('sightseeing'|'food'|'transport'|'accommodation'|'experience'|'shopping'), tips?

DayPlan: day, date, theme, activities (DayActivity[]), totalDayCost, weather?

Itinerary: destination, duration, totalEstimatedCost, currency, days (DayPlan[]), packingList (string[]), travelTips (string[]), culturalNotes (string[]), emergencyContacts ({name, number}[])

WeatherData: temp, feels_like, description, humidity, wind_speed, icon, forecast (WeatherForecast[])

WeatherForecast: date, temp_min, temp_max, description, icon

FlightOption: id, airline, logo, departure, arrival, duration, stops, price, currency, class, amenities (string[])

HotelOption: id, name, stars, rating, reviews, pricePerNight, currency, amenities, location, distance

BudgetEntry: id, category, description, amount, date, day

### src/lib/gemini.ts

Use GoogleGenerativeAI from @google/generative-ai with model 'gemini-1.5-pro'.
Prompt Gemini to return ONLY valid JSON (no markdown code blocks).
JSON structure: { destination, duration, totalEstimatedCost, currency, days: [{day, date, theme, activities:[{time,activity,location,description,estimatedCost,duration,category,tips}], totalDayCost}], packingList, travelTips, culturalNotes, emergencyContacts }
Strip backtick code blocks from response before JSON.parse().
Include fallback: try jsonMatch = text.match(/\{[\s\S]*\}/) if first parse fails.

### src/app/api/generate-itinerary/route.ts

POST endpoint. Parse TripPreferences from request.json(). Call generateItinerary() from lib/gemini. Return NextResponse.json(itinerary). Return 400 if missing required fields, 500 on error.

### src/app/api/weather/route.ts

GET endpoint. Read ?city= param. Fetch OpenWeather current weather + 5-day forecast (both with units=metric). Filter forecast to items at 12:00:00, take 5 days. Return: { temp, feels_like, description, humidity, wind_speed, icon, forecast:[{date, temp_min, temp_max, description, icon}] }

### src/app/api/search/route.ts

GET endpoint with ?type=flights|hotels&destination=&budget=&origin=&accommodation= params.

Flights: Generate 4 simulated flight objects (IndiGo/Air India/Emirates/SpiceJet). Vary departure times by 3h each (06:00, 09:00, 12:00, 15:00). Price = budget * 0.06 to 0.09. First 2 are non-stop, last 2 have 1 stop. Return array.

Hotels: Generate 4 simulated hotel objects (5★/4★/3★/2★). Prices = budget * (0.05/0.035/0.02/0.008). Include amenities array by star rating. Return array.

---

## Phase 3: Components

### globals.css Design System

Dark theme tokens in :root:
- --bg-primary: #070b14
- --bg-secondary: #0d1526
- --bg-card: rgba(255,255,255,0.04)
- --border: rgba(255,255,255,0.08)
- --text-primary: #f0f4ff
- --text-secondary: #8892a4
- --text-muted: #4a5568
- --accent-blue: #63b3ed
- --accent-purple: #9f7aea
- --accent-teal: #4fd1c7
- --accent-orange: #f6ad55
- --accent-pink: #f687b3
- --accent-green: #68d391
- --gradient-btn: linear-gradient(135deg, #63b3ed, #9f7aea)
- --radius: 16px; --radius-sm: 8px

Import Google Fonts Inter + Outfit via @import at top of globals.css.

Utility classes needed: .glass (backdrop-filter blur 20px + bg-card + border), .gradient-text (bg-clip text), .btn-primary (gradient bg, hover translateY -2px), .btn-secondary (transparent border), .input (dark bg, blue focus glow), .select (same as input + custom arrow), .label (small uppercase), .tag + .tag.active (pill chips), .spinner (rotating border animation), .skeleton (shimmer animation)

Animations: fadeInUp, float, pulse-glow, shimmer, spin (keyframes)

### TripForm.tsx

Props: { onSubmit: (TripPreferences) => void; loading: boolean }
All state in useState<TripPreferences> initialized with sensible defaults.

Layout in 5 sections using CSS Modules:
1. Row (3-col): Origin → plane icon → Destination
2. Row (3-col): Start Date | End Date | Travelers counter (+/- buttons)
3. Row (3-col): Budget (currency select + amount input) | Accommodation select | Transport select  
4. Travel Style: 5-card grid — each card shows emoji + label + short desc, one selectable at a time
5. Interests: 12 tag chips (multi-select via toggle in array)
6. Dietary: 6 tag chips (multi-select)
7. Submit button: full width, gradient, disabled+spinner when loading

Interest options: 🏛️History&Culture, 🏖️Beaches, 🏔️Mountains&Hiking, 🍜Food&Cuisine, 🎨Art&Museums, 🛍️Shopping, 🌿Nature&Wildlife, 🎭Nightlife, ⛩️Temples, 🚴AdventureSports, 📸Photography, 🎵Music&Festivals

### WeatherWidget.tsx

Props: { weather: WeatherData; destination: string }
Collapsed header: icon img (openweathermap icon URL) + big temp + description + city + stats row (feels_like, humidity, wind) + chevron toggle
Expanded: 5-day forecast grid with date/icon/max-min temps/description per day
Click header to toggle open/closed with useState.

### ItineraryView.tsx

Props: { itinerary: Itinerary }
Top glass banner: duration | total cost | destination
Tabs: Itinerary / Packing / Tips

Itinerary tab: DayCard components per day. Each DayCard:
- Header (always visible): day circle + date + theme + day cost + chevron
- Day 1 starts open
- Expanded: vertical timeline of activities
  - Left: colored dot (by category) + connecting line
  - Right: time chip + category badge + duration | activity name (bold) | location | description | tips box | cost per person

Category colors: sightseeing=blue, food=orange, transport=teal, accommodation=purple, experience=pink, shopping=green

Packing tab: Checkable list. Each item is a PackingItem component with local useState for checked state.

Tips tab: Travel tips list + Cultural notes list + Emergency contacts (name | number rows)

### BudgetTracker.tsx

Props: { totalBudget: number; currency: string; tripDays: number }
State: entries: BudgetEntry[] (use localStorage to persist)

Default categories with planned budgets:
- ✈️ Flights: 30% of total
- 🏨 Hotels: 25%
- 🍜 Food: 20%
- 🎭 Activities: 15%
- 🚌 Transport: 5%
- 🛍️ Shopping: 5%

Top: total spent vs budget progress bar + remaining amount (red if over)
Category cards: icon + name + progress bar (spent/planned %) + amounts text
Add expense form: category select + description + amount + day + Add button
Expense log table: date | day | category badge | description | amount | delete btn

---

## Phase 4: Pages

### src/app/page.tsx — Landing Hero

Structure:
1. Navbar: "TripCraft" gradient logo left + "Plan a Trip →" button right (links to /plan)
2. Hero section centered:
   - Eyebrow badge: "✨ AI-Powered Travel Planning"  
   - H1: "Plan Your Dream Trip" (gradient text) + "In Minutes" (white)
   - Subtitle paragraph
   - Two CTA buttons: "Start Planning →" (primary → /plan) + "See How It Works" (secondary)
3. Stats row: 3 glass cards — "10k+ Trips" / "50+ Destinations" / "Real-time Updates"
4. Features grid (2x3): 🤖AI Itinerary / 🌤️Live Weather / 💰Budget Tracker / ✈️Flights / 🏨Hotels / 🗺️Map
5. Background: 2-3 large blurred gradient orbs (position:absolute, blur:80-120px, opacity:0.1-0.15)

### src/app/plan/page.tsx — CORE PAGE (mark as 'use client')

State: step ('form'|'results'), loading, itinerary, weather, flights, hotels, preferences, error, activeResultTab ('itinerary'|'budget'|'flights'|'hotels'|'map'), loadingText

Loading text cycle (useEffect + setInterval 2500ms while loading):
['🤖 Asking Gemini AI...', '🌤️ Fetching weather...', '✈️ Searching flights...', '🏨 Finding hotels...', '🗺️ Building your itinerary...']

handleSubmit: Run ALL 4 fetches in Promise.all() simultaneously:
- POST /api/generate-itinerary with full preferences
- GET /api/weather?city=destination
- GET /api/search?type=flights&...
- GET /api/search?type=hotels&...
Then set all state. On error, setError and stay on form.

Form step: centered container with page header + TripForm component

Results step:
- Header bar: "← New Trip" button | destination + days + budget | WeatherWidget
- Tab bar: Itinerary | Budget | Flights | Hotels | Map
- Content area switches on activeResultTab

Loading overlay (when loading): full-screen semi-transparent backdrop, centered glass card with spinner + cycling loadingText + "Takes ~12 seconds" note

---

## Phase 5: FlightHotelCards + MapView

### FlightHotelCards.tsx

Props: { type: 'flights'|'hotels'; flights?: FlightOption[]; hotels?: HotelOption[] }

For flights:
- Sort by price ascending
- Each card: airline code badge + name | departure → arrival + duration + stops | price + Book button | class + amenities chips
- Cheapest gets green "Best Value" badge
- Non-stop flights get blue "Direct" badge

For hotels:
- Each card: star rating (★ icons) + name | rating + review count | location + distance | amenity chips | pricePerNight + Select button

### MapView.tsx

Embed Google Maps via iframe:
src = `https://www.google.com/maps/embed/v1/place?key=${NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(destination)}&zoom=12`
Apply CSS filter: `invert(90%) hue-rotate(180deg)` for dark mode map look.
Height: 500px, border-radius: 16px.

---

## Phase 6: Polish

next.config.ts — add remotePatterns for openweathermap.org images.

Run: npm run dev → http://localhost:3000

---

## Architecture Decisions

- Promise.all() for parallel API calls → 70% faster than sequential
- Server-side API routes → API keys never exposed to browser
- Simulated flights/hotels → no external API cost for hackathon
- CSS filter on Google Maps → free dark mode
- localStorage for budget → works offline
- Gemini 1.5 Pro → best structured JSON output

## Common Pitfalls

- Project folder name must be lowercase, no spaces → use ./travel-engine
- Gemini wraps JSON in backticks → strip before JSON.parse()
- Weather city not found → handle gracefully with null check
- Google Maps needs NEXT_PUBLIC_ prefix
- All interactive components need 'use client' at top
