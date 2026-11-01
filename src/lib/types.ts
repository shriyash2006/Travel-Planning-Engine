export interface TripPreferences {
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  travelers: number;
  travelStyle: 'adventure' | 'relaxed' | 'cultural' | 'luxury' | 'backpacker';
  dietaryRestrictions: string[];
  interests: string[];
  accommodation: 'hostel' | 'budget_hotel' | 'mid_range' | 'luxury' | 'airbnb';
  transportMode: 'public' | 'rental' | 'taxi' | 'mix';
}

export interface DayActivity {
  time: string;
  activity: string;
  location: string;
  description: string;
  estimatedCost: number;
  duration: string;
  category: 'sightseeing' | 'food' | 'transport' | 'accommodation' | 'experience' | 'shopping';
  tips?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: DayActivity[];
  totalDayCost: number;
  weather?: WeatherData;
}

export interface Itinerary {
  destination: string;
  duration: number;
  totalEstimatedCost: number;
  currency: string;
  days: DayPlan[];
  packingList: string[];
  travelTips: string[];
  culturalNotes: string[];
  emergencyContacts: { name: string; number: string }[];
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  logo: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  class: string;
  amenities: string[];
}

export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  location: string;
  image: string;
  distance: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  planned: number;
  spent: number;
  color: string;
}

export interface BudgetEntry {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  day: number;
}
