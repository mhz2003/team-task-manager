import { useState, FormEvent } from 'react'
import { Role, User } from '@/types'
import form from '@/components/common/FormElements.module.scss'

interface UserFormProps {
  initial?: User
  onSubmit: (fullName: string, username: string, password: string, role: Role) => void
  onCancel: () => void
}

export default function UserForm({ initial, onSubmit, onCancel }: UserFormProps) {
  const [fullName, setFullName] = useState(initial?.fullName ?? '')
  const [username, setUsername] = useState(initial?.username ?? '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>(initial?.role ?? 'member')

  const isEdit = !!initial

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!fullName || !username) return
    if (!isEdit && !password) return
    onSubmit(fullName, username, password, role)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={form.field}>
        <label className={form.label}>نام و نام خانوادگی</label>
        <input className={form.input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className={form.field}>
        <label className={form.label}>نام کاربری</label>
        <input className={form.input} value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={form.field}>
        <label className={form.label}>{isEdit ? 'رمز عبور جدید (اختیاری)' : 'رمز عبور'}</label>
        <input
          type="password"
          className={form.input}
          value={password}
          placeholder={isEdit ? 'برای عدم تغییر خالی بگذارید' : ''}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={form.field}>
        <label className={form.label}>نقش</label>
        <select className={form.select} value={role} onChange={(e) => setRole(e.target.value as Role)}>
          <option value="member">عضو عادی</option>
          <option value="manager">مدیر</option>
        </select>
      </div>
      <div className={form.actions}>
        <button type="button" onClick={onCancel} className={form.btnSecondary}>انصراف</button>
        <button type="submit" className={form.btnPrimary}>{isEdit ? 'ذخیره تغییرات' : 'افزودن عضو'}</button>
      </div>
    </form>
  )
}
