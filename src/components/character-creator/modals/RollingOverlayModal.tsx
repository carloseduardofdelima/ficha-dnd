'use client'

import React from 'react'
import { Attrs } from '@/components/AttributesStep'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function RollingOverlayModal() {
  const {
    isRolling,
    setIsRolling,
    rollingStepIdx,
    isAnimationRunning,
    rollingStats,
    rollingPreview,
    rollRace,
    rollClass,
    rollBackground,
    rollStatsStep,
    rollSkillsSpellsStep,
    finalizeRoll,
  } = useCharacterCreator()

  if (!isRolling) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(12px)',
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 45px rgba(191,155,48,0.5)',
            fontSize: 50,
            animation: isAnimationRunning ? 'spin 1.5s linear infinite' : 'pulse 2s infinite',
          }}
        >
          🎲
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, margin: 0, color: 'var(--accent)' }}>
            Forja do Destino
          </h2>
          <p style={{ color: 'var(--fg3)', fontSize: 13, margin: 0 }}>
            Role cada passo para forjar o seu personagem
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 24,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            textAlign: 'left',
          }}
        >
          {/* Step indicators */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              paddingBottom: 12,
            }}
          >
            {['Raça', 'Classe', 'Antecedente', 'Atributos', 'Perícias/Magias'].map((step, idx) => (
              <span
                key={step}
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color:
                    rollingStepIdx === idx
                      ? 'var(--accent)'
                      : rollingStepIdx > idx
                      ? 'var(--ok)'
                      : 'var(--fg3)',
                  textDecoration: rollingStepIdx > idx ? 'line-through' : 'none',
                }}
              >
                {step}
              </span>
            ))}
          </div>

          {/* Progress Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              marginTop: 4,
              padding: 14,
              borderRadius: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--fg3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Regras
              </span>
              <span style={{ fontSize: 13, fontWeight: 'bold', color: 'var(--ok)' }}>
                D&D {rollingPreview.ruleset}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--fg3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Raça
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: rollingPreview.race ? 'var(--accentL)' : 'var(--fg3)',
                  textShadow: rollingPreview.race ? '0 0 10px rgba(191,155,48,0.3)' : 'none',
                }}
              >
                {rollingPreview.race || 'Pendente...'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--fg3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Classe
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: rollingPreview.class ? 'var(--accentL)' : 'var(--fg3)',
                  textShadow: rollingPreview.class ? '0 0 10px rgba(191,155,48,0.3)' : 'none',
                }}
              >
                {rollingPreview.class || (rollingStepIdx > 1 ? 'Pendente...' : '-')}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--fg3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Antecedente
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: rollingPreview.bg ? 'var(--accentL)' : 'var(--fg3)',
                  textShadow: rollingPreview.bg ? '0 0 10px rgba(191,155,48,0.3)' : 'none',
                }}
              >
                {rollingPreview.bg || (rollingStepIdx > 2 ? 'Pendente...' : '-')}
              </span>
            </div>
          </div>

          {/* Step 0: Race Content */}
          {rollingStepIdx === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                1. Role a raça do personagem de acordo com a edição selecionada.
              </p>
              {rollingPreview.race && (
                <div
                  className="card fade-in"
                  style={{
                    padding: '24px 16px',
                    backgroundColor: 'rgba(191,155,48,0.06)',
                    border: '2px solid var(--accent)',
                    boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                    textAlign: 'center',
                    borderRadius: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'var(--accentL)',
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {rollingPreview.race}
                  </span>
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={rollRace}
                disabled={isAnimationRunning}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
              >
                {isAnimationRunning ? 'Rolando Raça...' : '🎲 Rolar Raça'}
              </button>
            </div>
          )}

          {/* Step 1: Class Content */}
          {rollingStepIdx === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                2. Role a classe de combate do personagem.
              </p>
              {rollingPreview.class && (
                <div
                  className="card fade-in"
                  style={{
                    padding: '24px 16px',
                    backgroundColor: 'rgba(191,155,48,0.06)',
                    border: '2px solid var(--accent)',
                    boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                    textAlign: 'center',
                    borderRadius: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'var(--accentL)',
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {rollingPreview.class}
                  </span>
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={rollClass}
                disabled={isAnimationRunning}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
              >
                {isAnimationRunning ? 'Rolando Classe...' : '🎲 Rolar Classe'}
              </button>
            </div>
          )}

          {/* Step 2: Background Content */}
          {rollingStepIdx === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                3. Role o antecedente (Background) que define a história inicial.
              </p>
              {rollingPreview.bg && (
                <div
                  className="card fade-in"
                  style={{
                    padding: '24px 16px',
                    backgroundColor: 'rgba(191,155,48,0.06)',
                    border: '2px solid var(--accent)',
                    boxShadow: '0 0 25px rgba(191,155,48,0.35)',
                    textAlign: 'center',
                    borderRadius: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: 'var(--accentL)',
                      fontFamily: 'Cinzel, serif',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {rollingPreview.bg}
                  </span>
                </div>
              )}
              <button
                className="btn btn-primary"
                onClick={rollBackground}
                disabled={isAnimationRunning}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
              >
                {isAnimationRunning ? 'Rolando Antecedente...' : '🎲 Rolar Antecedente'}
              </button>
            </div>
          )}

          {/* Step 3: Attributes Content */}
          {rollingStepIdx === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                4. Role d20 individualmente para determinar cada atributo básico.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 10,
                  marginTop: 4,
                }}
              >
                {[
                  { key: 'strength', label: 'FOR' },
                  { key: 'dexterity', label: 'DES' },
                  { key: 'constitution', label: 'CON' },
                  { key: 'intelligence', label: 'INT' },
                  { key: 'wisdom', label: 'SAB' },
                  { key: 'charisma', label: 'CAR' },
                ].map((stat) => (
                  <div
                    key={stat.key}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8,
                      padding: '12px 8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 9, color: 'var(--fg3)', marginBottom: 4 }}>
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 'black',
                        color:
                          rollingStats[stat.key as keyof Attrs] > 0 ? 'var(--accentL)' : 'var(--fg3)',
                      }}
                    >
                      {rollingStats[stat.key as keyof Attrs] || '-'}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary"
                onClick={rollStatsStep}
                disabled={isAnimationRunning}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
              >
                {isAnimationRunning ? 'Rolando d20...' : '🎲 Lançar Dados (1d20)'}
              </button>
            </div>
          )}

          {/* Step 4: Skills Content */}
          {rollingStepIdx === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  paddingBottom: 8,
                }}
              >
                <span style={{ color: 'var(--fg3)' }}>Atributos Sorteados:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--accentL)' }}>
                  {Object.values(rollingStats).join(', ')}
                </span>
              </div>

              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                5. Escolha e role as perícias apropriadas, magias e inventário correspondente à sua classe.
              </p>

              <button
                className="btn btn-primary"
                onClick={rollSkillsSpellsStep}
                disabled={isAnimationRunning}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold' }}
              >
                {isAnimationRunning
                  ? 'Configurando habilidades...'
                  : '🎲 Infundir Perícias e Magias'}
              </button>
            </div>
          )}

          {/* Step 5: Done Content */}
          {rollingStepIdx === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 50, color: 'var(--ok)' }}>✓</div>
              <h3 style={{ margin: 0, color: 'var(--ok)', fontFamily: 'Cinzel, serif' }}>
                Ficha Pronta!
              </h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', margin: 0 }}>
                Sua ficha aleatória foi estruturada com sucesso. Vá para a etapa final para dar um nome ao seu herói e salvá-lo.
              </p>
              <button
                className="btn btn-primary"
                onClick={finalizeRoll}
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold', marginTop: 10 }}
              >
                Concluir e Nomear Herói
              </button>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        <button
          className="btn btn-ghost"
          onClick={() => setIsRolling(false)}
          disabled={isAnimationRunning}
          style={{ color: 'var(--fg3)' }}
        >
          Cancelar Rolagem
        </button>
      </div>
    </div>
  )
}
