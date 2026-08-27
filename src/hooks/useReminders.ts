import { useMemo } from 'react'
import { Project, Task } from '@/types'
import { isDueSoon, isOverdue } from '@/utils/storage'

export interface Reminder {
  task: Task
  project: Project | undefined
  overdue: boolean
}

// Plain function so it can be called both from a render (useReminders below)
// and from inside a setInterval callback (useDueReminders), without either
// one depending on the other's re-render timing.
export function computeReminders(tasks: Task[], projects: Project[], userId: string | undefined): Reminder[] {
  if (!userId) return []

  return tasks
    .filter((t) => t.assigneeId === userId && t.status !== 'done' && t.dueDate)
    .filter((t) => isOverdue(t.dueDate) || isDueSoon(t.dueDate))
    .map((task) => ({
      task,
      project: projects.find((p) => p.id === task.projectId),
      overdue: isOverdue(task.dueDate),
    }))
    .sort((a, b) => new Date(a.task.dueDate).getTime() - new Date(b.task.dueDate).getTime())
}

// Used by the UI (bell dropdown, projects page panel) — recomputes whenever
// the underlying data changes.
export function useReminders(tasks: Task[], projects: Project[], userId: string | undefined): Reminder[] {
  return useMemo(() => computeReminders(tasks, projects, userId), [tasks, projects, userId])
}
