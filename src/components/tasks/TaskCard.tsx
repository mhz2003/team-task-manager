import { Task, User, TaskStatus } from '@/types'
import { formatDate, isOverdue, isDueSoon } from '@/utils/storage'
import styles from './TaskCard.module.scss'

interface TaskCardProps {
  task: Task
  assignee?: User
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: TaskStatus) => void
}

const statusLabel = { todo: 'در انتظار', in_progress: 'در حال انجام', done: 'انجام‌شده' } as const

export default function TaskCard({ task, assignee, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const overdue = !!task.dueDate && isOverdue(task.dueDate) && task.status !== 'done'
  const dueSoon = !!task.dueDate && isDueSoon(task.dueDate) && task.status !== 'done'

  return (
    <div className={styles.card}>
      <span className={`${styles.rail} ${styles[task.priority]}`} />

      <div className={styles.top}>
        <h3 className={styles.title}>{task.title}</h3>
      </div>
      {task.description && <p className={styles.desc}>{task.description}</p>}

      <div className={styles.metaRow}>
        <span>مسئول: {assignee?.fullName ?? '—'}</span>
        <span className={overdue ? styles.overdue : dueSoon ? styles.dueSoon : ''}>
          مهلت: {formatDate(task.dueDate)} {overdue ? '(گذشته)' : dueSoon ? '(نزدیک)' : ''}
        </span>
      </div>

      <div className={styles.bottom}>
        <select
          className={styles.statusSelect}
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
        >
          <option value="todo">{statusLabel.todo}</option>
          <option value="in_progress">{statusLabel.in_progress}</option>
          <option value="done">{statusLabel.done}</option>
        </select>
        <div className={styles.actions}>
          <button onClick={onEdit} className={styles.edit}>ویرایش</button>
          <button onClick={onDelete} className={styles.del}>حذف</button>
        </div>
      </div>
    </div>
  )
}
