// Simple typed localStorage wrapper — swap this file for a real API client later.
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — ignored for demo purposes
  }
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function isDueSoon(dueDateISO: string, withinDays = 2): boolean {
  const due = new Date(dueDateISO).getTime()
  const now = Date.now()
  const diff = due - now
  return diff >= 0 && diff <= withinDays * 24 * 60 * 60 * 1000
}

export function isOverdue(dueDateISO: string): boolean {
  return new Date(dueDateISO).getTime() < Date.now()
}

export function formatDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fa-IR')
}
