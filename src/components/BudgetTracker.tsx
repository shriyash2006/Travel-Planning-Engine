'use client';

import React, { useState, useEffect } from 'react';
import { BudgetEntry, BudgetCategory } from '@/lib/types';
import styles from './BudgetTracker.module.css';

interface BudgetTrackerProps {
  totalBudget: number;
  currency: string;
  tripDays: number;
}

const CATEGORY_TEMPLATES = [
  { id: 'flights', name: 'Flights', icon: '✈️', percent: 0.3, color: '#38bdf8' },
  { id: 'hotels', name: 'Hotels & Stays', icon: '🏨', percent: 0.25, color: '#a855f7' },
  { id: 'food', name: 'Food & Dining', icon: '🍜', percent: 0.2, color: '#fb923c' },
  { id: 'activities', name: 'Experiences', icon: '🎭', percent: 0.15, color: '#f472b6' },
  { id: 'transport', name: 'Local Commute', icon: '🚌', percent: 0.05, color: '#2dd4bf' },
  { id: 'shopping', name: 'Shopping & Misc', icon: '🛍️', percent: 0.05, color: '#4ade80' },
];

export default function BudgetTracker({ totalBudget, currency, tripDays }: BudgetTrackerProps) {
  const [entries, setEntries] = useState<BudgetEntry[]>([]);
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [day, setDay] = useState(1);

  // Load from localStorage or initialize with realistic sample data
  useEffect(() => {
    const saved = localStorage.getItem('tripcraft_budget_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
        return;
      } catch (e) {
        console.error('Failed to parse saved budget:', e);
      }
    }

    // Default sample entries for immediate demo impact
    const initialSample: BudgetEntry[] = [
      {
        id: 'b-1',
        category: 'flights',
        description: 'Flight Tickets (Return)',
        amount: Math.round(totalBudget * 0.26),
        date: new Date().toISOString().split('T')[0],
        day: 1,
      },
      {
        id: 'b-2',
        category: 'hotels',
        description: 'Hotel Deposit & Booking',
        amount: Math.round(totalBudget * 0.2),
        date: new Date().toISOString().split('T')[0],
        day: 1,
      },
      {
        id: 'b-3',
        category: 'food',
        description: 'Welcome Dinner & Drinks',
        amount: Math.round(totalBudget * 0.04),
        date: new Date().toISOString().split('T')[0],
        day: 1,
      },
    ];
    setEntries(initialSample);
  }, [totalBudget]);

  // Persist to localStorage
  const updateEntries = (newEntries: BudgetEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('tripcraft_budget_entries', JSON.stringify(newEntries));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) return;

    const newEntry: BudgetEntry = {
      id: `exp-${Date.now()}`,
      category,
      description,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      day,
    };

    updateEntries([newEntry, ...entries]);
    setDescription('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    updateEntries(entries.filter((item) => item.id !== id));
  };

  // Calculations
  const totalSpent = entries.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentSpent = Math.min(100, Math.round((totalSpent / (totalBudget || 1)) * 100));
  const isOverBudget = remaining < 0;

  // Breakdown by category
  const categories: BudgetCategory[] = CATEGORY_TEMPLATES.map((cat) => {
    const planned = Math.round(totalBudget * cat.percent);
    const spent = entries
      .filter((e) => e.category === cat.id)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      planned,
      spent,
      color: cat.color,
    };
  });

  return (
    <div className={styles.container}>
      {/* Overview Progress Card */}
      <div className={`glass ${styles.overviewCard}`}>
        <div className={styles.overviewTop}>
          <div>
            <h3 className={styles.overviewTitle}>💰 Smart Budget Engine</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Real-time expenditure tracking with automatic category budgeting
            </p>
          </div>

          <div className={styles.amountsRow}>
            <div className={styles.amountBlock}>
              <span className={styles.amountLabel}>Total Budget</span>
              <span className={`${styles.amountVal} ${styles.valNormal}`}>
                {currency} {totalBudget.toLocaleString()}
              </span>
            </div>
            <div className={styles.amountBlock}>
              <span className={styles.amountLabel}>Total Spent</span>
              <span className={`${styles.amountVal} ${styles.valSpent}`}>
                {currency} {totalSpent.toLocaleString()}
              </span>
            </div>
            <div className={styles.amountBlock}>
              <span className={styles.amountLabel}>Remaining</span>
              <span
                className={`${styles.amountVal} ${
                  isOverBudget ? styles.valExceeded : styles.valRemaining
                }`}
              >
                {currency} {remaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${percentSpent}%`,
              background: isOverBudget
                ? 'linear-gradient(90deg, #f87171, #ef4444)'
                : percentSpent > 80
                ? 'linear-gradient(90deg, #fb923c, #f87171)'
                : 'linear-gradient(90deg, #38bdf8, #818cf8, #a855f7)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginTop: 8,
          }}
        >
          <span>{percentSpent}% of total funds utilized</span>
          {isOverBudget ? (
            <span style={{ color: '#f87171', fontWeight: 600 }}>⚠️ Budget limit exceeded!</span>
          ) : (
            <span style={{ color: 'var(--accent-green)' }}>✓ Well within target limits</span>
          )}
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className={styles.categoriesGrid}>
        {categories.map((cat) => {
          const catPercent = Math.min(100, Math.round((cat.spent / (cat.planned || 1)) * 100));
          return (
            <div key={cat.id} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryName}>
                  <span>{cat.icon}</span> {cat.name}
                </span>
                <span className={styles.categorySpent} style={{ color: cat.color }}>
                  {currency} {cat.spent.toLocaleString()}
                </span>
              </div>

              <div className={styles.categoryMiniBar}>
                <div
                  className={styles.categoryMiniFill}
                  style={{
                    width: `${catPercent}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>

              <div className={styles.categoryFooter}>
                <span>Planned: {currency} {cat.planned.toLocaleString()}</span>
                <span>{catPercent}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Expense Form & Log Table */}
      <div className={styles.contentGrid}>
        {/* Form */}
        <div className={`glass ${styles.formCard}`}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>➕ Add New Expense</h4>
          <form onSubmit={handleAddExpense} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label className="label">Category</label>
              <select
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_TEMPLATES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Description</label>
              <input
                type="text"
                required
                placeholder="e.g. Scuba diving pass, Taxi to fort"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label className="label">Amount ({currency})</label>
                <input
                  type="number"
                  required
                  min={1}
                  step={50}
                  placeholder="0"
                  className="input"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="label">Trip Day</label>
                <select
                  className="select"
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {Array.from({ length: tripDays || 3 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Day {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: 6 }}>
              Add Expense
            </button>
          </form>
        </div>

        {/* Expense Log Table */}
        <div className={`glass ${styles.logCard}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>📋 Expense Log</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {entries.length} items recorded
            </span>
          </div>

          {entries.length === 0 ? (
            <div className={styles.emptyLog}>
              No expenses added yet. Record your trip costs above!
            </div>
          ) : (
            <table className={styles.logTable}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((item) => {
                  const catObj = CATEGORY_TEMPLATES.find((c) => c.id === item.category);
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="badge badge-blue">Day {item.day}</span>
                      </td>
                      <td>
                        <span>
                          {catObj?.icon} {catObj?.name || item.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{item.description}</td>
                      <td style={{ fontWeight: 600, color: 'var(--accent-green)' }}>
                        {currency} {item.amount.toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles.deleteBtn}
                          title="Delete expense"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
