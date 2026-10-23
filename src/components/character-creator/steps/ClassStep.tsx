'use client'

import React from 'react'
import ClassCard from '@/components/ClassCard'
import { useCharacterCreator } from '../context/CharacterCreatorContext'

export default function ClassStep() {
  const { availableClasses, form, handleClassSelect, setDetailClass } = useCharacterCreator()

  return (
    <div className="fade-in">
      <div className="grid-cards">
        {availableClasses.map(cls => (
          <ClassCard
            key={cls.id}
            dndClass={cls}
            selected={form.class === cls.name}
            onSelect={handleClassSelect}
            onViewDetails={setDetailClass}
          />
        ))}
      </div>
    </div>
  )
}
