'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StepIndicator from '@/components/StepIndicator'
import { useCharacterCreator, STEPS } from '../context/CharacterCreatorContext'

export default function CreatorHeader() {
  const { currentStep } = useCharacterCreator()

  return (
    <>
      <div
        className="page-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 0,
        }}
      >
        <Link href="/personagens">
          <button className="btn btn-ghost" style={{ padding: 8 }}>
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div className="header-text">
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'var(--title-size, 24px)', margin: 0 }}>
            Criar Personagem
          </h1>
          <p style={{ fontSize: 13, color: 'var(--fg3)', margin: 0 }}>
            Siga os passos para forjar seu herói
          </p>
        </div>
      </div>

      <StepIndicator currentStep={currentStep} steps={STEPS} />
    </>
  )
}
