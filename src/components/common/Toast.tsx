import { createContext, useCallback, useContext, useState, ReactNode } from 'react'
import styles from './Toast.module.scss'

type ToastKind = 'success' | 'error' | 'info'
interface ToastItem { id: string; message: string; kind: ToastKind }

interface ToastContextValue {
  showToast: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const kindClass: Record<ToastKind, string> = {
  success: styles.success,
  error: styles.error,
  info: styles.info,
}

const kindIcon: Record<ToastKind, string> = { success: '✓', error: '!', info: 'ℹ' }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, kind: ToastKind = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, kind }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.stack}>
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${kindClass[t.kind]}`}>
            <span>{kindIcon[t.kind]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast باید داخل ToastProvider استفاده شود')
  return ctx
}
