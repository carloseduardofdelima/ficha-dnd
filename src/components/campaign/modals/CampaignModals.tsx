'use client'

import React from 'react'
import SessionModal from './SessionModal'
import CharacterLinkModal from './CharacterLinkModal'
import NoteModal from './NoteModal'
import MapDocModal from './MapDocModal'
import SelectThreatModal from './SelectThreatModal'
import DeleteNoteConfirmModal from './DeleteNoteConfirmModal'
import UnlinkCharConfirmModal from './UnlinkCharConfirmModal'
import ZoomLightboxModal from './ZoomLightboxModal'

export default function CampaignModals() {
  return (
    <>
      <SessionModal />
      <CharacterLinkModal />
      <NoteModal />
      <MapDocModal />
      <SelectThreatModal />
      <DeleteNoteConfirmModal />
      <UnlinkCharConfirmModal />
      <ZoomLightboxModal />
    </>
  )
}
