'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}
        >
          <div
            className="glass"
            style={{
              maxWidth: '600px',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '12px',
              }}
            >
              Oops! Something went wrong
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                fontSize: '0.95rem',
              }}
            >
              We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                🔄 Refresh Page
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="btn-secondary"
              >
                🏠 Go Home
              </button>
            </div>
            {this.state.error && (
              <details style={{ marginTop: '24px', textAlign: 'left' }}>
                <summary
                  style={{
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                  }}
                >
                  Error Details (for developers)
                </summary>
                <pre
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    color: 'var(--accent-orange)',
                  }}
                >
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
