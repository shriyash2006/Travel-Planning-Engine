# 🗄️ Supabase Backend Setup for NEXTRIP.AI

## 📋 Complete Step-by-Step Guide

---

## **Part 1: Supabase Project Setup**

### **Step 1: Create Supabase Account**

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub, Google, or Email
4. Verify your email if needed

### **Step 2: Create New Project**

1. Click **"New Project"**
2. Fill in project details:
   - **Name:** `nextrip-ai` (or your choice)
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Select closest to your users (e.g., `ap-south-1` for India)
   - **Pricing Plan:** Free (sufficient for hackathon)
3. Click **"Create new project"**
4. Wait 2-3 minutes for project initialization

### **Step 3: Get API Keys**

1. Go to **Settings** → **API**
2. Copy these values (you'll need them):
   - ✅ **Project URL:** `https://xxxxx.supabase.co`
   - ✅ **anon/public key:** `eyJhbGc...` (long string)
   - ✅ **service_role key:** `eyJhbGc...` (keep secret!)

---

## **Part 2: Database Schema Setup**

### **Step 4: Create Tables**

Go to **SQL Editor** → Click **"New Query"** and run this:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Saved Itineraries table
CREATE TABLE public.itineraries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  origin TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  travelers INTEGER NOT NULL DEFAULT 1,
  budget DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  travel_style TEXT,
  itinerary_data JSONB NOT NULL, -- Stores full itinerary JSON
  is_public BOOLEAN DEFAULT FALSE,
  share_token TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Budget Entries table
CREATE TABLE public.budget_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  day INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Favorites/Bookmarks table
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  itinerary_id UUID REFERENCES public.itineraries(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, itinerary_id)
);

-- Travel Preferences table (for personalization)
CREATE TABLE public.travel_preferences (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  default_currency TEXT DEFAULT 'USD',
  default_travel_style TEXT,
  dietary_restrictions TEXT[],
  interests TEXT[],
  preferred_accommodation TEXT,
  preferred_transport TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for better performance
CREATE INDEX itineraries_user_id_idx ON public.itineraries(user_id);
CREATE INDEX itineraries_created_at_idx ON public.itineraries(created_at DESC);
CREATE INDEX budget_entries_itinerary_id_idx ON public.budget_entries(itinerary_id);
CREATE INDEX favorites_user_id_idx ON public.favorites(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for itineraries
CREATE POLICY "Users can view their own itineraries"
  ON public.itineraries FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own itineraries"
  ON public.itineraries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own itineraries"
  ON public.itineraries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own itineraries"
  ON public.itineraries FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for budget_entries
CREATE POLICY "Users can view budget entries for their itineraries"
  ON public.budget_entries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE itineraries.id = budget_entries.itinerary_id
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create budget entries for their itineraries"
  ON public.budget_entries FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE itineraries.id = budget_entries.itinerary_id
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their budget entries"
  ON public.budget_entries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE itineraries.id = budget_entries.itinerary_id
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their budget entries"
  ON public.budget_entries FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries
      WHERE itineraries.id = budget_entries.itinerary_id
      AND itineraries.user_id = auth.uid()
    )
  );

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for travel_preferences
CREATE POLICY "Users can view their own preferences"
  ON public.travel_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.travel_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.travel_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON public.itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travel_preferences_updated_at BEFORE UPDATE ON public.travel_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

Click **"RUN"** to execute the SQL.

✅ **Success!** Your database schema is ready.

---

## **Part 3: Configure Authentication**

### **Step 5: Enable Auth Providers**

1. Go to **Authentication** → **Providers**
2. Enable providers you want:
   - ✅ **Email** (already enabled)
   - ✅ **Google** (recommended)
   - ✅ **GitHub** (optional)

#### **For Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Copy **Client ID** and **Client Secret**
6. In Supabase, paste them in Google provider settings
7. Add redirect URL: `https://xxxxx.supabase.co/auth/v1/callback`

### **Step 6: Configure Email Templates**

1. Go to **Authentication** → **Email Templates**
2. Customize templates (optional):
   - Confirmation email
   - Magic link email
   - Password reset email

---

## **Part 4: Install Supabase in Your App**

