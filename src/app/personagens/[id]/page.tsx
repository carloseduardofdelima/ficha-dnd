'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { CharacterSheetProvider, useCharacterSheet } from '@/components/character-sheet/context/CharacterSheetContext'
import CharacterMobileMenu from '@/components/character-sheet/header/CharacterMobileMenu'
import CharacterHeader from '@/components/character-sheet/header/CharacterHeader'
import CharacterNavTabs from '@/components/character-sheet/header/CharacterNavTabs'
import CharacterModals from '@/components/character-sheet/modals/CharacterModals'

// Tab Components
import CombatTab from '@/components/character-sheet/tabs/CombatTab'
import AttributesTab from '@/components/character-sheet/tabs/AttributesTab'
import SkillsTab from '@/components/character-sheet/tabs/SkillsTab'
import SpellsTab from '@/components/character-sheet/tabs/SpellsTab'
import InventoryTab from '@/components/character-sheet/tabs/InventoryTab'
import FeaturesTab from '@/components/character-sheet/tabs/FeaturesTab'
import CompanionsTab from '@/components/character-sheet/tabs/CompanionsTab'
import NotesTab from '@/components/character-sheet/tabs/NotesTab'
import ProficienciesTab from '@/components/character-sheet/tabs/ProficienciesTab'
import AboutTab from '@/components/character-sheet/tabs/AboutTab'

