'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export interface CampaignContextType {
  id: string
  campaign: any
  setCampaign: React.Dispatch<React.SetStateAction<any>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  activeTab: string
  setActiveTab: (tab: string) => void
  session: any
  router: ReturnType<typeof useRouter>

  // Modals state
  showSessionModal: boolean
  setShowSessionModal: (show: boolean) => void
  showCharModal: boolean
  setShowCharModal: (show: boolean) => void
  myCharacters: any[]
  newSession: { id?: string; title: string; summary: string; number: number; date?: string }
  setNewSession: React.Dispatch<React.SetStateAction<any>>
  savingSession: boolean

  showNoteModal: boolean
  setShowNoteModal: (show: boolean) => void
  showMapDocModal: boolean
  setShowMapDocModal: (show: boolean) => void
  newNote: any
  setNewNote: React.Dispatch<React.SetStateAction<any>>
  savingNote: boolean
  uploadingImage: boolean
  setUploadingImage: (uploading: boolean) => void

  showSelectThreatModal: boolean
  setShowSelectThreatModal: (show: boolean) => void
  allGlobalThreats: any[]
  linkingThreat: boolean

  noteToDelete: string | null
  setNoteToDelete: (id: string | null) => void
  deletingNote: boolean

  charToUnlink: any | null
  setCharToUnlink: (char: any | null) => void
  unlinkingChar: boolean

  // Zoom Lightbox
  zoomImage: string | null
  setZoomImage: (url: string | null) => void
  zoomScale: number
  setZoomScale: React.Dispatch<React.SetStateAction<number>>
  panOffset: { x: number; y: number }
  setPanOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
  dragStart: { x: number; y: number }
  setDragStart: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>

  // Actions
  fetchCampaign: () => Promise<void>
  fetchMyCharacters: () => Promise<void>
  fetchGlobalThreats: () => Promise<void>
  handleLinkThreat: (threatId: string) => Promise<void>
  handleDeleteThreat: (threatId: string) => Promise<void>
  handleEditThreat: (threatId: string) => void
  handleDeleteSession: (sessionId: string) => Promise<void>
  handleDeleteNote: (e: React.MouseEvent, noteId: string) => void
  confirmDeleteNote: () => Promise<void>
  confirmUnlinkChar: () => Promise<void>
}

