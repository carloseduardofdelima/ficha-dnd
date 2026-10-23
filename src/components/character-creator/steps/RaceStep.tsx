'use client'

import React from 'react'
import RaceCard from '@/components/RaceCard'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function RaceStep() {
  const { availableRaces, form, handleRaceSelect, setDetailRace } = useCharacterCreator()

  return (
    <div className="fade-in">
      <div className="grid-cards">
        {availableRaces.map(race => (
          <RaceCard
            key={race.id}
            race={race}
            selected={form.race === race.name}
            onSelect={handleRaceSelect}
            onViewDetails={setDetailRace}
          />
        ))}
      </div>
    </div>
  )
}
