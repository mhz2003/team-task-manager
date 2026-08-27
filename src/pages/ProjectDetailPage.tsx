import { useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import TaskForm from '@/components/tasks/TaskForm'
import TaskList from '@/components/tasks/TaskList'
import TaskFilters from '@/components/tasks/TaskFilters'
import Modal from '@/components/common/Modal'
import { useToast } from '@/components/common/Toast'
import { Task, TaskFilters as Filters, TaskStatus } from '@/types'
import styles from './Pages.module.scss'

const defaultFilters: Filters = { search: '', status: 'all', priority: 'all', assigneeId: 'all', dueFrom: '', dueTo: '' }

export default function ProjectDetailPage() {
  const { projectId } = useParams()
  const { currentUser, users } = useAuth()
  const { projects, tasksForProject, addTask, updateTask, deleteTask } = useData()
  const { showToast } = useToast()

  const project = projects.find((p) => p.id === projectId)
  const tasks = projectId ? tasksForProject(projectId) : []

  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false
      if (filters.status !== 'all' && t.status !== filters.status) return false
      if (filters.priority !== 'all' && t.priority !== filters.priority) return false
      if (filters.assigneeId !== 'all' && t.assigneeId !== filters.assigneeId) return false
      if (filters.dueFrom && t.dueDate && new Date(t.dueDate) < new Date(filters.dueFrom)) return false
      if (filters.dueTo && t.dueDate && new Date(t.dueDate) > new Date(filters.dueTo)) return false
      return true
    })
  }, [tasks, filters])

  if (!currentUser) return null
  if (!project) return <Navigate to="/projects" replace />

  function handleCreateOrUpdate(data: Omit<Task, 'id' | 'createdAt' | 'projectId'>) {
    if (editingTask) {
      updateTask(editingTask.id, data)
      showToast('تسک ویرایش شد', 'success')
    } else {
      addTask({ ...data, projectId: project!.id })
      showToast('تسک اضافه شد', 'success')
    }
    setOpen(false)
    setEditingTask(null)
  }

  function handleStatusChange(id: string, status: TaskStatus) {
    updateTask(id, { status })
  }

  function handleDelete(id: string) {
    deleteTask(id)
    showToast('تسک حذف شد', 'info')
  }

  return (
    <div className={styles.page}>
      <Link to="/projects" className={styles.back}>→ بازگشت به پروژه‌ها</Link>
      <div className={styles.detailHead}>
        <div>
          <h1 className={styles.heading}>{project.title}</h1>
          <p className={styles.subheading}>{project.description}</p>
        </div>
        <button className={styles.newBtn} onClick={() => { setEditingTask(null); setOpen(true) }}>+ تسک جدید</button>
      </div>

      <TaskFilters filters={filters} users={users} onChange={setFilters} />

      <TaskList
        tasks={filteredTasks}
        users={users}
        onEdit={(t) => { setEditingTask(t); setOpen(true) }}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <Modal open={open} title={editingTask ? 'ویرایش تسک' : 'تسک جدید'} onClose={() => { setOpen(false); setEditingTask(null) }}>
        <TaskForm users={users} initial={editingTask ?? undefined} onSubmit={handleCreateOrUpdate} onCancel={() => { setOpen(false); setEditingTask(null) }} />
      </Modal>
    </div>
  )
}
