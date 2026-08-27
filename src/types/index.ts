export type Role = 'manager' | 'member'
export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface User {
  id: string
  fullName: string
  username: string
  password: string // demo-only: NOT for production, plaintext local storage
  role: Role
}

export interface Project {
  id: string
  title: string
  description: string
  createdAt: string // ISO date
  ownerId: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string // ISO date
  assigneeId: string
  createdAt: string
}

export interface TaskFilters {
  search: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  assigneeId: string | 'all'
  dueFrom: string
  dueTo: string
}
