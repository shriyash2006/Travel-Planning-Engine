import { NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/gemini';
import { TripPreferences } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body: TripPreferences = await req.json();

    if (!body || !body.destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(body);
    return NextResponse.json(itinerary);
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
