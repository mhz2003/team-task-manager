import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'
import { loadFromStorage, saveToStorage, uid } from '@/utils/storage'

interface AuthContextValue {
  currentUser: User | null
  users: User[]
  login: (username: string, password: string) => { ok: boolean; message?: string }
  register: (fullName: string, username: string, password: string, role: User['role']) => { ok: boolean; message?: string }
  addMember: (fullName: string, username: string, password: string, role: User['role']) => { ok: boolean; message?: string }
  updateMember: (id: string, fullName: string, username: string, role: User['role'], password?: string) => { ok: boolean; message?: string }
  deleteMember: (id: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const USERS_KEY = 'ttm_users'
const SESSION_KEY = 'ttm_session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadFromStorage<User[]>(USERS_KEY, []))
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    loadFromStorage<User | null>(SESSION_KEY, null),
  )

  useEffect(() => saveToStorage(USERS_KEY, users), [users])
  useEffect(() => saveToStorage(SESSION_KEY, currentUser), [currentUser])

  function register(fullName: string, username: string, password: string, role: User['role']) {
    if (!fullName.trim() || !username.trim() || !password) {
      return { ok: false, message: 'همه فیلدها الزامی هستند.' }
    }
    if (users.some((u) => u.username === username)) {
      return { ok: false, message: 'این نام کاربری قبلاً ثبت شده است.' }
    }
    const newUser: User = { id: uid(), fullName, username, password, role }
    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)
    return { ok: true }
  }

  // Used by a manager on the "Users" page to add a teammate without switching the active session.
  function addMember(fullName: string, username: string, password: string, role: User['role']) {
    if (!fullName.trim() || !username.trim() || !password) {
      return { ok: false, message: 'همه فیلدها الزامی هستند.' }
    }
    if (users.some((u) => u.username === username)) {
      return { ok: false, message: 'این نام کاربری قبلاً ثبت شده است.' }
    }
    const newUser: User = { id: uid(), fullName, username, password, role }
    setUsers((prev) => [...prev, newUser])
    return { ok: true }
  }

  // password left empty means "keep the current one" — used from the edit-user form.
  function updateMember(id: string, fullName: string, username: string, role: User['role'], password?: string) {
    if (!fullName.trim() || !username.trim()) {
      return { ok: false, message: 'نام و نام کاربری الزامی هستند.' }
    }
    if (users.some((u) => u.username === username && u.id !== id)) {
      return { ok: false, message: 'این نام کاربری قبلاً ثبت شده است.' }
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, fullName, username, role, password: password ? password : u.password } : u)),
    )
    setCurrentUser((prev) =>
      prev && prev.id === id ? { ...prev, fullName, username, role, password: password ? password : prev.password } : prev,
    )
    return { ok: true }
  }

  function deleteMember(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  function login(username: string, password: string) {
    const found = users.find((u) => u.username === username && u.password === password)
    if (!found) return { ok: false, message: 'نام کاربری یا رمز عبور اشتباه است.' }
    setCurrentUser(found)
    return { ok: true }
  }

  function logout() {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, users, login, register, addMember, updateMember, deleteMember, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth باید داخل AuthProvider استفاده شود')
  return ctx
}
