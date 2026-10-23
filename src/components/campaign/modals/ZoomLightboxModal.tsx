'use client'

import React from 'react'
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react'
import { useCampaign } from '../context/CampaignContext'

export default function ZoomLightboxModal() {
  const {
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
  } = useCampaign()

  if (!zoomImage) return null

  return (
    <div
      className="modal-overlay"
      onClick={() => setZoomImage(null)}
      style={{ background: 'rgba(0,0,0,0.95)', zIndex: 1100 }}
    >
      <div
        className="zoom-lightbox-content"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '90vw',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Topbar do lightbox */}
        <div style={{
          position: 'absolute',
          top: 16,
          left: 20,
          right: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 4))}
              title="Aumentar Zoom"
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '6px' }}
            >
              <ZoomIn size={16} /> Zoom +
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.5))}
              title="Diminuir Zoom"
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '6px' }}
            >
              <ZoomOut size={16} /> Zoom -
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setZoomScale(1)
                setPanOffset({ x: 0, y: 0 })
              }}
              title="Resetar"
              style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '6px' }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          <button
            className="close-btn"
            onClick={() => setZoomImage(null)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Fechar visualizador"
          >
            <X size={24} />
          </button>
        </div>

        {/* Hint message */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          color: 'rgba(255,255,255,0.7)',
          fontSize: '12px',
          background: 'rgba(0,0,0,0.6)',
          padding: '6px 12px',
          borderRadius: '20px',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          Use os botões acima para controlar o zoom, ou clique e arraste para mover o mapa.
        </div>

        {/* Image Container with dragging support */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isDragging ? 'grabbing' : zoomScale > 1 ? 'grab' : 'default',
            overflow: 'hidden'
          }}
          onMouseDown={(e) => {
            if (zoomScale <= 1) return
            setIsDragging(true)
            setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
          }}
          onMouseMove={(e) => {
            if (!isDragging) return
            setPanOffset({
              x: e.clientX - dragStart.x,
              y: e.clientY - dragStart.y
            })
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <img
            src={zoomImage}
            alt="Map/Document Zoomed"
            draggable={false}
            style={{
              maxHeight: '90%',
              maxWidth: '90%',
              objectFit: 'contain',
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              userSelect: 'none'
            }}
          />
        </div>
      </div>
    </div>
  )
}
