'use client'

import React from 'react'

export default function CreatorStyles() {
  return (
    <style jsx global>{`
      .card-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 40px;
      }
      @media (max-width: 1200px) {
        .card-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 900px) {
        .card-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 600px) {
        .card-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
      }
      .bg-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 40px;
        align-items: start;
      }
      @media (max-width: 1200px) {
        .bg-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 900px) {
        .bg-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 768px) {
        .page-header {
          flex-direction: column;
          align-items: flex-start !important;
          gap: 16px !important;
          margin-bottom: 24px !important;
        }
        .header-text h1 {
          font-size: 20px !important;
        }
        .character-info-footer {
          display: none !important;
        }
      }
      @media (max-width: 480px) {
        .container {
          padding: 16px !important;
          padding-bottom: 120px !important;
        }
      }
    `}</style>
  )
}
