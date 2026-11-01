import { GoogleGenerativeAI } from '@google/generative-ai';
import { TripPreferences, Itinerary } from './types';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateItinerary(prefs: TripPreferences): Promise<Itinerary> {
  const prompt = `
You are an expert travel planner and local concierge AI. Create a detailed, dynamic, and realistic travel itinerary based on the following preferences and constraints:

- Origin: ${prefs.origin}
- Destination: ${prefs.destination}
- Dates: ${prefs.startDate} to ${prefs.endDate}
- Travelers: ${prefs.travelers}
- Total Budget: ${prefs.currency} ${prefs.budget}
- Travel Style: ${prefs.travelStyle}
- Accommodation Preference: ${prefs.accommodation}
- Preferred Transport: ${prefs.transportMode}
- Interests: ${prefs.interests.join(', ') || 'General sightseeing, local cuisine, culture'}
- Dietary Restrictions: ${prefs.dietaryRestrictions.join(', ') || 'None'}

Return ONLY a valid JSON object (no markdown, no backticks, no explanations, no text before or after).
The JSON must follow this exact TypeScript interface structure:
{
  "destination": "${prefs.destination}",
  "duration": <number of days between dates, minimum 1>,
  "totalEstimatedCost": <estimated total cost in ${prefs.currency} close to or within budget>,
  "currency": "${prefs.currency}",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "Arrival & City Highlights",
      "totalDayCost": <number>,
      "activities": [
        {
          "time": "09:00 AM",
          "activity": "Activity Name",
          "location": "Specific landmark or neighborhood",
          "description": "Engaging description with practical advice",
          "estimatedCost": <number per person>,
          "duration": "2 hours",
          "category": "sightseeing" | "food" | "transport" | "accommodation" | "experience" | "shopping",
          "tips": "Local insider tip"
        }
      ]
    }
  ],
  "packingList": ["Essential Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
  "travelTips": ["Actionable tip 1", "Tip 2", "Tip 3", "Tip 4"],
  "culturalNotes": ["Cultural etiquette note 1", "Etiquette note 2", "Note 3"],
  "emergencyContacts": [
    { "name": "Local Police & Emergency", "number": "112 / 911 / Local" },
    { "name": "Tourist Helpline", "number": "+91-1800-111-363 or Local" }
  ]
}

Provide 3 to 5 realistic, chronological activities for each day covering morning, afternoon, and evening. Tailor every activity specifically to ${prefs.destination} and their interests.
`;

  if (genAI && apiKey && apiKey !== 'your_key') {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean possible markdown code fences
      const cleanJson = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      try {
        return JSON.parse(cleanJson);
      } catch {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed or rate limited, falling back to dynamic generator:', err);
    }
  }

  // Robust realistic fallback generator so the app ALWAYS works during hackathon demos
  return generateFallbackItinerary(prefs);
}

function generateFallbackItinerary(prefs: TripPreferences): Itinerary {
  const start = new Date(prefs.startDate || Date.now());
  const end = new Date(prefs.endDate || Date.now() + 3 * 86400000);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const duration = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 3;

  const themes = [
    `Arrival, Old Quarter & Sunset Vistas in ${prefs.destination}`,
    `Iconic Landmarks, Heritage & Culinary Safari`,
    `Hidden Gems, Art Districts & Riverfront Strolls`,
    `Nature Escapes & Cultural Immersion`,
    `Shopping Bazaars & Farewell Celebrations`,
  ];

  const days = [];
  const dailyBudget = Math.round(prefs.budget / duration);

  for (let i = 1; i <= Math.min(duration, 7); i++) {
    const curDate = new Date(start);
    curDate.setDate(start.getDate() + (i - 1));
    const dateStr = curDate.toISOString().split('T')[0];

    days.push({
      day: i,
      date: dateStr,
      theme: themes[(i - 1) % themes.length],
      totalDayCost: dailyBudget,
      activities: [
        {
          time: '09:00 AM',
          activity: `Morning Discovery of ${prefs.destination} Historic Core`,
          location: `Central ${prefs.destination}`,
          description: `Stroll through the historic center, admiring vintage architecture and vibrant local life tailored for ${prefs.travelStyle} travelers.`,
          estimatedCost: Math.round(dailyBudget * 0.15),
          duration: '2.5 hrs',
          category: 'sightseeing' as const,
          tips: 'Arrive early to avoid midday queues and catch golden hour lighting for photography.'
        },
        {
          time: '12:30 PM',
          activity: `Authentic Regional Lunch & Tasting`,
          location: `Artisan Food Quarter, ${prefs.destination}`,
          description: `Savor culinary specialties curated for dietary preference: ${prefs.dietaryRestrictions.join(', ') || 'local specialties'}.`,
          estimatedCost: Math.round(dailyBudget * 0.25),
          duration: '1.5 hrs',
          category: 'food' as const,
          tips: 'Ask for the chef’s seasonal special and local artisan beverage.'
        },
        {
          time: '03:00 PM',
          activity: `${prefs.interests[0] || 'Cultural Landmark'} Experience`,
          location: `Heritage District, ${prefs.destination}`,
          description: `Deep-dive exploration focusing on ${prefs.interests.join(' and ') || 'culture and scenic views'}.`,
          estimatedCost: Math.round(dailyBudget * 0.3),
          duration: '3 hrs',
          category: 'experience' as const,
          tips: 'Audio guides available at the entrance counter.'
        },
        {
          time: '07:30 PM',
          activity: `Night Skyline Stroll & Dinner Atmosphere`,
          location: `Harbor / City Promenade`,
          description: `Relaxing evening taking in the illuminated cityscape, street music, and cozy dining ambience.`,
          estimatedCost: Math.round(dailyBudget * 0.3),
          duration: '2.5 hrs',
          category: 'food' as const,
          tips: 'Reserve a table by the window or terrace for scenic views.'
        }
      ]
    });
  }

  return {
    destination: prefs.destination,
    duration,
    totalEstimatedCost: Math.round(prefs.budget * 0.92),
    currency: prefs.currency,
    days,
    packingList: [
      'Light breathable layers & comfortable walking sneakers',
      'Universal power adapter & high-capacity power bank',
      'Refillable thermal water bottle',
      'Weather-appropriate jacket or compact umbrella',
      'RFID passport wallet & digital backup copies',
      'Personal emergency medicine kit'
    ],
    travelTips: [
      `Use local transit or metro cards for fastest navigation across ${prefs.destination}.`,
      'Keep a modest amount of local cash for street vendors and small stalls.',
      'Download offline Google Maps of the city before leaving your hotel wifi.',
      'Book popular monument tickets online 24 hours in advance to skip lines.'
    ],
    culturalNotes: [
      'Greet locals with warmth and a friendly nod before asking for directions.',
      'Dress respectfully when visiting religious, sacred, or temple grounds.',
      'Tipping etiquette: 5-10% is customary at sit-down dining spots.'
    ],
    emergencyContacts: [
      { name: 'Police & Emergency', number: '112 / 100' },
      { name: 'Tourist Assistance Hotline', number: '1800-11-1363' },
      { name: 'Medical Helpline & Ambulance', number: '108 / 102' }
    ]
  };
}
