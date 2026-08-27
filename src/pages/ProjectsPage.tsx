import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import { useReminders } from '@/hooks/useReminders'
import ProjectForm from '@/components/projects/ProjectForm'
import ProjectList from '@/components/projects/ProjectList'
import Modal from '@/components/common/Modal'
import { useToast } from '@/components/common/Toast'
import { Project } from '@/types'
import { formatDate } from '@/utils/storage'
import styles from './Pages.module.scss'

export default function ProjectsPage() {
  const { currentUser } = useAuth()
  const { projects, tasks, addProject, updateProject, deleteProject } = useData()
  const reminders = useReminders(tasks, projects, currentUser?.id)
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  if (!currentUser) return null

  function handleSubmit(title: string, description: string) {
    if (editingProject) {
      updateProject(editingProject.id, { title, description })
      showToast('پروژه به‌روزرسانی شد', 'success')
    } else {
      addProject({ title, description, ownerId: currentUser!.id })
      showToast('پروژه ایجاد شد', 'success')
    }
    setOpen(false)
    setEditingProject(null)
  }

  function handleDelete(id: string) {
    deleteProject(id)
    showToast('پروژه حذف شد', 'info')
  }

  return (
    <div className={styles.page}>
      {reminders.length > 0 && (
        <div className={styles.remindersBox}>
          <p className={styles.remindersHead}>🔔 یادآوری سررسید ({reminders.length})</p>
          <div className={styles.remindersList}>
            {reminders.map(({ task, project, overdue }) => (
              <Link key={task.id} to={`/projects/${task.projectId}`} className={styles.reminderRow}>
                <div className={styles.reminderInfo}>
                  <span className={styles.reminderTitle}>{task.title}</span>
                  <span className={styles.reminderProject}>({project?.title ?? 'پروژه حذف‌شده'})</span>
                </div>
                <span className={`${styles.reminderDue} ${overdue ? styles.reminderDueOverdue : styles.reminderDueSoon}`}>
                  {overdue ? 'گذشته: ' : 'سررسید: '}{formatDate(task.dueDate)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>پروژه‌ها</h1>
          <p className={styles.subheading}>{projects.length} پروژه فعال</p>
        </div>
        <button className={styles.newBtn} onClick={() => { setEditingProject(null); setOpen(true) }}>+ پروژه جدید</button>
      </div>
      <ProjectList
        projects={projects}
        tasks={tasks}
        onEdit={(p) => { setEditingProject(p); setOpen(true) }}
        onDelete={handleDelete}
      />
      <Modal open={open} title={editingProject ? 'ویرایش پروژه' : 'ایجاد پروژه جدید'} onClose={() => { setOpen(false); setEditingProject(null) }}>
        <ProjectForm initial={editingProject ?? undefined} onSubmit={handleSubmit} onCancel={() => { setOpen(false); setEditingProject(null) }} />
      </Modal>
    </div>
  )
}
