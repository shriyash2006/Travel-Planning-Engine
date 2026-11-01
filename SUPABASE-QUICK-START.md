# ⚡ Supabase Setup - Quick Start (15 Minutes)

## 🎯 What You'll Get

After this setup, your NEXTRIP.AI will have:
- ✅ User authentication (email, Google, GitHub)
- ✅ Database for saving itineraries
- ✅ Budget tracking with persistence
- ✅ User profiles and preferences
- ✅ Share itineraries with links
- ✅ Public/private trip settings

---

## 📋 Step 1: Create Supabase Account (2 min)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with **GitHub** (fastest) or Google/Email
4. Verify email if needed

---

## 📋 Step 2: Create Project (3 min)

1. Click **"New Project"**
2. Fill in:
   ```
   Name: nextrip-ai
   Database Password: [Choose strong password - SAVE IT!]
   Region: ap-south-1 (India) or closest to you
   Plan: Free
   ```
3. Click **"Create new project"**
4. ⏳ Wait 2-3 minutes for initialization

---

## 📋 Step 3: Get Your API Keys (1 min)

1. In Supabase dashboard, go to:
   **Settings** (⚙️) → **API**

2. Copy these 3 values:
   ```
   📌 Project URL: https://xxxxxxxxxxxxx.supabase.co
   📌 anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   📌 service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save them somewhere safe!

---

## 📋 Step 4: Create Database Tables (3 min)

1. In Supabase dashboard, go to:
   **SQL Editor** → **New Query**

2. Copy the ENTIRE SQL script from **Part 2** of `SUPABASE-SETUP.md`
   (It's about 300 lines - copy all of it!)

3. Paste into the SQL editor

4. Click **"RUN"** button

5. ✅ You should see: **"Success. No rows returned"**

6. Verify: Go to **Table Editor**, you should see 5 tables:
   - profiles
   - itineraries  
   - budget_entries
   - favorites
   - travel_preferences

---

## 📋 Step 5: Add Keys to Your App (2 min)

1. Open `.env.local` in your project:
   ```bash
   cd "/Users/shriyashsahu/Downloads/ML Bhopal/travel-engine"
   code .env.local  # or open in your editor
   ```

2. Add these lines (use YOUR actual keys from Step 3):
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

---

## 📋 Step 6: Restart Dev Server (1 min)

```bash
# Stop current server (Ctrl+C if running)
# Then start again:
npm run dev
```

---

## 📋 Step 7: Test Connection (1 min)

### Option A: Browser
Open: **http://localhost:3000/api/test-supabase**

### Option B: Command Line
```bash
curl http://localhost:3000/api/test-supabase
```

### ✅ Expected Result:
```json
{
  "success": true,
  "message": "Supabase connection successful! ✅",
  "configured": true,
  "timestamp": "2026-11-01T..."
}
```

### ❌ If you see an error:
1. Check `.env.local` has correct keys
2. Make sure SQL script ran successfully
3. Restart dev server
4. Try again

---

## 🎉 You're Done!

Supabase is now connected to your app! 

### What's Next?

You can now:
1. **Save Itineraries** - Store trips in database
2. **Add Authentication** - Let users sign up/login
3. **User Profiles** - Remember user preferences
4. **Share Trips** - Generate shareable links

---

## 📚 Files Created

The setup created these files:
```
src/lib/
├── supabase.ts           - Client for browser code
├── supabase-server.ts    - Client for API routes
└── database.types.ts     - TypeScript types

src/app/api/test-supabase/
└── route.ts              - Connection test endpoint
```

---

## 🔍 Verify Everything Works

Quick checklist:
- [ ] Supabase project created
- [ ] 5 tables visible in Table Editor
- [ ] API keys added to `.env.local`
- [ ] Dev server restarted
- [ ] Test endpoint returns `success: true`

---

## 🚨 Common Issues

### "Connection refused"
```bash
# Fix: Check your URL and keys in .env.local
# Make sure no extra spaces
# Restart: npm run dev
```

### "Table does not exist"
```bash
# Fix: Run the SQL script again in Supabase SQL Editor
# Make sure all 300 lines executed
```

### "Invalid API key"
```bash
# Fix: Double-check you copied the ANON key, not service_role
# For NEXT_PUBLIC_SUPABASE_ANON_KEY, use the "anon public" key
# For SUPABASE_SERVICE_ROLE_KEY, use the "service_role" key
```

---

## 💡 Pro Tips

1. **Keep service_role key secret!** Never expose it to client code
2. **Bookmark your Supabase dashboard** for quick access
3. **Use Table Editor** to view/edit data easily
4. **Check SQL logs** if queries fail
5. **Test with curl** for quick debugging

---

## 🔗 Useful Links

Once set up, bookmark these:
- **Dashboard:** https://app.supabase.com
- **Your Project:** https://app.supabase.com/project/[YOUR_PROJECT_ID]
- **Table Editor:** /project/[YOUR_PROJECT_ID]/editor
- **SQL Editor:** /project/[YOUR_PROJECT_ID]/sql
- **API Docs:** /project/[YOUR_PROJECT_ID]/api
- **Auth Users:** /project/[YOUR_PROJECT_ID]/auth/users

---

## 🎯 Next Feature to Build

**Easiest:** Save itineraries to database
**Medium:** Add user authentication  
**Advanced:** Enable real-time collaboration

See full documentation in `SUPABASE-SETUP.md`

---

## ✅ Success Criteria

You'll know setup is successful when:
1. ✅ Test endpoint returns `success: true`
2. ✅ No errors in console
3. ✅ Tables visible in Supabase dashboard
4. ✅ Ready to start building backend features!

**Congratulations! Your backend is ready! 🚀**
