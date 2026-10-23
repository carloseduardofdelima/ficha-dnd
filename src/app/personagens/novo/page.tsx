'use client'

import { CharacterCreatorProvider } from '@/components/character-creator/context/CharacterCreatorContext'
import CreatorHeader from '@/components/character-creator/header/CreatorHeader'
import CreatorStepContent from '@/components/character-creator/steps/CreatorStepContent'
import CreatorFooterNav from '@/components/character-creator/navigation/CreatorFooterNav'
import CreatorModals from '@/components/character-creator/modals/CreatorModals'
import CreatorStyles from '@/components/character-creator/CreatorStyles'

function NovoPersonagemContent() {
  return (
    <div className="container" style={{ maxWidth: 1200, paddingBottom: 100 }}>
      <CreatorHeader />
      <CreatorStepContent />
      <CreatorFooterNav />
      <CreatorModals />
      <CreatorStyles />
    </div>
  )
}

export default function NovoPersonagem() {
  return (
    <CharacterCreatorProvider>
      <NovoPersonagemContent />
    </CharacterCreatorProvider>
  )
}