### **Step 7: Install Supabase Client**

```bash
cd "/Users/shriyashsahu/Downloads/ML Bhopal/travel-engine"
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### **Step 8: Update Environment Variables**

Add to `.env.local`:
```env
# Existing keys
GEMINI_API_KEY=your_key
OPENWEATHER_API_KEY=AIzaSyCAvZRHHJQhkHV5VR0w1GNlvQ3bwvMFzX0
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key

# NEW: Supabase keys
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key
```

Update `.env.example` too:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## **Part 5: Create Supabase Client**

### **Step 9: Create Supabase Utilities**

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Create `src/lib/supabase-server.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with elevated privileges
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
```

---

## **Part 6: Add Database Types**

### **Step 10: Generate TypeScript Types**

In Supabase dashboard:
1. Go to **Settings** → **API**
2. Scroll to **Schema Visualization**
3. Click **"Generate Types"**
4. Copy the TypeScript types

Create `src/lib/database.types.ts` and paste the generated types.

Or manually add:
```typescript
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedItinerary {
  id: string;
  user_id: string;
  title: string;
  destination: string;
  origin: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget: number;
  currency: string;
  travel_style: string | null;
  itinerary_data: any; // Your Itinerary type
  is_public: boolean;
  share_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface BudgetEntry {
  id: string;
  itinerary_id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  day: number;
  created_at: string;
}

export interface TravelPreferences {
  user_id: string;
  default_currency: string;
  default_travel_style: string | null;
  dietary_restrictions: string[];
  interests: string[];
  preferred_accommodation: string | null;
  preferred_transport: string | null;
  updated_at: string;
}
```

---

## **Part 7: Test Connection**

### **Step 11: Create Test API Route**

Create `src/app/api/test-supabase/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful!',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
```

### **Step 12: Test the Connection**

```bash
# Start dev server
npm run dev

# Test in browser or curl
curl http://localhost:3000/api/test-supabase
```

Expected response:
```json
{
  "success": true,
  "message": "Supabase connection successful!",
  "timestamp": "2026-11-01T..."
}
```

✅ **If you see this, Supabase is connected!**

---

## **Part 8: Verify Setup**

### **Checklist:**
- [ ] Supabase project created
- [ ] API keys copied to `.env.local`
- [ ] Database tables created (run SQL)
- [ ] Row Level Security enabled
- [ ] Auth providers configured
- [ ] `@supabase/supabase-js` installed
- [ ] Supabase client files created
- [ ] Test API route working
- [ ] Connection test passes

---

## **Next Steps:**

Now that Supabase is set up, you can:
1. Add user authentication (see `AUTH-INTEGRATION.md`)
2. Save itineraries to database
3. Implement user profiles
4. Add sharing features
5. Enable social features

---

## **Useful Supabase URLs:**

- **Dashboard:** https://app.supabase.com/project/YOUR_PROJECT_ID
- **Table Editor:** https://app.supabase.com/project/YOUR_PROJECT_ID/editor
- **SQL Editor:** https://app.supabase.com/project/YOUR_PROJECT_ID/sql
- **API Docs:** https://app.supabase.com/project/YOUR_PROJECT_ID/api
- **Auth:** https://app.supabase.com/project/YOUR_PROJECT_ID/auth/users

---

## **Common Issues & Solutions:**

### **Issue:** "Connection refused"
**Solution:** Check if Supabase URL and keys are correct in `.env.local`

### **Issue:** "Row Level Security" errors
**Solution:** Ensure RLS policies are created (run the SQL again)

### **Issue:** "Invalid API key"
**Solution:** 
- Check for extra spaces in `.env.local`
- Ensure you're using `anon` key for client, not `service_role`
- Restart dev server after changing env vars

### **Issue:** Tables not showing up
**Solution:** 
- Go to Table Editor to verify tables exist
- Check SQL execution didn't have errors
- Try refreshing the dashboard

---

## **🎉 Congratulations!**

Your Supabase backend is now set up and ready to use with NEXTRIP.AI!

**Ready for:** Authentication, Database Storage, Real-time subscriptions, File storage

See `AUTH-INTEGRATION.md` (to be created) for adding authentication to your app.
