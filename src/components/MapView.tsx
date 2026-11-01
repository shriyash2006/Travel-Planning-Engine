'use client';

import React from 'react';

interface MapViewProps {
  destination: string;
}

export default function MapView({ destination }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  
  // Use official embed API if key is present, otherwise use Google Maps embed URL
  const mapSrc = apiKey && apiKey !== 'your_key'
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
        destination
      )}&zoom=12`
    : `https://maps.google.com/maps?q=${encodeURIComponent(
        destination
      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="glass" style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>🗺️ Destination Map Explorer</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Live geospatial orientation, route hotspots, and local topography in {destination}
          </p>
        </div>
        <span className="badge badge-teal" style={{ background: 'rgba(45, 212, 191, 0.1)', color: 'var(--accent-teal)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
          📍 Live GPS Pin
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 520,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        <iframe
          title={`Map of ${destination}`}
          src={mapSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
          }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
