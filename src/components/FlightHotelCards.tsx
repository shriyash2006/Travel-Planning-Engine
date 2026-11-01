'use client';

import React, { useState } from 'react';
import { FlightOption, HotelOption } from '@/lib/types';
import styles from './FlightHotelCards.module.css';

interface FlightHotelCardsProps {
  type: 'flights' | 'hotels';
  flights?: FlightOption[];
  hotels?: HotelOption[];
}

export default function FlightHotelCards({ type, flights, hotels }: FlightHotelCardsProps) {
  const [bookedId, setBookedId] = useState<string | null>(null);

  const handleBooking = (id: string, name: string) => {
    setBookedId(id);
    setTimeout(() => {
      alert(`🎉 Simulated reservation confirmed for: ${name}!`);
    }, 200);
  };

  if (type === 'flights') {
    const sortedFlights = [...(flights || [])].sort((a, b) => a.price - b.price);

    return (
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>✈️ Available Flight Connections</h3>
          <span className="badge badge-blue">Real-time Rates</span>
        </div>

        {sortedFlights.map((flight, index) => {
          const isCheapest = index === 0;
          const isDirect = flight.stops === 0;
          const isBooked = bookedId === flight.id;

          return (
            <div key={flight.id} className={`glass ${styles.card}`}>
              {isCheapest && (
                <div className={`${styles.highlightBadge} badge badge-green`}>
                  Best Value Deal
                </div>
              )}

              <div className={styles.flightMain}>
                <div className={styles.airlineInfo}>
                  <div className={styles.airlineLogo}>{flight.logo}</div>
                  <div>
                    <div className={styles.airlineName}>{flight.airline}</div>
                    <div className={styles.flightClass}>{flight.class}</div>
                  </div>
                </div>

                <div className={styles.timeSegment}>
                  <div className={styles.timeCol}>
                    <span className={styles.timeValue}>{flight.departure}</span>
                    <span className={styles.timeCity}>Departure</span>
                  </div>

                  <div className={styles.flightRoute}>
                    <span className={styles.routeDuration}>{flight.duration}</span>
                    <div className={styles.routeLine} />
                    <span
                      className="badge"
                      style={{
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        background: isDirect ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                        color: isDirect ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      }}
                    >
                      {isDirect ? 'Direct' : `${flight.stops} Stop`}
                    </span>
                  </div>

                  <div className={styles.timeCol}>
                    <span className={styles.timeValue}>{flight.arrival}</span>
                    <span className={styles.timeCity}>Arrival</span>
                  </div>
                </div>

                <div className={styles.amenitiesRow}>
                  {flight.amenities.map((am, aIdx) => (
                    <span key={aIdx} className={styles.amenityChip}>
                      ✓ {am}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.actionCol}>
                <div className={styles.priceValue}>
                  {flight.currency} {flight.price.toLocaleString()}
                </div>
                <div className={styles.priceSub}>per traveler</div>
                <button
                  onClick={() => handleBooking(flight.id, `${flight.airline} (${flight.departure})`)}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  {isBooked ? '✓ Reserved' : 'Select Flight'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Hotels View
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>🏨 Recommended Stays & Resorts</h3>
        <span className="badge badge-purple">Verified Accommodations</span>
      </div>

      {hotels?.map((hotel) => {
        const isBooked = bookedId === hotel.id;

        return (
          <div key={hotel.id} className={`glass ${styles.card}`}>
            <div className={styles.hotelMain}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className={styles.hotelImage}
              />

              <div className={styles.hotelInfo}>
                <div className={styles.hotelStars}>
                  {'★'.repeat(hotel.stars)}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginLeft: 8 }}>
                    {hotel.rating} / 5.0 ({hotel.reviews} reviews)
                  </span>
                </div>

                <div className={styles.hotelName}>{hotel.name}</div>
                <div className={styles.hotelLocation}>
                  📍 {hotel.location} · <span style={{ color: 'var(--accent-teal)' }}>{hotel.distance}</span>
                </div>

                <div className={styles.amenitiesRow}>
                  {hotel.amenities.map((am, aIdx) => (
                    <span key={aIdx} className={styles.amenityChip}>
                      ✦ {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.actionCol}>
              <div className={styles.priceValue}>
                {hotel.currency} {hotel.pricePerNight.toLocaleString()}
              </div>
              <div className={styles.priceSub}>per night (incl. taxes)</div>
              <button
                onClick={() => handleBooking(hotel.id, hotel.name)}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {isBooked ? '✓ Reserved' : 'Reserve Stay'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
