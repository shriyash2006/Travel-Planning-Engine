'use client';

import React, { useState, useEffect } from 'react';
import { TripPreferences } from '@/lib/types';
import styles from './TripForm.module.css';

interface TripFormProps {
  onSubmit: (prefs: TripPreferences) => void;
  loading: boolean;
  initialDestination?: string;
  initialBudget?: number;
}

const TRAVEL_STYLES = [
  { id: 'adventure', label: 'Adventure', emoji: '🧗', desc: 'Thrill & outdoor hikes' },
  { id: 'relaxed', label: 'Relaxed', emoji: '🧘', desc: 'Slow pace & chill vibes' },
  { id: 'cultural', label: 'Cultural', emoji: '🏛️', desc: 'Heritage & museums' },
  { id: 'luxury', label: 'Luxury', emoji: '💎', desc: '5-star & fine dining' },
  { id: 'backpacker', label: 'Backpacker', emoji: '🎒', desc: 'Budget & social hostels' },
];

const INTERESTS = [
  '🏛️ History & Heritage',
  '🏖️ Beaches & Islands',
  '🏔️ Mountain Trekking',
  '🍜 Street Food & Dining',
  '🎨 Art & Galleries',
  '🛍️ Local Bazaars',
  '🌿 Wildlife Safaris',
  '🎭 Nightlife & Clubs',
  '⛩️ Sacred Temples',
  '🚴 Cycling & Sports',
  '📸 Photography Spots',
  '🎵 Live Music & Festivals',
];

const DIETARY = [
  '🌱 Vegetarian',
  '🥗 Pure Vegan',
  '🥩 Non-Vegetarian',
  '☪️ Halal',
  '🌾 Gluten-Free',
  '🥜 Nut Allergy',
];

