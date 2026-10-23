'use client'

import { CampaignProvider, useCampaign } from '@/components/campaign/context/CampaignContext'
import CampaignBanner from '@/components/campaign/header/CampaignBanner'
import CampaignNavTabs from '@/components/campaign/header/CampaignNavTabs'
import ResumoTab from '@/components/campaign/tabs/ResumoTab'
import SessionsTab from '@/components/campaign/tabs/SessionsTab'
import PlayersTab from '@/components/campaign/tabs/PlayersTab'
import NotesTab from '@/components/campaign/tabs/NotesTab'
import ThreatsTab from '@/components/campaign/tabs/ThreatsTab'
import CombatTab from '@/components/campaign/tabs/CombatTab'
import CampaignModals from '@/components/campaign/modals/CampaignModals'
import CampaignStyles from '@/components/campaign/CampaignStyles'
import NpcTab from './NpcTab'
import { Sword, Skull, Shield } from 'lucide-react'

function CampaignDetailContent() {
  const { campaign, loading, activeTab, fetchCampaign } = useCampaign()

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="loading-icons">
            <Sword size={48} className="icon-sword" />
            <Skull size={64} className="icon-skull" />
            <Shield size={48} className="icon-shield" />
          </div>
          <h2 className="loading-text">Preparando sua Aventura...</h2>
          <div className="loading-bar-container">
            <div className="loading-bar-fill"></div>
          </div>
          <p className="loading-subtext">Consultando o mestre dos magos...</p>
        </div>
      </div>
    )
  }

  if (!campaign) {
    return <div>Campanha não encontrada.</div>
  }

  return (
    <div className="campaign-detail-container">
      <CampaignBanner />
      <CampaignNavTabs />

      <div className="tab-content">
        {activeTab === 'resumo' && <ResumoTab />}
        {activeTab === 'sessoes' && <SessionsTab />}
        {activeTab === 'personagens' && <PlayersTab />}
        {activeTab === 'ameacas' && <ThreatsTab />}
        {activeTab === 'notas' && <NotesTab />}
        {activeTab === 'npcs' && (
          <NpcTab
            campaign={campaign}
            onUpdate={fetchCampaign}
            isOwner={campaign.isOwner}
          />
        )}
        {activeTab === 'combate' && <CombatTab />}
      </div>

      <CampaignModals />
      <CampaignStyles />
    </div>
  )
}

export default function CampaignDetailsPage() {
  return (
    <CampaignProvider>
      <CampaignDetailContent />
    </CampaignProvider>
  )
}
