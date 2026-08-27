import { Link } from 'react-router-dom'
import { Project, Task } from '@/types'
import { formatDate } from '@/utils/storage'
import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
  project: Project
  tasks: Task[]
  onEdit: () => void
  onDelete: (id: string) => void
}

export default function ProjectCard({ project, tasks, onEdit, onDelete }: ProjectCardProps) {
  const done = tasks.filter((t) => t.status === 'done').length
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <Link to={`/projects/${project.id}`} className={styles.title}>{project.title}</Link>
        <div className={styles.actions}>
          <button onClick={onEdit} className={styles.delete}>ویرایش</button>
          <button onClick={() => onDelete(project.id)} className={styles.delete}>حذف</button>
        </div>
      </div>
      <p className={styles.desc}>{project.description || 'بدون توضیح'}</p>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.meta}>
        <span>{formatDate(project.createdAt)}</span>
        <span>{done}/{tasks.length} تسک</span>
      </div>
    </div>
  )
}
