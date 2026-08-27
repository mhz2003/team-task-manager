import { useState, FormEvent } from 'react'
import { Project } from '@/types'
import form from '@/components/common/FormElements.module.scss'

interface ProjectFormProps {
  initial?: Project
  onSubmit: (title: string, description: string) => void
  onCancel: () => void
}

export default function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title, description)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={form.field}>
        <label className={form.label}>عنوان پروژه</label>
        <input className={form.input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={form.field}>
        <label className={form.label}>توضیحات</label>
        <textarea className={form.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={form.actions}>
        <button type="button" onClick={onCancel} className={form.btnSecondary}>انصراف</button>
        <button type="submit" className={form.btnPrimary}>{initial ? 'ذخیره تغییرات' : 'ایجاد پروژه'}</button>
      </div>
    </form>
  )
}
