'use client'
import { useState, useEffect } from 'react'

interface ResourceTrackerProps {
  label: string
  max: number
  current: number
  onChange: (newCurrent: number) => void
  color?: string
}

export default function ResourceTracker({ label, max, current, onChange, color = 'var(--accent)' }: ResourceTrackerProps) {
  return (
    <div className="resource-tracker" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: 'var(--fg2)' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg3)' }}>{current} / {max}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              // If clicking an active square that is the "last" one, toggle it off
              // Otherwise, set current to i + 1
              if (i + 1 === current) {
                onChange(i)
              } else {
                onChange(i + 1)
              }
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              border: `2px solid ${color}`,
              backgroundColor: i < current ? color : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: i < current ? `0 0 8px ${color}44` : 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}
