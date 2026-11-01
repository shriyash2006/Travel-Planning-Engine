# ⚡ NEXTRIP.AI - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### **Step 1: Install Dependencies**
```bash
npm install
```

### **Step 2: Set Up Environment (Optional)**
Create `.env.local` file:
```env
GEMINI_API_KEY=your_key_here
OPENWEATHER_API_KEY=AIzaSyCAvZRHHJQhkHV5VR0w1GNlvQ3bwvMFzX0
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

**Note:** App works with fallback data if keys are missing!

### **Step 3: Run Development Server**
```bash
npm run dev
```

Open **http://localhost:3000** in your browser. Done! 🎉

---

## 📱 Using the Application

### **Planning a Trip:**

1. **Homepage** → Click "Get Started" or "Plan a Trip"

2. **Fill Trip Form:**
   - Origin & Destination cities
   - Travel dates
   - Number of travelers
   - Budget & currency
   - Travel style (Adventure, Relaxed, Cultural, Luxury, Backpacker)
   - Accommodation preference
   - Interests & dietary restrictions

3. **Generate Itinerary** → Click "Synthesize Trip Engine Now"

4. **Explore Results:**
   - **Itinerary Tab:** Day-by-day activities
   - **Budget Tab:** Expense tracking
   - **Flights Tab:** Flight options
   - **Hotels Tab:** Accommodation choices
   - **Map Tab:** Destination overview

5. **Interact:**
   - Expand/collapse days
   - Check off packing items
   - View travel tips
   - Track budget

---

## 🛠️ Available Commands

```bash
# Development
npm run dev        # Start dev server (http://localhost:3000)

# Production
npm run build      # Build for production
npm start          # Start production server

# Testing
./test-app.sh      # Run automated tests (requires server running)

# Linting
npm run lint       # Check code quality
```

---

## 📂 Key Files to Know

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── plan/page.tsx         # Trip planner (main app)
│   └── api/                  # Backend API routes
├── components/
│   ├── TripForm.tsx          # Trip preferences form
│   ├── ItineraryView.tsx     # Daily schedule viewer
│   ├── BudgetTracker.tsx     # Budget management
│   ├── FlightHotelCards.tsx  # Search results
│   └── WeatherWidget.tsx     # Weather display
└── lib/
    ├── types.ts              # TypeScript types
    └── gemini.ts             # AI integration
```

---

## 🔧 Troubleshooting

### **Port 3000 already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### **Build fails?**
```bash
# Clean and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### **API not working?**
- Check `.env.local` exists and has valid keys
- Restart dev server after changing environment variables
- App will use fallback data if APIs fail

---

## 🌐 API Endpoints

### **Generate Itinerary**
```bash
POST /api/generate-itinerary
Content-Type: application/json

{
  "destination": "Bali",
  "origin": "Delhi",
  "startDate": "2026-12-01",
  "endDate": "2026-12-05",
  "budget": 50000,
  "currency": "INR",
  "travelers": 2,
  "travelStyle": "luxury",
  "dietaryRestrictions": ["Vegetarian"],
  "interests": ["Beaches", "Culture"],
  "accommodation": "luxury",
  "transportMode": "mix"
}
```

### **Get Weather**
```bash
GET /api/weather?city=Bali
```

### **Search Flights**
```bash
GET /api/search?type=flights&origin=Delhi&destination=Bali&budget=50000&currency=INR
```

### **Search Hotels**
```bash
GET /api/search?type=hotels&destination=Bali&budget=50000&currency=INR
```

---

## 🎨 Customization

### **Change Brand Color**
Edit `src/app/globals.css`:
```css
:root {
  --brand-red: #EE4336;  /* Change this */
}
```

### **Update Branding**
Search and replace "NEXTRIP" across files to your brand name.

### **Add More Destinations**
Edit `src/app/page.tsx` in the destinations grid section.

---

## 📚 Documentation

- **README.md** - Project overview
- **DEPLOYMENT.md** - Deployment instructions
- **PRODUCTION-CHECKLIST.md** - Launch checklist
- **SKILL.md** - Technical implementation guide

---

## 🐛 Common Issues

### **Issue:** "Module not found"
**Solution:** Run `npm install`

### **Issue:** TypeScript errors
**Solution:** Check `tsconfig.json` and run `npm run build`

### **Issue:** Styles not loading
**Solution:** Clear `.next` folder: `rm -rf .next`

### **Issue:** Environment variables not working
**Solution:** 
1. Ensure `.env.local` exists in project root
2. Restart dev server
3. Check variable names match exactly

---

## 🎯 Testing Checklist

Quick manual test:
- [ ] Homepage loads
- [ ] Can navigate to /plan
- [ ] Form accepts input
- [ ] Itinerary generates (with or without API keys)
- [ ] Tabs switch correctly
- [ ] Budget tracker updates
- [ ] Flight/hotel cards display
- [ ] Map shows destination
- [ ] Weather widget populates
- [ ] Responsive on mobile

---

## 🚀 Deploy Now

### **Vercel (Easiest)**
```bash
npm i -g vercel
vercel
```

### **Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

See **DEPLOYMENT.md** for detailed instructions.

---

## 💡 Tips for Hackathon Demo

1. **Have fallback ready:** App works without API keys!
2. **Showcase AI:** Explain Gemini integration
3. **Highlight features:** Day-by-day planning, budget tracking, search
4. **Show responsiveness:** Demo on mobile and desktop
5. **Emphasize UX:** Smooth animations, intuitive design

---

## 🆘 Need Help?

1. Check documentation files in project root
2. Review code comments
3. Test with `./test-app.sh`
4. Check build output: `npm run build`
5. Inspect browser console for errors

---

## ✨ Features Overview

- 🤖 AI-powered itinerary generation
- 🌤️ Live weather forecasts
- ✈️ Flight search & comparison
- 🏨 Hotel recommendations
- 💰 Real-time budget tracking
- 🗺️ Interactive destination maps
- 📝 Packing checklists
- 💡 Travel tips & cultural notes
- 🚨 Emergency contacts
- 📱 Fully responsive design

---

## 🎉 You're All Set!

**NEXTRIP.AI** is ready to use. Start planning amazing trips!

```bash
npm run dev
```

Visit: **http://localhost:3000**

**Happy Traveling! ✈️**
