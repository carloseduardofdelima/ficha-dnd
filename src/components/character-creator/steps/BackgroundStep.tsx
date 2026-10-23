'use client'

import React from 'react'
import BackgroundCard from '@/components/BackgroundCard'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function BackgroundStep() {
  const { availableBackgrounds, form, handleBgSelect, setDetailBg } = useCharacterCreator()

  return (
    <div className="fade-in">
      <div className="grid-cards">
        {availableBackgrounds.map(bg => (
          <BackgroundCard
            key={bg.id}
            background={bg}
            selected={form.background === bg.name}
            onSelect={handleBgSelect}
            onViewDetails={setDetailBg}
          />
        ))}
      </div>
    </div>
  )
}
