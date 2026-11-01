// Supabase Database Types for NEXTRIP.AI

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
  itinerary_data: any; // JSON field - stores complete Itinerary object
  is_public: boolean;
  share_token: string | null;
  created_at: string;
  updated_at: string;
}

export interface BudgetEntryDB {
  id: string;
  itinerary_id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  day: number;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  itinerary_id: string;
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

// Helper types for inserts (without generated fields)
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;
export type ItineraryInsert = Omit<SavedItinerary, 'id' | 'created_at' | 'updated_at' | 'share_token'>;
export type BudgetEntryInsert = Omit<BudgetEntryDB, 'id' | 'created_at'>;
export type FavoriteInsert = Omit<Favorite, 'id' | 'created_at'>;
export type TravelPreferencesInsert = Omit<TravelPreferences, 'updated_at'>;
