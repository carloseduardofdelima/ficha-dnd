'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ChevronLeft, Maximize, Minimize, Shield, Sword, 
  Info, Zap, Skull, Wind, Eye, Flame, Map, Book,
  Menu, X
} from 'lucide-react'

export default function DMScreenPage() {
  const { id } = useParams()
  const router = useRouter()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [campaign, setCampaign] = useState<any>(null)
  const [activePanel, setActivePanel] = useState(0) // 0 to 3
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const panels = [
    { id: 0, label: 'Ações', icon: Sword },
    { id: 1, label: 'Condições I', icon: Skull },
    { id: 2, label: 'Condições II', icon: Zap },
    { id: 3, label: 'Perícias', icon: Book },
  ]

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/campanhas/${id}`)
        if (res.ok) {
          const data = await res.json()
          setCampaign(data)
        }
      } catch (error) {
        console.error('Error fetching campaign:', error)
      }
    }
    fetchCampaign()
  }, [id])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className={`dm-screen-page ${isFullscreen ? 'is-fullscreen' : ''}`}>
      <header className="screen-header">
        <div className="header-left">
          <button onClick={() => router.push(`/campanhas/${id}`)} className="back-btn">
            <ChevronLeft size={20} /> Sair
          </button>
          <div className="title-stack">
            <h1>Escudo do Mestre</h1>
            {campaign && <span className="campaign-name">{campaign.name}</span>}
          </div>
        </div>
        <div className="header-right">
          <button onClick={toggleFullscreen} className="fullscreen-btn">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            {isFullscreen ? 'Sair Tela Cheia' : 'Tela Cheia'}
          </button>
        </div>
      </header>

      <div className="screen-grid">
        {/* PANEL 1: COMBATE */}
        <section className={`screen-panel ${activePanel === 0 ? 'mobile-active' : 'mobile-hidden'}`}>
          <div className="panel-header">
            <Sword size={18} />
            <h2>Ações em Combate</h2>
          </div>
          <div className="panel-content">
            <div className="rule-group">
              <h3>Ações Principais</h3>
              <ul>
                <li><strong style={{ color: '#ef4444' }}>Ataque:</strong> Um ataque corpo-a-corpo ou à distância.</li>
                <li><strong style={{ color: '#ef4444' }}>Conjurar Magia:</strong> Tempo de conjuração de 1 ação.</li>
                <li><strong style={{ color: '#ef4444' }}>Correr:</strong> Ganha movimento extra igual ao seu deslocamento.</li>
                <li><strong style={{ color: '#ef4444' }}>Desengajar:</strong> Seu movimento não provoca ataques de oportunidade.</li>
                <li><strong style={{ color: '#ef4444' }}>Esquivar:</strong> Ataques contra você têm desvantagem; testes de Destreza têm vantagem.</li>
                <li><strong style={{ color: '#ef4444' }}>Ajudar:</strong> Dá vantagem ao teste ou ataque de um aliado.</li>
                <li><strong style={{ color: '#ef4444' }}>Esconder:</strong> Teste de Destreza (Furtividade) para se ocultar.</li>
                <li><strong style={{ color: '#ef4444' }}>Preparar:</strong> Define um gatilho para uma reação futura.</li>
                <li><strong style={{ color: '#ef4444' }}>Usar Objeto:</strong> Interagir com um segundo objeto ou um complexo.</li>
                <li><strong style={{ color: '#ef4444' }}>Agarrar/Empurrar:</strong> Teste de Atletismo vs Atletismo/Acrobacia.</li>
              </ul>
            </div>
            <div className="rule-group">
              <h3>Movimento</h3>
              <ul>
                <li><strong style={{ color: '#ef4444' }}>Levantar-se:</strong> Custa metade do seu deslocamento.</li>
                <li><strong style={{ color: '#ef4444' }}>Terreno Difícil:</strong> Custa 1m extra para cada 1m movido.</li>
                <li><strong style={{ color: '#ef4444' }}>Rastejar:</strong> Terreno difícil (custa 1m extra).</li>
                <li><strong style={{ color: '#ef4444' }}>Saltar:</strong> Força em pés (correndo) ou metade (parado).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PANEL 2: CONDIÇÕES (A-E) */}
        <section className={`screen-panel ${activePanel === 1 ? 'mobile-active' : 'mobile-hidden'}`}>
          <div className="panel-header">
            <Skull size={18} />
            <h2>Condições (A-I)</h2>
          </div>
          <div className="panel-content">
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Agarrado:</strong> Deslocamento 0. Termina se o agarrador for incapacitado.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Amedrontado:</strong> Desvantagem em testes e ataques enquanto a fonte estiver visível. Não pode se aproximar.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Atordoado:</strong> Incapacitado, não pode se mover. Falha em testes de Força e Destreza. Ataques têm vantagem contra ele.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Caído:</strong> Só pode rastejar. Desvantagem em ataques. Ataques de quem está a 1,5m têm vantagem.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Cego:</strong> Falha automática em testes que requerem visão. Ataques contra têm vantagem; seus ataques têm desvantagem.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Enfeitiçado:</strong> Não pode atacar quem o enfeitiçou. O enfeitiçador tem vantagem em interações sociais.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Envenenado:</strong> Desvantagem em jogadas de ataque e testes de habilidade.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Incapacitado:</strong> Não pode realizar ações ou reações.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Invisível:</strong> Vantagem em ataques; ataques contra têm desvantagem. Impossível de ser visto sem magia/sentidos.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Surdo:</strong> Falha automática em testes que requerem audição.
            </div>
          </div>
        </section>

        {/* PANEL 3: CONDIÇÕES (P-Z) & REGRAS */}
        <section className={`screen-panel ${activePanel === 2 ? 'mobile-active' : 'mobile-hidden'}`}>
          <div className="panel-header">
            <Zap size={18} />
            <h2>Condições & Concentração</h2>
          </div>
          <div className="panel-content">
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Paralisado:</strong> Incapacitado, não se move. Falha em For e Des. Ataques a 1,5m são críticos automáticos.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Petrificado:</strong> Peso aumenta 10x. Incapacitado. Resistência a todos os danos. Imune a veneno/doença.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Preso:</strong> Deslocamento 0. Desvantagem em ataques e testes de Des. Ataques contra têm vantagem.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Inconsciente:</strong> Incapacitado, cai no chão. Falha em For e Des. Ataques a 1,5m são críticos.
            </div>
            <div className="condition-item">
              <strong style={{ color: '#ef4444' }}>Exaustão:</strong> 1: Desv. em testes; 2: Desl. 1/2; 3: Desv. em ataques/salv; 4: PV 1/2; 5: Desl. 0; 6: Morte.
            </div>
            
            <div className="rule-group" style={{ marginTop: '16px' }}>
              <h3>Concentração</h3>
              <p>Quebra se:</p>
              <ul>
                <li>Conjurar outra magia de concentração.</li>
                <li>Sofrer dano: Teste de Res. de Con (CD 10 ou metade do dano sofrido).</li>
                <li>Ficar incapacitado ou morrer.</li>
              </ul>
            </div>

            <div className="rule-group">
              <h3>Dificuldades (CD)</h3>
              <table className="mini-table">
                <thead>
                  <tr><th>Dificuldade</th><th>CD</th></tr>
                </thead>
                <tbody>
                  <tr><td>Muito Fácil</td><td>5</td></tr>
                  <tr><td>Fácil</td><td>10</td></tr>
                  <tr><td>Médio</td><td>15</td></tr>
                  <tr><td>Difícil</td><td>20</td></tr>
                  <tr><td>Muito Difícil</td><td>25</td></tr>
                  <tr><td>Impossível</td><td>30</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PANEL 4: PERÍCIAS */}
        <section className={`screen-panel ${activePanel === 3 ? 'mobile-active' : 'mobile-hidden'}`}>
          <div className="panel-header">
            <Book size={18} />
            <h2>Perícias & Atributos</h2>
          </div>
          <div className="panel-content">
            <div className="rule-group">
              <table className="mini-table">
                <thead>
                  <tr><th>Perícia</th><th>Atributo</th></tr>
                </thead>
                <tbody>
                  <tr><td>Acrobacia</td><td>Destreza</td></tr>
                  <tr><td>Adestrar Animais</td><td>Sabedoria</td></tr>
                  <tr><td>Arcanismo</td><td>Inteligência</td></tr>
                  <tr><td>Atletismo</td><td>Força</td></tr>
                  <tr><td>Atuação</td><td>Carisma</td></tr>
                  <tr><td>Enganação</td><td>Carisma</td></tr>
                  <tr><td>Furtividade</td><td>Destreza</td></tr>
                  <tr><td>História</td><td>Inteligência</td></tr>
                  <tr><td>Intimidação</td><td>Carisma</td></tr>
                  <tr><td>Intuição</td><td>Sabedoria</td></tr>
                  <tr><td>Investigação</td><td>Inteligência</td></tr>
                  <tr><td>Medicina</td><td>Sabedoria</td></tr>
                  <tr><td>Natureza</td><td>Inteligência</td></tr>
                  <tr><td>Percepção</td><td>Sabedoria</td></tr>
                  <tr><td>Persuasão</td><td>Carisma</td></tr>
                  <tr><td>Prestidigitação</td><td>Destreza</td></tr>
                  <tr><td>Religião</td><td>Inteligência</td></tr>
                  <tr><td>Sobrevivência</td><td>Sabedoria</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="rule-group">
              <h3>Testes de Resistência</h3>
              <ul className="grid-list">
                <li><strong style={{ color: '#ef4444' }}>FOR:</strong> Empurrar, Agarrar.</li>
                <li><strong style={{ color: '#ef4444' }}>DES:</strong> Magias de área, Armadilhas.</li>
                <li><strong style={{ color: '#ef4444' }}>CON:</strong> Resistir a veneno, Frio.</li>
                <li><strong style={{ color: '#ef4444' }}>INT:</strong> Ilusões, Ataque Mental.</li>
                <li><strong style={{ color: '#ef4444' }}>SAB:</strong> Charme, Medo.</li>
                <li><strong style={{ color: '#ef4444' }}>CAR:</strong> Banimento, Possessão.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Mobile Menu */}
      <div className="mobile-only">
        <button 
          className="floating-menu-btn" 
          onClick={() => setShowMobileMenu(true)}
        >
          <Menu size={24} />
        </button>

        {showMobileMenu && (
          <div className="menu-overlay" onClick={() => setShowMobileMenu(false)}>
            <div className="menu-grid" onClick={e => e.stopPropagation()}>
              {panels.map((p) => (
                <button 
                  key={p.id} 
                  className={`menu-item ${activePanel === p.id ? 'active' : ''}`}
                  onClick={() => {
                    setActivePanel(p.id)
                    setShowMobileMenu(false)
                  }}
                >
                  <p.icon size={24} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
            <button className="menu-close" onClick={() => setShowMobileMenu(false)}>
              <X size={24} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .dm-screen-page {
          background: var(--bg);
          min-height: 100vh;
          padding: 24px;
          color: var(--fg);
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: all 0.3s;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .dm-screen-page {
            padding: 12px;
            gap: 12px;
          }

          .mobile-only {
            display: block;
          }

          .screen-panel.mobile-hidden {
            display: none !important;
          }

          .screen-panel.mobile-active {
            display: flex !important;
            flex: 1;
            margin: 0;
            min-height: calc(100vh - 150px);
          }

          .screen-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
        }

        .dm-screen-page.is-fullscreen {
          padding: 40px;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .screen-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .header-left h1 {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          color: var(--accentL);
          margin: 0;
          line-height: 1;
        }

        .title-stack {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .campaign-name {
          font-size: 12px;
          color: var(--fg3);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--fg2);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: var(--card);
          color: var(--fg);
        }

        .fullscreen-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--accent2), var(--accent));
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 4px 12px var(--accentGlow);
          transition: all 0.2s;
        }

        .fullscreen-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
        }

        .screen-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          flex: 1;
        }

        @media (max-width: 1200px) {
          .screen-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .screen-grid {
            grid-template-columns: 1fr;
          }
          
          .dm-screen-page {
            padding: 16px;
          }
          
          .header-left h1 {
            font-size: 20px;
          }
        }

        .screen-panel {
          background: #1a1a21; /* Slightly lighter than bg for the "screen" look */
          border: 2px solid #333;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          position: relative;
        }

        .screen-panel::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/parchment.png');
          opacity: 0.05;
          pointer-events: none;
        }

        .panel-header {
          background: #252530;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid #333;
        }

        .panel-header h2 {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          color: var(--accentL);
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .panel-content {
          padding: 24px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--fg2);
          overflow-y: auto;
          flex: 1;
        }

        .rule-group {
          margin-bottom: 24px;
        }

        .rule-group h3 {
          font-size: 15px;
          color: var(--fg);
          margin: 0 0 10px 0;
          border-bottom: 1px solid var(--border);
          padding-bottom: 6px;
          text-transform: uppercase;
        }

        .rule-group ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .rule-group li {
          margin-bottom: 4px;
        }

        .rule-group strong {
          color: var(--accentL);
        }

        .condition-item {
          background: rgba(0,0,0,0.2);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 6px;
          border-left: 3px solid var(--accent2);
        }

        .condition-item strong {
          color: var(--accentL);
          display: block;
          margin-bottom: 2px;
          text-transform: uppercase;
          font-size: 13px;
        }

        .mini-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
        }

        .mini-table th {
          text-align: left;
          background: rgba(255,255,255,0.05);
          padding: 6px 10px;
          color: var(--fg);
          font-size: 12px;
          text-transform: uppercase;
        }

        .mini-table td {
          padding: 6px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: var(--fg2);
          font-size: 13px;
        }

        .grid-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
        }

        /* Fullscreen tweaks */
        .is-fullscreen .screen-grid {
          height: calc(100vh - 120px);
        }
        /* Floating Menu Styles */
        .floating-menu-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 28px;
          background: #dc2626;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
          z-index: 1000;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .floating-menu-btn:hover {
          transform: scale(1.1);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 320px;
        }

        .menu-item {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--fg2);
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-item.active {
          background: rgba(220, 38, 38, 0.1);
          border-color: #dc2626;
          color: #ef4444;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.2);
        }

        .menu-item span {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .menu-close {
          margin-top: 40px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 56px;
          height: 56px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .menu-close:hover {
          background: rgba(255,255,255,0.2);
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  )
}
