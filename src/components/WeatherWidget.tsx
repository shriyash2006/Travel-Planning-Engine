'use client';

import React, { useState } from 'react';
import { WeatherData } from '@/lib/types';
import styles from './WeatherWidget.module.css';

interface WeatherWidgetProps {
  weather: WeatherData;
  destination: string;
}

export default function WeatherWidget({ weather, destination }: WeatherWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!weather) return null;

  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : 'https://openweathermap.org/img/wn/02d@2x.png';

  const formatDayName = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`glass ${styles.widget}`}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      title="Click to view 5-day weather forecast"
    >
      <div className={styles.header}>
        <div className={styles.leftInfo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconUrl} alt={weather.description} className={styles.weatherIcon} />
          <div>
            <div className={styles.cityTag}>{destination} Weather</div>
            <div className={styles.temp}>{weather.temp}°C</div>
            <div className={styles.desc}>{weather.description}</div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span>Feels</span>
            <span className={styles.statVal}>{weather.feels_like}°</span>
          </div>
          <div className={styles.statItem}>
            <span>Humidity</span>
            <span className={styles.statVal}>{weather.humidity}%</span>
          </div>
          <div className={styles.statItem}>
            <span>Wind</span>
            <span className={styles.statVal}>{weather.wind_speed} km/h</span>
          </div>
        </div>

        <div className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconOpen : ''}`}>
          ▼
        </div>
      </div>

      {isOpen && weather.forecast && weather.forecast.length > 0 && (
        <div className={styles.forecastContainer}>
          {weather.forecast.map((fc, idx) => (
            <div key={idx} className={styles.forecastDay}>
              <span className={styles.forecastDate}>{formatDayName(fc.date)}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://openweathermap.org/img/wn/${fc.icon}.png`}
                alt={fc.description}
                className={styles.miniIcon}
              />
              <div className={styles.forecastTemps}>
                {fc.temp_max}° <span className={styles.forecastMin}>{fc.temp_min}°</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
