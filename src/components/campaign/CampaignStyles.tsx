'use client'

import React from 'react'

export default function CampaignStyles() {
  return (
    <style jsx global>{`
      /* Custom Checkbox Styling */
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
        font-size: 14px;
        color: var(--fg2);
        transition: color 0.2s;
      }

      .checkbox-container:hover {
        color: var(--fg);
      }

      .checkbox-input {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid var(--border);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.02);
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        outline: none;
      }

      .checkbox-input:hover {
        border-color: var(--accentL);
        background: rgba(255, 255, 255, 0.05);
      }

      .checkbox-input:checked {
        background: var(--accent);
        border-color: var(--accent);
        box-shadow: 0 0 10px var(--accentGlow);
      }

      .checkbox-input:checked::after {
        content: '';
        width: 6px;
        height: 11px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-bottom: 2px;
      }

      .checkbox-input:focus-visible {
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
      }

      .campaign-detail-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .campaign-banner {
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 32px;
        position: relative;
        overflow: hidden;
      }

      .back-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: transparent;
        border: none;
        color: var(--fg3);
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 24px;
        transition: color 0.2s;
      }

      .back-btn:hover {
        color: var(--fg);
      }

      .banner-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 40px;
      }

      .campaign-title {
        font-family: 'Cinzel', serif;
        font-size: 40px;
        color: var(--accentL);
        margin: 0 0 12px 0;
      }

      .campaign-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        color: white;
        font-size: 14px;
        font-weight: 600;
      }

      .dot {
        opacity: 0.3;
      }

      .status-tag {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 800;
        font-size: 12px;
        text-transform: uppercase;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
      }

      @keyframes pulse-dot {
        0% {
          transform: scale(0.9);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
          box-shadow: 0 0 8px currentColor;
        }
        100% {
          transform: scale(0.9);
          opacity: 0.8;
        }
      }

      .banner-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: flex-end;
      }

      @media (max-width: 768px) {
        .banner-actions {
          align-items: center;
          width: 100%;
          margin-top: 20px;
        }

        .progress-widget {
          width: 100% !important;
        }
      }

      .progress-widget {
        width: 300px;
        background: rgba(0, 0, 0, 0.4);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid var(--border);
        backdrop-filter: blur(8px);
      }

      .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 800;
        color: var(--fg2);
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .progress-bar-bg {
        height: 8px;
        background: var(--bg);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accentL));
        border-radius: 4px;
      }

      .tabs-nav {
        display: flex;
        gap: 8px;
        padding: 4px;
        background: var(--bg2);
        border-radius: 12px;
        border: 1px solid var(--border);
        overflow-x: auto;
      }

      .tab-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        border: none;
        background: transparent;
        color: var(--fg3);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 8px;
        white-space: nowrap;
        transition: all 0.2s;
      }

      .tab-btn:hover {
        color: var(--fg);
        background: rgba(255, 255, 255, 0.05);
      }

      .tab-btn.active {
        background: var(--accentGlow);
        color: var(--accentL);
      }

      .tab-content {
        min-height: 400px;
      }

      .resumo-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 24px;
      }

      .resumo-section {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
      }

      .resumo-section h3 {
        font-family: 'Cinzel', serif;
        font-size: 18px;
        color: var(--accentL);
        margin: 0 0 16px 0;
        border-bottom: 1px solid var(--border);
        padding-bottom: 8px;
      }

      .resumo-section p {
        color: var(--fg2);
        line-height: 1.6;
        white-space: pre-wrap;
        margin: 0;
      }

      .sidebar-card {
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 20px;
      }

      .sidebar-card h4 {
        font-size: 12px;
        font-weight: 800;
        color: var(--fg3);
        text-transform: uppercase;
        margin: 0 0 16px 0;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 16px;
      }

      .info-item label {
        font-size: 11px;
        color: var(--fg3);
        font-weight: 700;
      }

      .info-item span {
        font-size: 14px;
        color: var(--fg);
        font-weight: 600;
      }

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .list-header h3 {
        font-family: 'Cinzel', serif;
        font-size: 24px;
        color: var(--fg);
        margin: 0;
      }

      .empty-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px;
        background: var(--bg2);
        border: 2px dashed var(--border);
        border-radius: 20px;
        color: var(--fg3);
        text-align: center;
      }

      .sessions-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .session-card {
        display: flex;
        gap: 20px;
        background: var(--card);
        border: 1px solid var(--border);
        padding: 20px;
        border-radius: 12px;
      }

      .session-num {
        font-family: 'Cinzel', serif;
        font-size: 24px;
        color: var(--accentL);
        opacity: 0.5;
      }

      .session-info h4 {
        margin: 0 0 8px 0;
        color: var(--fg);
      }

      .session-info p {
        font-size: 14px;
        color: var(--fg2);
        margin: 0 0 12px 0;
      }

      .session-date {
        font-size: 12px;
        color: var(--fg3);
        font-weight: 700;
      }

      .chars-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
      }

      .char-mini-card {
        display: flex;
        align-items: center;
        gap: 16px;
        background: var(--card);
        border: 1px solid var(--border);
        padding: 12px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .char-mini-card:hover {
        border-color: var(--accent);
        background: var(--bg2);
      }

      .char-mini-card img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        object-fit: cover;
      }

      .char-placeholder {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: var(--accentGlow);
        color: var(--accentL);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 800;
      }

      .char-details {
        display: flex;
        flex-direction: column;
      }

      .char-name {
        font-weight: 700;
        color: var(--fg);
      }

      .char-meta {
        font-size: 11px;
        color: var(--fg3);
      }

      .char-picker-list {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
      }

      .char-picker-item {
        padding: 12px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--fg);
        text-align: left;
        cursor: pointer;
      }

      .char-picker-item:hover {
        background: var(--accentGlow);
        border-color: var(--accent);
      }

      .notes-grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .note-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: relative;
      }

      .note-card.editable {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .note-card.editable:hover {
        border-color: var(--accentL);
        background: rgba(255, 255, 255, 0.02);
      }

      .note-card.fixed {
        border-color: var(--accent);
        box-shadow: 0 0 10px var(--accentGlow);
      }

      .note-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .note-header h4 {
        margin: 0;
        color: var(--fg);
        font-family: 'Cinzel', serif;
      }

      .public-tag {
        font-size: 10px;
        background: #10b981;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 800;
        text-transform: uppercase;
      }

      .note-content {
        font-size: 14px;
        color: var(--fg2);
        line-height: 1.5;
        white-space: pre-wrap;
        flex: 1;
      }

      .note-footer {
        font-size: 11px;
        color: var(--fg3);
        border-top: 1px solid var(--border);
        padding-top: 8px;
      }

      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }

      .modal-content {
        background: var(--card);
        width: 100%;
        max-width: 500px;
        border-radius: 20px;
        border: 1px solid var(--border);
        overflow: hidden;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
      }

      .modal-header {
        padding: 24px;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, var(--bg2), transparent);
      }

      .modal-form {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .form-group label {
        font-size: 11px;
        font-weight: 800;
        color: var(--fg3);
        text-transform: uppercase;
      }

      .form-group input,
      .form-group textarea {
        padding: 12px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        color: var(--fg);
        outline: none;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .close-btn {
        background: transparent;
        border: none;
        color: var(--fg3);
        cursor: pointer;
      }

      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        font-family: 'Cinzel', serif;
        color: var(--accentL);
        font-size: 24px;
      }

      .threats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
      }

      .threat-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 20px;
        display: flex;
        gap: 16px;
        position: relative;
        transition: all 0.2s;
      }

      .threat-card:hover {
        border-color: var(--accent);
        transform: translateY(-2px);
      }

      .threat-type-icon {
        width: 40px;
        height: 40px;
        background: var(--bg2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .threat-info {
        flex: 1;
      }

      .threat-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .threat-main h4 {
        margin: 0;
        font-family: 'Cinzel', serif;
        font-size: 18px;
        color: var(--fg);
      }

      .threat-tag {
        font-size: 9px;
        font-weight: 800;
        background: var(--accentGlow);
        color: var(--accentL);
        padding: 2px 6px;
        border-radius: 4px;
      }

      .threat-stats {
        display: flex;
        gap: 12px;
        font-size: 12px;
        font-weight: 700;
        color: var(--fg2);
        margin-bottom: 12px;
      }

      .threat-desc-short {
        font-size: 13px;
        color: var(--fg3);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .threat-actions-btns {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .btn-icon {
        background: var(--bg2);
        border: 1px solid var(--border);
        color: var(--fg3);
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .btn-icon:hover {
        color: var(--fg);
        border-color: var(--fg3);
      }

      .btn-icon.danger:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }

      /* Modal Enhancements */
      .modal-content.wide {
        max-width: 800px;
      }

      .modal-form.scrollable {
        max-height: 80vh;
        overflow-y: auto;
        padding-right: 12px;
      }

      .form-section {
        background: rgba(255, 255, 255, 0.02);
        padding: 16px;
        border-radius: 12px;
        border: 1px solid var(--border);
        margin-bottom: 24px;
      }

      .form-section h4 {
        font-family: 'Cinzel', serif;
        font-size: 14px;
        color: var(--accentL);
        margin: 0 0 16px 0;
        text-transform: uppercase;
      }

      .attributes-input-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 12px;
      }

      .attr-input {
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: center;
      }

      .attr-input label {
        font-size: 10px;
        font-weight: 800;
        color: var(--fg3);
      }

      .attr-input input {
        width: 100%;
        text-align: center;
        padding: 8px !important;
      }

      @media (max-width: 768px) {
        .banner-content {
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left;
          gap: 24px;
        }

        .progress-widget {
          width: 100%;
          margin-left: 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .resumo-grid {
          grid-template-columns: 1fr !important;
        }

        .campaign-title {
          font-size: 28px !important;
          line-height: 1.2;
        }
      }

      .btn-icon-sm {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--fg3);
        width: 28px;
        height: 28px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-icon-sm:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--fg);
        border-color: var(--fg3);
      }

      .btn-icon-sm.danger:hover {
        background: #ef4444;
        color: white;
        border-color: #ef4444;
      }

      .combat-redirect-card {
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 80px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 20px;
        margin-top: 24px;
      }
      .combat-redirect-card h2 {
        font-family: 'Cinzel', serif;
        margin: 0;
      }
      .combat-redirect-card p {
        color: var(--fg3);
        max-width: 400px;
        margin-bottom: 20px;
      }

      @media (max-width: 640px) {
        .campaign-banner {
          padding: 32px 20px;
        }

        .tabs-nav {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          background: transparent;
          border: none;
          padding: 0;
        }

        .tab-btn {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 8px;
          justify-content: center;
          font-size: 13px;
          width: 100%;
        }

        .tab-btn.active {
          background: var(--accentGlow);
          border-color: var(--accent);
        }

        .sessions-grid,
        .chars-grid,
        .notes-grid-layout,
        .threats-grid {
          grid-template-columns: 1fr !important;
        }

        .session-card {
          flex-direction: column;
          gap: 12px;
        }

        .modal-content {
          margin: 0;
          width: 100%;
          height: 100%;
          max-height: 100vh;
          border-radius: 0;
        }
      }

      .sidebar-editable-input {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--fg);
        font-size: 13px;
        padding: 4px 8px;
        border-radius: 6px;
        outline: none;
        width: 100%;
        transition: all 0.2s;
      }

      .sidebar-editable-input:focus {
        border-color: var(--accentL);
        background: rgba(0, 0, 0, 0.2);
      }

      .status-select {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        padding-right: 28px;
      }

      .status-badge {
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 6px;
        letter-spacing: 0.05em;
      }

      .status-badge.status-ativo {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.2);
      }

      .status-badge.status-em-pausa {
        background: rgba(245, 158, 11, 0.1);
        color: #f59e0b;
        border: 1px solid rgba(245, 158, 11, 0.2);
      }

      .status-badge.status-finalizado {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        border: 1px solid rgba(59, 130, 246, 0.2);
      }

      .editable-textarea {
        width: 100%;
        min-height: 120px;
        background: transparent;
        border: 1px solid transparent;
        color: var(--fg2);
        font-family: inherit;
        font-size: 14px;
        line-height: 1.6;
        padding: 8px;
        border-radius: 8px;
        resize: vertical;
        outline: none;
        transition: all 0.2s;
      }

      .editable-textarea:hover {
        background: rgba(255, 255, 255, 0.02);
        border-color: var(--border);
      }

      .editable-textarea:focus {
        background: rgba(0, 0, 0, 0.2);
        border-color: var(--accentL);
        color: var(--fg);
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
      }

      .master-notes:focus {
        border-color: #f43f5e;
        box-shadow: 0 0 15px rgba(244, 63, 94, 0.1);
      }

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        gap: 16px;
      }

      .header-title-meta {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .header-title-meta h3 {
        margin: 0;
        font-family: 'Cinzel', serif;
      }

      .target-sessions-badge {
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(244, 63, 94, 0.1);
        padding: 6px 14px;
        border-radius: 10px;
        border: 1px solid rgba(244, 63, 94, 0.2);
        transition: all 0.3s;
      }

      .target-sessions-badge:hover {
        background: rgba(244, 63, 94, 0.15);
        border-color: rgba(244, 63, 94, 0.4);
      }

      .badge-label {
        font-size: 10px;
        text-transform: uppercase;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 0.05em;
      }

      .target-input {
        background: transparent;
        border: none;
        color: #ffe4e6;
        font-weight: 800;
        width: 32px;
        padding: 0;
        font-size: 14px;
        outline: none;
        text-align: center;
        -moz-appearance: textfield;
      }

      .target-input::-webkit-outer-spin-button,
      .target-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      @media (max-width: 640px) {
        .list-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 20px;
        }

        .header-title-meta {
          width: 100%;
          justify-content: space-between;
          gap: 12px;
        }

        .header-title-meta h3 {
          font-size: 18px;
        }

        .target-sessions-badge {
          padding: 4px 10px;
        }

        .btn-new-session {
          width: 100%;
          padding: 16px;
          font-size: 14px;
          justify-content: center;
        }
      }

      .tabs-nav {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .type-tag {
        font-size: 10px;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 800;
        text-transform: uppercase;
      }

      .map-tag {
        background: #2563eb;
      }

      .doc-tag {
        background: #d97706;
      }

      .note-card-image-container:hover .note-card-image-overlay {
        background: rgba(0, 0, 0, 0.4) !important;
      }

      .note-card-image-container .zoom-btn {
        opacity: 0.85;
        transition: all 0.2s;
      }

      .note-card-image-container:hover .zoom-btn {
        opacity: 1;
        transform: scale(1.05);
      }

      .upload-box:hover .upload-overlay-hover {
        opacity: 1 !important;
      }
    `}</style>
  )
}
