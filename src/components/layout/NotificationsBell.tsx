import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext'
import { useReminders } from '@/hooks/useReminders'
import { formatDate } from '@/utils/storage'
import styles from './NotificationsBell.module.scss'

export default function NotificationsBell() {
  const { currentUser } = useAuth()
  const { tasks, projects } = useData()
  const reminders = useReminders(tasks, projects, currentUser?.id)
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function goToTask(projectId: string) {
    setOpen(false)
    navigate(`/projects/${projectId}`)
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.bellBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="یادآوری‌های سررسید"
        title="یادآوری‌های سررسید"
      >
        🔔
        {reminders.length > 0 && (
          <span className={styles.count}>{reminders.length > 9 ? '9+' : reminders.length}</span>
        )}
      </button>

      {open && (
        <div className={styles.panel}>
          <p className={styles.panelTitle}>یادآوری سررسید تسک‌ها</p>
          {reminders.length === 0 ? (
            <p className={styles.empty}>فعلاً تسکی نزدیک سررسید نداری 🎉</p>
          ) : (
            reminders.map(({ task, project, overdue }) => (
              <button key={task.id} className={styles.item} onClick={() => goToTask(task.projectId)}>
                <div className={styles.itemTop}>
                  <span className={`${styles.dot} ${overdue ? styles.overdue : styles.dueSoon}`} />
                  <span className={styles.itemTitle} style={{ flex: 1, textAlign: 'start' }}>{task.title}</span>
                  <span className={`${styles.due} ${overdue ? styles.dueTextOverdue : styles.dueTextSoon}`}>
                    {formatDate(task.dueDate)}
                  </span>
                </div>
                <p className={styles.itemProject}>{project?.title ?? 'پروژه حذف‌شده'}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
