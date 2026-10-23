'use client'

import React from 'react'
import { Info, Calendar, Users, Contact, Shield, Sword, BookOpen } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

const ALL_TABS = [
  { id: 'resumo', label: 'Resumo', icon: Info },
  { id: 'sessoes', label: 'Sessões', icon: Calendar },
  { id: 'personagens', label: 'Jogadores', icon: Users },
  { id: 'npcs', label: 'NPCs', icon: Contact },
  { id: 'ameacas', label: 'Ameaças', icon: Shield },
  { id: 'combate', label: 'Combate', icon: Sword },
  { id: 'notas', label: 'Notas', icon: BookOpen },
]

export default function CampaignNavTabs() {
  const { campaign, activeTab, setActiveTab } = useCampaign()

  if (!campaign) return null

  const tabs = ALL_TABS.filter(tab => {
    if (tab.id === 'sessoes' && campaign.type !== 'campaign') return false
    if (tab.id === 'ameacas' && !campaign.isOwner) return false
    if (tab.id === 'combate' && !campaign.isOwner) return false
    return true
  })

  return (
    <div className="tabs-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <tab.icon size={18} />
          {tab.label}
        </button>
      ))}
    </div>
  )
}
