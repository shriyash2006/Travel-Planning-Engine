import { NextResponse } from 'next/server';
import { FlightOption, HotelOption } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const destination = searchParams.get('destination') || 'Destination';
  const origin = searchParams.get('origin') || 'Origin';
  const budget = parseFloat(searchParams.get('budget') || '50000');
  const currency = searchParams.get('currency') || 'INR';

  if (type === 'flights') {
    const flightMultiplier = budget > 100000 ? 0.08 : 0.12;
    const basePrice = Math.max(3000, Math.round(budget * flightMultiplier));

    const flights: FlightOption[] = [
      {
        id: 'fl-1',
        airline: 'IndiGo Airlines',
        logo: '✈️',
        departure: '06:30 AM',
        arrival: '08:45 AM',
        duration: '2h 15m',
        stops: 0,
        price: basePrice,
        currency,
        class: 'Economy Standard',
        amenities: ['Hand Baggage 7kg', 'Cabin Snacks', 'Free Web Check-in'],
      },
      {
        id: 'fl-2',
        airline: 'Air India',
        logo: '🛩️',
        departure: '09:45 AM',
        arrival: '12:10 PM',
        duration: '2h 25m',
        stops: 0,
        price: Math.round(basePrice * 1.15),
        currency,
        class: 'Economy Premium',
        amenities: ['Checked Baggage 15kg', 'Complimentary Meal', 'Priority Boarding'],
      },
      {
        id: 'fl-3',
        airline: 'Vistara / Tata',
        logo: '🛫',
        departure: '01:15 PM',
        arrival: '03:35 PM',
        duration: '2h 20m',
        stops: 0,
        price: Math.round(basePrice * 1.28),
        currency,
        class: 'Premium Economy',
        amenities: ['Spacious Legroom', 'Gourmet Dining', 'Wi-Fi Streaming'],
      },
      {
        id: 'fl-4',
        airline: 'Akasa Air Express',
        logo: '✈️',
        departure: '05:30 PM',
        arrival: '09:10 PM',
        duration: '3h 40m',
        stops: 1,
        price: Math.round(basePrice * 0.88),
        currency,
        class: 'Saver Economy',
        amenities: ['USB Fast Charging', 'Eco-friendly Fleet', 'Digital Boarding'],
      },
    ];

    return NextResponse.json(flights);
  }

  if (type === 'hotels') {
    const hotelMultiplier = 0.04;
    const baseNightPrice = Math.max(1500, Math.round(budget * hotelMultiplier));

    const hotels: HotelOption[] = [
      {
        id: 'ht-1',
        name: `The Grand Palace & Spa, ${destination}`,
        stars: 5,
        rating: 4.9,
        reviews: 1420,
        pricePerNight: Math.round(baseNightPrice * 2.2),
        currency,
        amenities: ['Infinity Rooftop Pool', 'Luxury Spa', 'Panoramic City Views', 'Buffet Breakfast', 'Valet Parking'],
        location: `Central Boulevard, ${destination}`,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
        distance: '0.4 km from City Center',
      },
      {
        id: 'ht-2',
        name: `The Heritage Boutique Suites`,
        stars: 4,
        rating: 4.7,
        reviews: 980,
        pricePerNight: Math.round(baseNightPrice * 1.4),
        currency,
        amenities: ['Artisan Coffee Bar', 'High-Speed Wi-Fi', 'Courtyard Garden', 'Modern Fitness Hub'],
        location: `Historic Arts Quarter, ${destination}`,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
        distance: '1.2 km from City Center',
      },
      {
        id: 'ht-3',
        name: `Urban Oasis Boutique Stay`,
        stars: 3,
        rating: 4.5,
        reviews: 640,
        pricePerNight: baseNightPrice,
        currency,
        amenities: ['Complimentary Breakfast', 'Co-working Lounge', '24/7 Front Desk', 'Bicycle Rental'],
        location: `Riverside Promenade, ${destination}`,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=80',
        distance: '2.1 km from City Center',
      },
      {
        id: 'ht-4',
        name: `Nomad Backpacker Pods & Social Club`,
        stars: 2,
        rating: 4.3,
        reviews: 1120,
        pricePerNight: Math.round(baseNightPrice * 0.45),
        currency,
        amenities: ['Privacy Pods', 'Community Kitchen', 'Rooftop Cinema', 'Weekly Pub Crawl'],
        location: `Culture & Cafe District, ${destination}`,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80',
        distance: '0.8 km from Metro Station',
      },
    ];

    return NextResponse.json(hotels);
  }

  return NextResponse.json({ error: 'Invalid search type' }, { status: 400 });
}
