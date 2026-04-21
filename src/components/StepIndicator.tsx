import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div style={{ width: '100%', marginBottom: 24 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '0',
          right: '0',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '0',
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
          height: '2px',
          backgroundColor: 'var(--accent)',
          zIndex: 0,
          transition: 'width 0.3s ease'
        }} />

        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={step} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              zIndex: 1,
              flex: 1
            }}>
              <div style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                backgroundColor: isCurrent ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--bg2)',
                border: isCurrent ? '4px solid var(--bg)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold',
                color: isActive ? '#fff' : 'var(--fg3)',
                transition: 'all 0.3s ease',
                boxShadow: isCurrent ? '0 0 0 2px var(--accent)' : 'none'
              }}>
                {idx + 1}
              </div>
              <span className='step-text' style={{
                fontSize: '1rem',
                fontWeight: isCurrent ? 'bold' : 'normal',
                color: isActive ? 'var(--fg)' : 'var(--fg3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
