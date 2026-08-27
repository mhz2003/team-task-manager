import { Project, Task } from '@/types'
import ProjectCard from './ProjectCard'
import styles from './ProjectList.module.scss'

interface ProjectListProps {
  projects: Project[]
  tasks: Task[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export default function ProjectList({ projects, tasks, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return <p className={styles.empty}>هنوز پروژه‌ای ایجاد نشده است.</p>
  }
  return (
    <div className={styles.grid}>
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          tasks={tasks.filter((t) => t.projectId === p.id)}
          onEdit={() => onEdit(p)}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
