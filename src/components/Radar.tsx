'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RadarProps {
  color?: string;
  mode?: 'pulse' | 'sweep';
  speed?: number;
  trail?: number;
  scale?: number;
  ringCount?: number;
  spokeCount?: number;
  targets?: number;
  clutter?: number;
  mouseInteraction?: boolean;
  ticks?: boolean;
  glow?: number;
  tilt?: number;
  centerX?: number;
  centerY?: number;
  brightness?: number;
  gridOpacity?: number;
  lineWidth?: number;
  grain?: number;
  fade?: number;
  opacity?: number;
  intro?: boolean;
  lightMode?: boolean;
}

export default function Radar({
  color = '#ef4444',
  mode = 'pulse',
  speed = 1,
  scale = 0.9,
  ringCount = 6,
  spokeCount = 12,
  glow = 1,
  opacity = 1,
  lightMode = false,
}: RadarProps) {
  const rings = Array.from({ length: ringCount }, (_, i) => i + 1);
  const spokes = Array.from({ length: spokeCount }, (_, i) => i);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: lightMode ? '#f0f0f0' : '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        style={{
          transform: `scale(${scale})`,
          filter: glow > 0 ? `drop-shadow(0 0 ${glow * 10}px ${color})` : 'none',
        }}
      >
        {/* Rings */}
        {rings.map((ring) => (
          <motion.circle
            key={`ring-${ring}`}
            cx="100"
            cy="100"
            r={(ring / ringCount) * 90}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            opacity={opacity * 0.3}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: opacity * 0.3,
            }}
            transition={{
              duration: 1 / speed,
              delay: ring * 0.1,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Spokes */}
        {spokes.map((spoke) => {
          const angle = (spoke / spokeCount) * 360;
          const rad = (angle * Math.PI) / 180;
          const x2 = 100 + Math.cos(rad) * 90;
          const y2 = 100 + Math.sin(rad) * 90;

          return (
            <motion.line
              key={`spoke-${spoke}`}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth="0.3"
              opacity={opacity * 0.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: opacity * 0.2,
              }}
              transition={{
                duration: 1 / speed,
                delay: spoke * 0.05,
                ease: 'easeOut',
              }}
            />
          );
        })}

        {/* Sweeping beam */}
        {mode === 'sweep' && (
          <g>
            <motion.line
              x1="100"
              y1="100"
              x2="100"
              y2="10"
              stroke={color}
              strokeWidth="2"
              opacity={opacity}
              style={{
                filter: `blur(${glow}px) drop-shadow(0 0 ${glow * 5}px ${color})`,
                transformOrigin: '100px 100px',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 / speed,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </g>
        )}

        {/* Pulsing effect */}
        {mode === 'pulse' && (
          <>
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity={0}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2 / speed,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity={0}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2 / speed,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1 / speed,
              }}
            />
          </>
        )}

        {/* Center point */}
        <motion.circle
          cx="100"
          cy="100"
          r="3"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1 / speed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: `drop-shadow(0 0 ${glow * 3}px ${color})`,
          }}
        />

        {/* Scanning line (sweep mode) */}
        {mode === 'sweep' && (
          <motion.g
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 / speed,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformOrigin: '100px 100px',
            }}
          >
            <motion.path
              d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z"
              fill={color}
              opacity={0.15}
            />
          </motion.g>
        )}
      </svg>

      {/* Center logo or text overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: color,
            textShadow: `0 0 ${glow * 10}px ${color}`,
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          AI
        </motion.div>
      </div>
    </div>
  );
}
