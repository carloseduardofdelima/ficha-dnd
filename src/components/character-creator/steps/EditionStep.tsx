'use client'

import React from 'react'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function EditionStep() {
  const { form, setForm, startRolling } = useCharacterCreator()

  return (
    <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, marginBottom: 8, textAlign: 'center' }}>
        Escolha a Edição
      </h2>
      <p style={{ color: 'var(--fg3)', textAlign: 'center', marginBottom: 32 }}>
        Selecione qual conjunto de regras você deseja usar para este personagem.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
        <div
          className={`card ${form.ruleset === '2014' ? 'active' : ''}`}
          onClick={() => setForm((prev: any) => ({ ...prev, ruleset: '2014', race: '', class: '', background: '' }))}
          style={{
            padding: 24,
            cursor: 'pointer',
            border: form.ruleset === '2014' ? '2px solid var(--accent)' : '1px solid var(--border)',
          }}
        >
          <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: 12 }}>D&D 5E (2014)</h3>
          <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5 }}>
            As regras clássicas da 5ª Edição. Atributos são fixos por raça e o Patrulheiro usa as regras originais de Inimigo Favorito.
          </p>
        </div>

        <div
          className={`card ${form.ruleset === '5e-custom' ? 'active' : ''}`}
          onClick={() => setForm((prev: any) => ({ ...prev, ruleset: '5e-custom', race: '', class: '', background: '' }))}
          style={{
            padding: 24,
            cursor: 'pointer',
            border: form.ruleset === '5e-custom' ? '2px solid var(--accent)' : '1px solid var(--border)',
          }}
        >
          <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: 12 }}>D&D 5E + Complementos</h3>
          <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5 }}>
            Regras de 2014 enriquecidas com classes e raças adicionais (como Artífice, Aasimar e Goliá).
          </p>
        </div>

        <div
          className={`card ${form.ruleset === '2024' ? 'active' : ''}`}
          onClick={() => setForm((prev: any) => ({ ...prev, ruleset: '2024', race: '', class: '', background: '' }))}
          style={{
            padding: 24,
            cursor: 'pointer',
            border: form.ruleset === '2024' ? '2px solid var(--accent)' : '1px solid var(--border)',
          }}
        >
          <h3 style={{ fontFamily: 'Cinzel, serif', marginBottom: 12 }}>D&D 2024 (5.5E)</h3>
          <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.5 }}>
            A nova atualização das regras. Atributos são escolhidos via Antecedente e as raças possuem novas habilidades balanceadas.
          </p>
        </div>
      </div>

      <div
        className="card random-card"
        onClick={startRolling}
        style={{
          padding: '24px 32px',
          cursor: 'pointer',
          border: '2px dashed var(--accent)',
          background: 'linear-gradient(135deg, rgba(191,155,48,0.1), rgba(0,0,0,0.6))',
          textAlign: 'center',
          marginTop: 30,
          borderRadius: 16,
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 4px 25px rgba(191,155,48,0.1)',
        }}
      >
        <div className="d20-icon-wrapper" style={{ fontSize: 48, animation: 'pulse 2s infinite' }}>
          🎲
        </div>
        <h3 style={{ fontFamily: 'Cinzel, serif', margin: 0, color: 'var(--accent)', fontSize: 22 }}>
          Forjar Ficha Aleatória
        </h3>
        <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6, margin: 0, maxWidth: 600 }}>
          Quer deixar tudo nas mãos do destino? Rolaremos dados virtuais d20 para escolher sua raça, classe, antecedentes, magias, perícias e atributos instantaneamente!
        </p>
      </div>
    </div>
  )
}
