'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

const CLIENT_BUILD_ID = process.env.NEXT_PUBLIC_APP_BUILD_ID || 'dev'
const STORAGE_KEY = 'a-forja-build-id'
const CHECK_INTERVAL_MS = 3 * 60 * 1000 // 3 minutes
const MIN_CHECK_GAP_MS = 30 * 1000 // 30 seconds throttle between checks

function isUserTyping(): boolean {
  if (typeof document === 'undefined') return false
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName.toUpperCase()
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    const inputType = (el as HTMLInputElement).type?.toLowerCase()
    if (inputType !== 'button' && inputType !== 'submit' && inputType !== 'checkbox' && inputType !== 'radio') {
      return true
    }
  }
  if ((el as HTMLElement).isContentEditable) return true
  return false
}

export function PWAUpdater() {
  const pathname = usePathname()
  const [updateReady, setUpdateReady] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const lastCheckRef = useRef<number>(0)
  const pendingBuildIdRef = useRef<string | null>(null)
  const isReloadingRef = useRef<boolean>(false)

  const applyUpdate = useCallback(async (newBuildId?: string | null) => {
    if (isReloadingRef.current) return
    isReloadingRef.current = true
    setIsApplying(true)

    try {
      const targetBuild = newBuildId || pendingBuildIdRef.current || CLIENT_BUILD_ID
      try {
        localStorage.setItem(STORAGE_KEY, targetBuild)
      } catch {}

      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration()
        if (reg) {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' })
          }
          if (reg.active) {
            reg.active.postMessage({ type: 'CLEAR_CACHE', buildId: targetBuild })
          }
        }
      }

      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((key) => caches.delete(key)))
      }
    } catch {
      // Ignore cache clear errors and proceed with reload
    }

    window.location.reload()
  }, [])

  const triggerUpdateFlow = useCallback(
    (newBuildId?: string) => {
      if (isReloadingRef.current) return
      if (newBuildId) {
        pendingBuildIdRef.current = newBuildId
      }
      setUpdateReady(true)

      // If the user is not actively typing in a form field, update automatically
      if (!isUserTyping()) {
        setIsApplying(true)
        setTimeout(() => {
          applyUpdate(newBuildId)
        }, 1000)
      }
    },
    [applyUpdate]
  )

  const checkForUpdates = useCallback(
    async (force = false) => {
      if (typeof window === 'undefined' || !navigator.onLine || isReloadingRef.current) return

      const now = Date.now()
      if (!force && now - lastCheckRef.current < MIN_CHECK_GAP_MS) return
      lastCheckRef.current = now

      try {
        // 1. Trigger Service Worker script update check (bypassing HTTP cache)
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.getRegistration()
          if (reg) {
            await reg.update().catch(() => {})
            if (reg.waiting && navigator.serviceWorker.controller) {
              triggerUpdateFlow()
              return
            }
          }
        }

        // 2. Check server version endpoint to detect new deploys even if sw.js bytes didn't change
        const res = await fetch(`/api/version?t=${now}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        })

        if (!res.ok) return
        const data = await res.json()
        const serverBuildId: string | undefined = data?.buildId
        if (!serverBuildId || serverBuildId === 'dev') return

        let storedBuildId: string | null = null
        try {
          storedBuildId = localStorage.getItem(STORAGE_KEY)
        } catch {}

        // First run: save current build ID if none stored
        if (!storedBuildId) {
          try {
            localStorage.setItem(STORAGE_KEY, serverBuildId)
          } catch {}
          if (CLIENT_BUILD_ID !== 'dev' && serverBuildId !== CLIENT_BUILD_ID) {
            triggerUpdateFlow(serverBuildId)
          }
          return
        }

        // Compare server build ID with stored build ID and compiled client build ID
        if (
          serverBuildId !== storedBuildId ||
          (CLIENT_BUILD_ID !== 'dev' && serverBuildId !== CLIENT_BUILD_ID)
        ) {
          triggerUpdateFlow(serverBuildId)
        }
      } catch {
        // Silent fail when offline or network unstable
      }
    },
    [triggerUpdateFlow]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Store initial build ID if not present
    try {
      const existing = localStorage.getItem(STORAGE_KEY)
      if (!existing && CLIENT_BUILD_ID !== 'dev') {
        localStorage.setItem(STORAGE_KEY, CLIENT_BUILD_ID)
      }
    } catch {}

    // Register Service Worker with updateViaCache: 'none'
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { updateViaCache: 'none' })
        .then((reg) => {
          if (reg.waiting && navigator.serviceWorker.controller) {
            triggerUpdateFlow()
          }

          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            if (!newWorker) return

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                triggerUpdateFlow()
              }
            })
          })
        })
        .catch(() => {})

      let refreshing = false
      const handleControllerChange = () => {
        if (refreshing || isReloadingRef.current) return
        refreshing = true
        if (!isUserTyping()) {
          window.location.reload()
        } else {
          setUpdateReady(true)
        }
      }

      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
      }
    }
  }, [triggerUpdateFlow])

  // Check on mount, visibilitychange, focus, online, and interval
  useEffect(() => {
    checkForUpdates(true)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates(true)
      }
    }

    const handleFocus = () => {
      checkForUpdates( false )
    }

    const handleOnline = () => {
      checkForUpdates(true)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('online', handleOnline)

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        checkForUpdates(false)
      }
    }, CHECK_INTERVAL_MS)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('online', handleOnline)
      clearInterval(interval)
    }
  }, [checkForUpdates])

  // Also check on route navigation (throttled)
  useEffect(() => {
    checkForUpdates(false)
  }, [pathname, checkForUpdates])

  if (!updateReady) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        left: 20,
        maxWidth: 420,
        margin: '0 auto',
        background: 'var(--card)',
        border: '1px solid var(--accent)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px var(--accentGlow)',
        borderRadius: 12,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        zIndex: 9999,
        color: 'var(--fg)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RefreshCw
          size={18}
          color="var(--accentL)"
          style={{
            flexShrink: 0,
            animation: isApplying ? 'spin 1s linear infinite' : 'none',
          }}
        />
        <div style={{ fontSize: 13, lineHeight: 1.35 }}>
          <div style={{ fontWeight: 700, color: 'var(--fg)' }}>
            {isApplying ? 'Atualizando A Forja...' : 'Nova versão disponível!'}
          </div>
          <div style={{ color: 'var(--fg2)', fontSize: 12 }}>
            {isApplying
              ? 'Sincronizando com a versão mais recente do site.'
              : 'O site foi atualizado. Clique para sincronizar o app.'}
          </div>
        </div>
      </div>

      {!isApplying && (
        <button
          onClick={() => applyUpdate()}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Atualizar agora
        </button>
      )}
    </div>
  )
}