export default function TripForm({ onSubmit, loading, initialDestination, initialBudget }: TripFormProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

  const [formData, setFormData] = useState<TripPreferences>({
    origin: 'Delhi',
    destination: initialDestination || 'Bali, Indonesia',
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: fiveDaysLater.toISOString().split('T')[0],
    budget: initialBudget || 35000,
    currency: 'USD',
    travelers: 2,
    travelStyle: 'luxury',
    dietaryRestrictions: ['🌱 Vegetarian'],
    interests: ['🏖️ Beaches & Islands', '🍜 Street Food & Dining', '📸 Photography Spots'],
    accommodation: 'luxury',
    transportMode: 'mix',
  });

  useEffect(() => {
    if (initialDestination) {
      setFormData((prev) => ({ ...prev, destination: initialDestination }));
    }
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialDestination, initialBudget]);

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleDietToggle = (diet: string) => {
    setFormData((prev) => {
      const exists = prev.dietaryRestrictions.includes(diet);
      return {
        ...prev,
        dietaryRestrictions: exists
          ? prev.dietaryRestrictions.filter((d) => d !== diet)
          : [...prev.dietaryRestrictions, diet],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination) return;
    onSubmit(formData);
  };

  return (
    <div className={`glass ${styles.formCard}`}>
      <div className={styles.formHeader}>
        <div className="badge badge-red" style={{ marginBottom: 12 }}>
          NEXTRIP.AI TRIP SYNTHESIS
        </div>
        <h2 className={`font-condensed ${styles.formTitle}`}>WHERE TO NEXT?</h2>
        <p className={styles.formSubtitle}>
          Configure destination parameters, pacing, and dietary constraints. Our AI builds a synchronized day-by-day roadmap with real-time costs and live weather.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Origin & Destination */}
        <div className={styles.gridRow}>
          <div>
            <label className="label">ORIGIN CITY</label>
            <input
              type="text"
              required
              placeholder="e.g. London, New York, Delhi, Tokyo"
              className="input"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            />
          </div>

          <button
            type="button"
            className={styles.swapBtn}
            onClick={handleSwap}
            title="Swap Origin & Destination"
          >
            ⇄
          </button>

          <div>
            <label className="label">DESTINATION</label>
            <input
              type="text"
              required
              placeholder="e.g. Bali, Kyoto, Santorini, Goa"
              className="input"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
        </div>

        {/* Dates & Travelers */}
        <div className={styles.gridThree}>
          <div>
            <label className="label">DEPARTURE DATE</label>
            <input
              type="date"
              required
              className="input"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label">RETURN DATE</label>
            <input
              type="date"
              required
              className="input"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label">TRAVELERS</label>
            <div className={styles.counter}>
              <button
                type="button"
                className={styles.counterBtn}
                disabled={formData.travelers <= 1}
                onClick={() => setFormData({ ...formData, travelers: formData.travelers - 1 })}
              >
                -
              </button>
              <span className={styles.counterValue}>
                {formData.travelers} {formData.travelers === 1 ? 'Adult' : 'Adults'}
              </span>
              <button
                type="button"
                className={styles.counterBtn}
                onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Budget, Accommodation & Transport */}
        <div className={styles.gridThree}>
          <div>
            <label className="label">BUDGET TARGET</label>
            <div className={styles.budgetRow}>
              <select
                className={`select ${styles.currencySelect}`}
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
              <input
                type="number"
                required
                min={100}
                step={50}
                className="input"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="label">ACCOMMODATION</label>
            <select
              className="select"
              value={formData.accommodation}
              onChange={(e) => setFormData({ ...formData, accommodation: e.target.value as any })}
            >
              <option value="luxury">💎 Luxury 5★ Resort</option>
              <option value="mid_range">⭐ Boutique 4★ Suites</option>
              <option value="budget_hotel">🏨 Classic Hotel</option>
              <option value="airbnb">🏡 Private Villa</option>
              <option value="hostel">🎒 Nomad Pod</option>
            </select>
          </div>

          <div>
            <label className="label">TRANSIT PREFERENCE</label>
            <select
              className="select"
              value={formData.transportMode}
              onChange={(e) => setFormData({ ...formData, transportMode: e.target.value as any })}
            >
              <option value="mix">✨ Smart Mix (Chauffeur + Walk + High-Speed Rail)</option>
              <option value="taxi">🚕 Private Transfers & Uber</option>
              <option value="rental">🚗 Self-Drive Vehicle</option>
              <option value="public">🚌 Metro & Rail</option>
            </select>
          </div>
        </div>

        {/* Travel Style 5-card selector */}
        <div className={styles.sectionGroup}>
          <label className="label">VOYAGE VIBE & PACING</label>
          <div className={styles.stylesGrid}>
            {TRAVEL_STYLES.map((style) => (
              <div
                key={style.id}
                className={`${styles.styleCard} ${
                  formData.travelStyle === style.id ? styles.styleCardActive : ''
                }`}
                onClick={() => setFormData({ ...formData, travelStyle: style.id as any })}
              >
                <span className={styles.styleEmoji}>{style.emoji}</span>
                <span className={styles.styleTitle}>{style.label}</span>
                <span className={styles.styleDesc}>{style.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className={styles.sectionGroup}>
          <label className="label">CURATED PURSUITS & EXPERIENCES</label>
          <div className={styles.tagsContainer}>
            {INTERESTS.map((interest) => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  className={`${styles.tagChip} ${isSelected ? styles.tagChipActive : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div className={styles.sectionGroup}>
          <label className="label">DIETARY PREFERENCES & RESTRICTIONS</label>
          <div className={styles.tagsContainer}>
            {DIETARY.map((diet) => {
              const isSelected = formData.dietaryRestrictions.includes(diet);
              return (
                <button
                  type="button"
                  key={diet}
                  className={`${styles.tagChip} ${isSelected ? styles.tagChipActive : ''}`}
                  onClick={() => handleDietToggle(diet)}
                >
                  {diet}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`btn-primary ${styles.submitBtn}`}
        >
          {loading ? (
            <>
              <span className="spinner" />
              SYNTHESIZING TIMELESS VOYAGE WITH AI...
            </>
          ) : (
            '✨ SYNTHESIZE TRIP ENGINE NOW ↗'
          )}
        </button>
      </form>
    </div>
  );
}
