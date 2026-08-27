import { useState, FormEvent } from 'react'
import { Task, TaskPriority, TaskStatus, User } from '@/types'
import form from '@/components/common/FormElements.module.scss'

interface TaskFormProps {
  users: User[]
  initial?: Partial<Task>
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'projectId'>) => void
  onCancel: () => void
}

export default function TaskForm({ users, initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [priority, setPriority] = useState<TaskPriority>(initial?.priority ?? 'medium')
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? 'todo')
  const [dueDate, setDueDate] = useState(initial?.dueDate?.slice(0, 10) ?? '')
  const [assigneeId, setAssigneeId] = useState(initial?.assigneeId ?? users[0]?.id ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim() || !assigneeId) return
    onSubmit({
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : '',
      assigneeId,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={form.field}>
        <label className={form.label}>عنوان تسک</label>
        <input className={form.input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className={form.field}>
        <label className={form.label}>توضیح</label>
        <textarea className={form.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className={form.row}>
        <div>
          <label className={form.label}>اولویت</label>
          <select className={form.select} value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
        </div>
        <div>
          <label className={form.label}>وضعیت</label>
          <select className={form.select} value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            <option value="todo">در انتظار انجام</option>
            <option value="in_progress">در حال انجام</option>
            <option value="done">انجام‌شده</option>
          </select>
        </div>
      </div>

      <div className={form.row}>
        <div>
          <label className={form.label}>مهلت انجام</label>
          <input type="date" className={form.input} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label className={form.label}>شخص مسئول</label>
          <select className={form.select} value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
            {users.map((u) => <option key={u.id} value={u.id}>{u.fullName}</option>)}
          </select>
        </div>
      </div>

      <div className={form.actions}>
        <button type="button" onClick={onCancel} className={form.btnSecondary}>انصراف</button>
        <button type="submit" className={form.btnPrimary}>ذخیره تسک</button>
      </div>
    </form>
  )
}
