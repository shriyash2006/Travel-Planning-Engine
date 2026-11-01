# 🚀 NEXTRIP.AI - Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables Setup**
Create `.env.local` or configure environment variables in your hosting platform:

```env
# Required API Keys
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here
```

**Note:** The app works with fallback data if API keys are not provided, ensuring demo resilience.

### 2. **Verify Build**
```bash
npm run build
```

Expected output:
- ✅ Compiled successfully
- ✅ All routes generated
- ✅ No TypeScript errors

---

## 🌐 Deployment Platforms

### **Option 1: Vercel (Recommended)**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `GEMINI_API_KEY`, `OPENWEATHER_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_KEY`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

**Vercel Benefits:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Perfect for Next.js

---

### **Option 2: Netlify**

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build & Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

3. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables in Netlify dashboard

---

### **Option 3: Docker (Self-Hosted)**

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine
   WORKDIR /app
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json
   COPY --from=builder /app/public ./public

   ENV NODE_ENV=production
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build & Run:**
   ```bash
   docker build -t nextrip-ai .
   docker run -p 3000:3000 \
     -e GEMINI_API_KEY=your_key \
     -e OPENWEATHER_API_KEY=your_key \
     -e NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key \
     nextrip-ai
   ```

---

### **Option 4: Railway**

1. **Connect GitHub repo to Railway**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

---

## 🔧 Production Optimizations

### **Already Implemented:**
- ✅ Static page generation for `/` and `/plan`
- ✅ API routes with ISR caching (1 hour revalidation)
- ✅ Image optimization via Next.js Image component
- ✅ Remote pattern configuration for external images
- ✅ CSS Modules for scoped styling
- ✅ Graceful API fallbacks for demo resilience
- ✅ TypeScript strict mode
- ✅ ESLint configuration

### **Performance Features:**
- Server-side rendering for dynamic content
- Parallel API calls with `Promise.all()`
- LocalStorage for budget persistence
- Lazy loading for images
- Optimized font loading via Google Fonts

---

## 🧪 Testing in Production

### **Test All Routes:**
```bash
# Homepage
curl https://your-domain.com/

# Plan page
curl https://your-domain.com/plan

# Weather API
curl "https://your-domain.com/api/weather?city=Bali"

# Search API
curl "https://your-domain.com/api/search?type=flights&origin=Delhi&destination=Bali&budget=50000&currency=INR"

# Itinerary API
curl -X POST https://your-domain.com/api/generate-itinerary \
  -H "Content-Type: application/json" \
  -d '{"destination":"Bali","origin":"Delhi","startDate":"2026-12-01","endDate":"2026-12-07","budget":50000,"currency":"INR","travelers":2,"travelStyle":"luxury","dietaryRestrictions":[],"interests":["Beaches"],"accommodation":"luxury","transportMode":"mix"}'
```

---

## 📊 Monitoring & Analytics

### **Recommended Tools:**
1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics 4**
3. **Sentry** for error tracking
4. **LogRocket** for session replay

### **Add Analytics:**
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔒 Security Best Practices

### **Implemented:**
- ✅ API keys stored in environment variables (not exposed to client)
- ✅ Server-side API routes (API keys never in browser)
- ✅ Input validation on API endpoints
- ✅ Error handling with graceful fallbacks

### **Additional Recommendations:**
1. **Rate Limiting:** Add rate limiting to API routes
2. **CORS:** Configure CORS if needed
3. **HTTPS:** Always use HTTPS in production
4. **Content Security Policy:** Add CSP headers

---

## 🐛 Troubleshooting

### **Issue: API keys not working**
**Solution:** 
- Ensure environment variables are set correctly
- Restart the dev server after changing `.env.local`
- In production, redeploy after adding env vars

### **Issue: Images not loading**
**Solution:**
- Check `next.config.ts` remote patterns
- Verify image URLs are accessible
- Check browser console for CORS errors

### **Issue: Build fails**
**Solution:**
- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all dependencies are installed

### **Issue: API routes return 500**
**Solution:**
- Check server logs for detailed errors
- Verify API keys are valid
- Test API endpoints locally first

---

## 📈 Performance Benchmarks

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Lighthouse Score: > 90

**Current Optimizations:**
- Static generation for instant page loads
- Image optimization with Next.js Image
- CSS Modules for minimal CSS bundle
- Lazy loading for below-the-fold content

---

## 🎉 Post-Deployment

### **Final Checklist:**
- [ ] All routes accessible
- [ ] API endpoints responding
- [ ] Images loading correctly
- [ ] Forms submitting properly
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

---

## 📞 Support

For issues or questions:
- **GitHub Issues:** [Create an issue](https://github.com/your-repo/issues)
- **Documentation:** See README.md
- **ML Bhopal Hackathon:** Contact organizers

---

**Built with ❤️ for ML Bhopal Hackathon**
**NEXTRIP.AI** - Smart Travel Planning with AI Precision
