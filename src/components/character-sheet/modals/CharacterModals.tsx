'use client'

import React from 'react'
import LevelUpModal from './LevelUpModal'
import DraconicAncestryModal from './DraconicAncestryModal'
import ItemDetailsModal from './ItemDetailsModal'
import FeatureDetailsModal from './FeatureDetailsModal'
import BeastDetailsModal from './BeastDetailsModal'
import SubclassModal from './SubclassModal'
import InventoryAddModal from './InventoryAddModal'
import CustomItemModal from './CustomItemModal'
import FeatsModal from './FeatsModal'
import ImageUploadModal from './ImageUploadModal'
import CompanionModal from './CompanionModal'
import AttributeEditModal from './AttributeEditModal'
import ProgressionModal from './ProgressionModal'

export default function CharacterModals() {
  return (
    <>
      <LevelUpModal />
      <DraconicAncestryModal />
      <ItemDetailsModal />
      <FeatureDetailsModal />
      <BeastDetailsModal />
      <SubclassModal />
      <InventoryAddModal />
      <CustomItemModal />
      <FeatsModal />
      <ImageUploadModal />
      <CompanionModal />
      <AttributeEditModal />
      <ProgressionModal />
    </>
  )
}