function CharacterSheetView() {
  const { character, loading, activeTab } = useCharacterSheet()
  const router = useRouter()

  if (loading) {
    return (
      <div
        style={{
          background: 'var(--bg)',
          minHeight: '100vh',
          color: 'var(--fg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader2 className="animate-spin" size={36} color="var(--accent)" />
      </div>
    )
  }

  if (!character) {
    return (
      <div
        style={{
          background: 'var(--bg)',
          minHeight: '100vh',
          color: 'var(--fg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24 }}>Personagem não encontrado</h2>
        <button className="btn btn-primary" onClick={() => router.push('/personagens')}>
          Voltar para Personagens
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)', padding: '24px 0', position: 'relative' }}>
      <CharacterMobileMenu />

      <div className="container" style={{ maxWidth: '100%' }}>
        <CharacterHeader />

        {/* Main Content Layout */}
        <div className="sheet-layout">
          <div className="sheet-main" style={{ flex: 1, minWidth: 0 }}>
            <div className="card" style={{ padding: 0, overflow: 'visible' }}>
              <CharacterNavTabs />

              <div style={{ padding: 12 }}>
                {activeTab === 'combat' && <CombatTab />}
                {activeTab === 'attributes' && <AttributesTab />}
                {activeTab === 'skills' && <SkillsTab />}
                {activeTab === 'spells' && <SpellsTab />}
                {activeTab === 'inventory' && <InventoryTab />}
                {activeTab === 'features' && <FeaturesTab />}
                {activeTab === 'companions' && <CompanionsTab />}
                {activeTab === 'notes' && <NotesTab />}
                {activeTab === 'proficiencies' && <ProficienciesTab />}
                {activeTab === 'about' && <AboutTab />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CharacterModals />

      <style jsx global>{`
        .features-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .inventory-item-card:hover {
          background: rgba(255, 255, 255, 0.06) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }

        /* Attacks Section Visual Improvements */
        .attacks-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeUp 0.3s ease-out;
        }

        .attacks-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr 40px;
          padding: 8px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--fgM);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .attack-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr 1.5fr 40px;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg2);
          border: 1px solid var(--border);
          gap: 12px;
          transition: all 0.2s ease;
          position: relative;
        }

        .attack-row:hover {
          background: var(--card2);
          border-color: var(--accent);
          transform: scale(1.01);
          z-index: 10;
        }

        .atk-name {
          font-weight: 700;
          font-size: 15px;
          color: var(--fg);
        }

        .atk-type {
          font-size: 11px;
          color: var(--fgM);
        }

        .col-range {
          font-size: 13px;
          color: var(--fg2);
        }

        .hit-badge {
          background: var(--accentGlow);
          color: var(--accentL);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid rgba(225, 29, 72, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 90px;
        }

        .dmg-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }

        .dmg-value {
          font-weight: 800;
          font-size: 14px;
          color: var(--fg);
        }

        .dmg-type {
          font-size: 11px;
          color: var(--fg3);
          text-transform: capitalize;
        }

        .mobile-label {
          display: none;
        }

        @media (max-width: 768px) {
          .features-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .attack-row {
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 16px;
          }

          .col-atk {
            grid-column: 1 / -1;
            border-bottom: 1px solid var(--border);
            padding-bottom: 12px;
            margin-bottom: 4px;
          }

          .atk-name {
            font-size: 18px;
          }

          .col-range {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            color: var(--fg2);
          }

          .mobile-label {
            display: inline-block;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--fg3);
            margin-right: 4px;
          }

          .col-hit {
            grid-column: 1 / 2;
          }

          .col-dmg {
            grid-column: 2 / 3;
          }

          .col-info {
            position: absolute;
            top: 15px;
            right: 15px;
          }

          .hit-badge {
            width: 100%;
            height: 48px;
            font-size: 14px;
          }

          .dmg-box {
            width: 100%;
            height: 48px;
            justify-content: center;
          }

          .dmg-value {
            font-size: 16px;
          }
        }

        /* Attributes Section Improvements */
        .attributes-tab-container {
          display: flex;
          flex-direction: column;
        }

        .attributes-tab-container .resources-section {
          order: 1;
          margin-bottom: 24px;
        }

        .attributes-tab-container .attr-title {
          order: 2;
          margin-bottom: 20px;
          font-family: 'Cinzel', serif;
          font-size: 24px;
          font-weight: 700;
        }

        .attributes-tab-container .attr-grid-container {
          order: 3;
          margin-bottom: 24px;
        }

        .attributes-tab-container .combat-stats-row {
          order: 4;
          margin-top: 12px;
        }

        .combat-stats-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 24px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex: 1;
          max-width: 180px;
        }

        .stat-label {
          font-size: 10px;
          color: var(--fgM);
          font-weight: 700;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 0.05em;
          height: 14px;
        }

        .stat-value-box {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .stat-value-box:hover {
          border-color: var(--accent);
          box-shadow: 0 0 15px var(--accentGlow);
        }

        .stat-value {
          font-size: 36px;
          font-weight: 900;
          color: var(--fg);
          line-height: 1;
        }

        .stat-subtext {
          font-size: 10px;
          color: var(--fgM);
          text-align: center;
          width: 100%;
          line-height: 1.4;
          min-height: 14px;
        }

        .section-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 18px;
          margin-bottom: 12px;
          color: var(--accentL);
        }

        @media (max-width: 768px) {
          .attributes-tab-container .combat-stats-row {
            order: 1;
            margin-top: 0;
            margin-bottom: 24px;
            background: linear-gradient(to bottom right, rgba(225, 29, 72, 0.08), transparent);
          }

          .attributes-tab-container .resources-section {
            order: 2;
          }

          .attributes-tab-container .attr-title {
            order: 3;
          }

          .attributes-tab-container .attr-grid-container {
            order: 4;
          }

          .combat-stats-row {
            padding: 20px 16px;
            gap: 16px;
          }

          .stat-value {
            font-size: 32px;
          }

          .stat-value-box {
            padding: 8px 0;
          }
        }

        @keyframes dice-roll {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(5deg) scale(1.05);
          }
          50% {
            transform: rotate(0deg) scale(1);
          }
          75% {
            transform: rotate(-5deg) scale(1.05);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        .dice-rolling {
          animation: dice-roll 3s ease-in-out infinite;
        }

        @keyframes pulse-gold {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default function CharacterDetailPage() {
  return (
    <CharacterSheetProvider>
      <CharacterSheetView />
    </CharacterSheetProvider>
  )
}
