'use client';

import React, { useState } from 'react';
import { Itinerary, DayPlan, DayActivity } from '@/lib/types';
import styles from './ItineraryView.module.css';

interface ItineraryViewProps {
  itinerary: Itinerary;
}

const CATEGORY_COLORS: Record<string, string> = {
  sightseeing: '#38bdf8',
  food: '#fb923c',
  transport: '#2dd4bf',
  accommodation: '#a855f7',
  experience: '#f472b6',
  shopping: '#4ade80',
};

export default function ItineraryView({ itinerary }: ItineraryViewProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'packing' | 'tips'>('itinerary');
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({ 1: true });
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const togglePacked = (item: string) => {
    setPackedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      {/* Top Banner Overview */}
      <div className={`glass ${styles.topBanner}`}>
        <div>
          <h2 className={styles.bannerTitle}>
            🗺️ {itinerary.destination} Master Itinerary
          </h2>
          <div className={styles.bannerMeta}>
            <div className={styles.metaItem}>
              <span>Duration:</span>
              <span className={styles.metaHighlight}>{itinerary.duration} Days</span>
            </div>
            <div className={styles.metaItem}>
              <span>Estimated Cost:</span>
              <span className={styles.metaHighlight}>
                {itinerary.currency} {itinerary.totalEstimatedCost.toLocaleString()}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span>Status:</span>
              <span className="badge badge-green">✓ Optimized & Verified</span>
            </div>
          </div>
        </div>

        <button onClick={handlePrint} className="btn-secondary">
          🖨️ Export / Print PDF
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabsBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'itinerary' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('itinerary')}
        >
          📅 Daily Schedule ({itinerary.days.length} Days)
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'packing' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('packing')}
        >
          🎒 Packing Checklist ({itinerary.packingList?.length || 0})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'tips' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          💡 Local Guide & Emergency
        </button>
      </div>

      {/* Tab 1: Itinerary Accordion */}
      {activeTab === 'itinerary' && (
        <div className={styles.daysList}>
          {itinerary.days.map((day: DayPlan) => {
            const isOpen = openDays[day.day] ?? false;
            return (
              <div key={day.day} className={`glass ${styles.dayCard}`}>
                <div className={styles.dayHeader} onClick={() => toggleDay(day.day)}>
                  <div className={styles.dayHeaderLeft}>
                    <span className={styles.dayNumberBadge}>Day {day.day}</span>
                    <div>
                      <div className={styles.dayTheme}>{day.theme}</div>
                      <div className={styles.dayDate}>{day.date}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.dayCost}>
                      ~{itinerary.currency} {day.totalDayCost.toLocaleString()}
                    </span>
                    <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className={styles.timeline}>
                    {day.activities.map((act: DayActivity, aIdx: number) => {
                      const dotColor = CATEGORY_COLORS[act.category] || '#38bdf8';
                      return (
                        <div key={aIdx} className={styles.timelineItem}>
                          <div className={styles.timelineLine} />
                          <div
                            className={styles.timelineDot}
                            style={{ backgroundColor: dotColor, color: dotColor }}
                          />

                          <div className={styles.activityContent}>
                            <div className={styles.activityTopRow}>
                              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span className={styles.timeBadge}>{act.time}</span>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: `${dotColor}22`,
                                    color: dotColor,
                                    borderColor: `${dotColor}44`,
                                  }}
                                >
                                  {act.category}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                ⏱️ {act.duration}
                              </span>
                            </div>

                            <div className={styles.activityName}>{act.activity}</div>
                            <div className={styles.locationRow}>📍 {act.location}</div>
                            <div className={styles.activityDesc}>{act.description}</div>

                            {act.tips && (
                              <div className={styles.tipsBox}>
                                💡 <strong>Insider Tip:</strong> {act.tips}
                              </div>
                            )}

                            <div className={styles.costRow}>
                              Estimated: {itinerary.currency} {act.estimatedCost.toLocaleString()} per person
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Packing Checklist */}
      {activeTab === 'packing' && (
        <div className={`glass ${styles.packingGrid}`}>
          {itinerary.packingList?.map((item, idx) => {
            const isDone = !!packedItems[item];
            return (
              <label
                key={idx}
                className={`${styles.checkItem} ${isDone ? styles.checked : ''}`}
                onClick={() => togglePacked(item)}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {}}
                  style={{ accentColor: 'var(--accent-blue)', width: 18, height: 18 }}
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      )}

      {/* Tab 3: Local Tips & Emergency */}
      {activeTab === 'tips' && (
        <div className={`glass ${styles.tipsGrid}`}>
          <div className={styles.tipCard}>
            <h3 style={{ color: 'var(--accent-orange)' }}>💡 Essential Travel Tips</h3>
            <ul className={styles.tipList}>
              {itinerary.travelTips?.map((tip, idx) => (
                <li key={idx}>• {tip}</li>
              ))}
            </ul>
          </div>

          <div className={styles.tipCard}>
            <h3 style={{ color: 'var(--accent-purple)' }}>🏛️ Cultural Etiquette</h3>
            <ul className={styles.tipList}>
              {itinerary.culturalNotes?.map((note, idx) => (
                <li key={idx}>• {note}</li>
              ))}
            </ul>
          </div>

          <div className={styles.tipCard}>
            <h3 style={{ color: 'var(--accent-teal)' }}>🚨 Emergency Helpline Contacts</h3>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {itinerary.emergencyContacts?.map((c, idx) => (
                <div key={idx} className={styles.emergencyItem}>
                  <span>{c.name}</span>
                  <span className={styles.phoneNum}>{c.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
