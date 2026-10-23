'use client'

import React from 'react'
import Link from 'next/link'
import { Sword, Play } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function CombatTab() {
  const { id, campaign } = useCampaign()

  if (!campaign) return null

  return (
    <div className="combat-redirect-card">
      <Sword size={64} opacity={0.2} />
      <h2>Arena de Combate</h2>
      <p>Gerencie turnos, HP de ameaças e visualize o estado dos jogadores em tempo real.</p>
      <Link href={`/campanhas/${id}/combate`} className="btn btn-primary btn-lg">
        <Play size={20} /> {campaign.isOwner ? 'Entrar na Arena' : 'Ver Combate em Tempo Real'}
      </Link>
    </div>
  )
}
