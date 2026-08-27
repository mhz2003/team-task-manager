import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Project, Task } from '@/types'
import { loadFromStorage, saveToStorage, uid } from '@/utils/storage'

interface DataContextValue {
  projects: Project[]
  tasks: Task[]
  addProject: (p: Omit<Project, 'id' | 'createdAt'>) => Project
  updateProject: (id: string, patch: Partial<Project>) => void
  deleteProject: (id: string) => void
  addTask: (t: Omit<Task, 'id' | 'createdAt'>) => Task
  updateTask: (id: string, patch: Partial<Task>) => void
  deleteTask: (id: string) => void
  tasksForProject: (projectId: string) => Task[]
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

const PROJECTS_KEY = 'ttm_projects'
const TASKS_KEY = 'ttm_tasks'

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => loadFromStorage<Project[]>(PROJECTS_KEY, []))
  const [tasks, setTasks] = useState<Task[]>(() => loadFromStorage<Task[]>(TASKS_KEY, []))

  useEffect(() => saveToStorage(PROJECTS_KEY, projects), [projects])
  useEffect(() => saveToStorage(TASKS_KEY, tasks), [tasks])

  function addProject(p: Omit<Project, 'id' | 'createdAt'>) {
    const project: Project = { ...p, id: uid(), createdAt: new Date().toISOString() }
    setProjects((prev) => [...prev, project])
    return project
  }

  function updateProject(id: string, patch: Partial<Project>) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function deleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setTasks((prev) => prev.filter((t) => t.projectId !== id))
  }

  function addTask(t: Omit<Task, 'id' | 'createdAt'>) {
    const task: Task = { ...t, id: uid(), createdAt: new Date().toISOString() }
    setTasks((prev) => [...prev, task])
    return task
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function tasksForProject(projectId: string) {
    return tasks.filter((t) => t.projectId === projectId)
  }

  return (
    <DataContext.Provider
      value={{ projects, tasks, addProject, updateProject, deleteProject, addTask, updateTask, deleteTask, tasksForProject }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData باید داخل DataProvider استفاده شود')
  return ctx
}
