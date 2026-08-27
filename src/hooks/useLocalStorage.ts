import { useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => loadFromStorage<T>(key, initial))

  useEffect(() => {
    saveToStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