const CampaignContext = createContext<CampaignContextType | null>(null)

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const { id: rawId } = useParams()
  const id = Array.isArray(rawId) ? rawId[0] : (rawId || '')
  const router = useRouter()
  const { data: session } = useSession()

  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('resumo')

  const [showSessionModal, setShowSessionModal] = useState(false)
  const [showCharModal, setShowCharModal] = useState(false)
  const [myCharacters, setMyCharacters] = useState<any[]>([])
  const [newSession, setNewSession] = useState<any>({ title: '', summary: '', number: 1 })
  const [savingSession, setSavingSession] = useState(false)

  const [showNoteModal, setShowNoteModal] = useState(false)
  const [showMapDocModal, setShowMapDocModal] = useState(false)
  const [newNote, setNewNote] = useState<any>({ title: '', content: '', isPublic: false, isFixed: false, type: 'text', imageUrl: '' })
  const [savingNote, setSavingNote] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [showSelectThreatModal, setShowSelectThreatModal] = useState(false)
  const [allGlobalThreats, setAllGlobalThreats] = useState<any[]>([])
  const [linkingThreat, setLinkingThreat] = useState(false)

  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const [deletingNote, setDeletingNote] = useState(false)

  const [charToUnlink, setCharToUnlink] = useState<any | null>(null)
  const [unlinkingChar, setUnlinkingChar] = useState(false)

  // Zoom & Pan for Map / Documents
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [zoomScale, setZoomScale] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  async function fetchMyCharacters() {
    try {
      const res = await fetch('/api/personagens')
      if (res.ok) {
        const data = await res.json()
        setMyCharacters(data)
      }
    } catch (error) {
      console.error('Error fetching characters:', error)
    }
  }

  async function fetchCampaign() {
    try {
      const res = await fetch(`/api/campanhas/${id}`)
      if (res.ok) {
        const data = await res.json()
        setCampaign(data)
      } else {
        router.push('/campanhas')
      }
    } catch (error) {
      console.error('Error fetching campaign:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchGlobalThreats = async () => {
    try {
      const res = await fetch('/api/ameacas?summary=true')
      const data = await res.json()
      const campaignThreatIds = campaign?.threats?.map((t: any) => t.id) || []
      setAllGlobalThreats(data.filter((t: any) => !campaignThreatIds.includes(t.id)))
    } catch (e) {
      console.error(e)
    }
  }

  const handleLinkThreat = async (threatId: string) => {
    setLinkingThreat(true)
    try {
      const detailRes = await fetch(`/api/ameacas/${threatId}`)
      if (!detailRes.ok) return
      const sourceThreat = await detailRes.json()

      const res = await fetch('/api/ameacas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sourceThreat,
          campaignId: id,
          isTemplate: false,
          id: undefined,
          attributes: { ...sourceThreat.attributes, id: undefined, threatId: undefined },
          combat: { ...sourceThreat.combat, id: undefined, threatId: undefined },
          actions: sourceThreat.actions?.map((a: any) => ({ ...a, id: undefined, threatId: undefined })),
          skills: sourceThreat.skills?.map((s: any) => ({ ...s, id: undefined, threatId: undefined }))
        })
      })

      if (res.ok) {
        await fetchCampaign()
        setShowSelectThreatModal(false)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLinkingThreat(false)
    }
  }

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Deseja realmente excluir esta sessão?')) return
    try {
      const res = await fetch(`/api/campanhas/${id}/sessoes/${sessionId}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchCampaign()
      }
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  const handleDeleteNote = async (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    setNoteToDelete(noteId)
  }

  const confirmDeleteNote = async () => {
    if (!noteToDelete) return
    setDeletingNote(true)
    try {
      const res = await fetch(`/api/campanhas/${id}/notas/${noteToDelete}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchCampaign()
        setNoteToDelete(null)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    } finally {
      setDeletingNote(false)
    }
  }

  const confirmUnlinkChar = async () => {
    if (!charToUnlink) return
    setUnlinkingChar(true)
    try {
      const res = await fetch(`/api/campanhas/${id}/personagens?characterId=${charToUnlink.id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        await fetchCampaign()
        setCharToUnlink(null)
      }
    } catch (error) {
      console.error('Error unlinking character:', error)
    } finally {
      setUnlinkingChar(false)
    }
  }

  const handleDeleteThreat = async (threatId: string) => {
    if (!confirm('Deseja realmente remover esta ameaça da campanha?')) return
    try {
      const res = await fetch(`/api/ameacas/${threatId}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchCampaign()
      }
    } catch (error) {
      console.error('Error deleting threat:', error)
    }
  }

  const handleEditThreat = (threatId: string) => {
    router.push(`/ameacas/${threatId}`)
  }

  useEffect(() => {
    if (id) {
      fetchCampaign()
      fetchMyCharacters()
    }
  }, [id])

  return (
    <CampaignContext.Provider
      value={{
        id,
        campaign,
        setCampaign,
        loading,
        setLoading,
        activeTab,
        setActiveTab,
        session,
        router,

        showSessionModal,
        setShowSessionModal,
        showCharModal,
        setShowCharModal,
        myCharacters,
        newSession,
        setNewSession,
        savingSession,

        showNoteModal,
        setShowNoteModal,
        showMapDocModal,
        setShowMapDocModal,
        newNote,
        setNewNote,
        savingNote,
        uploadingImage,
        setUploadingImage,

        showSelectThreatModal,
        setShowSelectThreatModal,
        allGlobalThreats,
        linkingThreat,

        noteToDelete,
        setNoteToDelete,
        deletingNote,

        charToUnlink,
        setCharToUnlink,
        unlinkingChar,

        zoomImage,
        setZoomImage,
        zoomScale,
        setZoomScale,
        panOffset,
        setPanOffset,
        isDragging,
        setIsDragging,
        dragStart,
        setDragStart,

        fetchCampaign,
        fetchMyCharacters,
        fetchGlobalThreats,
        handleLinkThreat,
        handleDeleteThreat,
        handleEditThreat,
        handleDeleteSession,
        handleDeleteNote,
        confirmDeleteNote,
        confirmUnlinkChar,
      }}
    >
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}
