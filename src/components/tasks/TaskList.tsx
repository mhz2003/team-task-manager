import { Task, User, TaskStatus } from '@/types'
import TaskCard from './TaskCard'
import styles from './TaskList.module.scss'

interface TaskListProps {
  tasks: Task[]
  users: User[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

export default function TaskList({ tasks, users, onEdit, onDelete, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>تسکی با این فیلترها یافت نشد.</p>
  }
  return (
    <div className={styles.grid}>
      {tasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          assignee={users.find((u) => u.id === t.assigneeId)}
          onEdit={() => onEdit(t)}
          onDelete={() => onDelete(t.id)}
          onStatusChange={(status) => onStatusChange(t.id, status)}
        />
      ))}
    </div>
  )
}
