'use client';

import React, { useState } from 'react';
import { TripPreferences } from '@/lib/types';
import styles from './TripForm.module.css';

interface TripFormProps {
  onSubmit: (prefs: TripPreferences) => void;
  loading: boolean;
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

export default function TripForm({ onSubmit, loading }: TripFormProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);

  const [formData, setFormData] = useState<TripPreferences>({
    origin: 'Bhopal',
    destination: 'Goa',
    startDate: tomorrow.toISOString().split('T')[0],
    endDate: fiveDaysLater.toISOString().split('T')[0],
    budget: 35000,
    currency: 'INR',
    travelers: 2,
    travelStyle: 'relaxed',
    dietaryRestrictions: ['🌱 Vegetarian'],
    interests: ['🏖️ Beaches & Islands', '🍜 Street Food & Dining', '📸 Photography Spots'],
    accommodation: 'mid_range',
    transportMode: 'mix',
  });

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
        <div className="badge badge-blue" style={{ marginBottom: 10 }}>✨ AI-Powered Itinerary Engine</div>
        <h2 className={styles.formTitle}>Where is your next journey taking you?</h2>
        <p className={styles.formSubtitle}>
          Set your destinations, constraints, and tastes. Our engine crafts a dynamic plan with real-time costs and weather.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Origin & Destination */}
        <div className={styles.gridRow}>
          <div>
            <label className="label">Origin City</label>
            <input
              type="text"
              required
              placeholder="e.g. Bhopal, Delhi, Mumbai"
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
            <label className="label">Destination</label>
            <input
              type="text"
              required
              placeholder="e.g. Goa, Manali, Jaipur, Tokyo"
              className="input"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
        </div>

        {/* Dates & Travelers */}
        <div className={styles.gridThree}>
          <div>
            <label className="label">Start Date</label>
            <input
              type="date"
              required
              className="input"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label">End Date</label>
            <input
              type="date"
              required
              className="input"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Travelers</label>
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
                {formData.travelers} {formData.travelers === 1 ? 'Person' : 'People'}
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
            <label className="label">Total Budget</label>
            <div className={styles.budgetRow}>
              <select
                className={`select ${styles.currencySelect}`}
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
              <input
                type="number"
                required
                min={1000}
                step={500}
                className="input"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="label">Stay Preference</label>
            <select
              className="select"
              value={formData.accommodation}
              onChange={(e) => setFormData({ ...formData, accommodation: e.target.value as any })}
            >
              <option value="hostel">🎒 Youth Hostel / Pod</option>
              <option value="budget_hotel">🏨 Budget Hotel</option>
              <option value="mid_range">⭐ Mid-Range 3-4★ Hotel</option>
              <option value="luxury">💎 Luxury 5★ Resort</option>
              <option value="airbnb">🏡 Private Villa / Airbnb</option>
            </select>
          </div>

          <div>
            <label className="label">Commute Style</label>
            <select
              className="select"
              value={formData.transportMode}
              onChange={(e) => setFormData({ ...formData, transportMode: e.target.value as any })}
            >
              <option value="mix">✨ Smart Mix (Cab + Walk + Metro)</option>
              <option value="public">🚌 Metro & Public Bus</option>
              <option value="rental">🚗 Self-Drive Car / Bike</option>
              <option value="taxi">🚕 Private Cabs / Uber</option>
            </select>
          </div>
        </div>

        {/* Travel Style 5-card selector */}
        <div className={styles.sectionGroup}>
          <label className="label">Travel Vibe & Style</label>
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
          <label className="label">Curated Interests & Experiences</label>
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
          <label className="label">Dietary Preferences</label>
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
              Generating Dynamic Itinerary & Live Rates...
            </>
          ) : (
            '✨ Generate Dynamic Trip Engine'
          )}
        </button>
      </form>
    </div>
  );
}
