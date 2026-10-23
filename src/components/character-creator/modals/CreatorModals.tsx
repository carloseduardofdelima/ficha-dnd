'use client'

import React from 'react'
import RaceDetailModal from './RaceDetailModal'
import ClassDetailModal from './ClassDetailModal'
import BackgroundDetailModal from './BackgroundDetailModal'
import SubRaceModal from './SubRaceModal'
import RollingOverlayModal from './RollingOverlayModal'

export default function CreatorModals() {
  return (
    <>
      <RaceDetailModal />
      <ClassDetailModal />
      <BackgroundDetailModal />
      <SubRaceModal />
      <RollingOverlayModal />
    </>
  )
}
