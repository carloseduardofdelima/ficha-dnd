'use client'

import React from 'react'
import { useCharacterCreator } from '../context/CharacterCreatorContext'
import EditionStep from './EditionStep'
import RaceStep from './RaceStep'
import ClassStep from './ClassStep'
import BackgroundStep from './BackgroundStep'
import AttributesStep from '@/components/AttributesStep'
import InventoryStep from '@/components/InventoryStep'
import SpellsStep from '@/components/SpellsStep'
import FinalStep from '@/components/FinalStep'

export default function CreatorStepContent() {
  const {
    currentStep,
    form,
    setForm,
    attrs,
    setAttrs,
    asi,
    setAsi,
    skills,
    setSkills,
    expertises,
    setExpertises,
    inventory,
    setInventory,
    selectedSpells,
    setSelectedSpells,
    featureChoices,
    setFeatureChoices,
    save,
    loading,
  } = useCharacterCreator()

  switch (currentStep) {
    case 0:
      return <EditionStep />
    case 1:
      return <RaceStep />
    case 2:
      return <ClassStep />
    case 3:
      return <BackgroundStep />
    case 4:
      return (
        <AttributesStep
          className={form.class}
          raceName={form.race}
          subRaceName={form.subRace}
          backgroundName={form.background}
          level={form.level}
          attrs={attrs}
          skills={skills}
          expertises={expertises}
          asi={asi}
          ruleset={form.ruleset}
          onAttrsChange={setAttrs}
          onSkillsChange={setSkills}
          onExpertisesChange={setExpertises}
          onAsiChange={setAsi}
        />
      )
    case 5:
      return (
        <InventoryStep
          className={form.class}
          backgroundName={form.background}
          inventory={inventory}
          onInventoryChange={setInventory}
          ruleset={form.ruleset}
        />
      )
    case 6:
      return (
        <SpellsStep
          className={form.class}
          selectedSpells={selectedSpells}
          onSpellsChange={setSelectedSpells}
          featureChoices={featureChoices}
          onFeatureChoicesChange={setFeatureChoices}
          ruleset={form.ruleset as any}
          level={form.level}
        />
      )
    case 7:
      return (
        <FinalStep
          form={form}
          onFormChange={setForm}
          attrs={attrs}
          asi={asi}
          skills={skills}
          inventory={inventory}
          selectedSpells={selectedSpells}
          featureChoices={featureChoices}
          onSave={save}
          loading={loading}
        />
      )
    default:
      return null
  }
}
