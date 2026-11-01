'use client';

import React from 'react';
import Radar from './Radar';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
  compact?: boolean;
}

export default function LoadingScreen({ 
  message = 'Loading...', 
  submessage,
  compact = false 
}: LoadingScreenProps) {
  if (compact) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div style={{ width: '200px', height: '200px', margin: '0 auto', marginBottom: '20px' }}>
            <Radar
              color="#EE4336"
              mode="sweep"
              speed={1.5}
              scale={0.8}
              ringCount={4}
              spokeCount={8}
              glow={1}
              opacity={1}
              lightMode={false}
            />
          </div>
          <p className="text-white font-condensed text-xl uppercase tracking-wider">{message}</p>
          {submessage && (
            <p className="text-zinc-400 text-sm mt-2">{submessage}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="text-center max-w-2xl px-6">
        <div style={{ width: '100%', height: '400px', marginBottom: '40px' }}>
          <Radar
            color="#EE4336"
            mode="pulse"
            speed={1.2}
            scale={0.85}
            ringCount={6}
            spokeCount={12}
            glow={1.5}
            opacity={1}
            lightMode={false}
          />
        </div>
        
        <div className="space-y-4">
          <span className="text-[#EE4336] text-xs font-black uppercase tracking-[0.25em] block">
            NEXTRIP.AI
          </span>
          <h3 className="font-condensed text-5xl uppercase tracking-wider text-white leading-tight">
            {message}
          </h3>
          {submessage && (
            <p className="text-base text-zinc-300 leading-relaxed">
              {submessage}
            </p>
          )}
          
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="h-2 w-2 rounded-full bg-[#EE4336] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
