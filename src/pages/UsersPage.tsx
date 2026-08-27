import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import UserForm from '@/components/users/UserForm'
import UserList from '@/components/users/UserList'
import Modal from '@/components/common/Modal'
import { useToast } from '@/components/common/Toast'
import { Role, User } from '@/types'
import styles from './Pages.module.scss'

export default function UsersPage() {
  const { currentUser, users, addMember, updateMember, deleteMember } = useAuth()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // ProtectedRoute already blocks this page for guests, this is just a second
  // line of defense in case someone reaches the component another way.
  if (!currentUser) return null

  function handleSubmit(fullName: string, username: string, password: string, role: Role) {
    const res = editingUser
      ? updateMember(editingUser.id, fullName, username, role, password)
      : addMember(fullName, username, password, role)

    if (res.ok) {
      showToast(editingUser ? 'اطلاعات عضو به‌روزرسانی شد' : 'عضو جدید اضافه شد', 'success')
      setOpen(false)
      setEditingUser(null)
    } else {
      showToast(res.message ?? 'خطا در ذخیره‌سازی', 'error')
    }
  }

  function handleDelete(id: string) {
    if (id === currentUser.id) {
      showToast('نمی‌توانید حساب خودتان را حذف کنید', 'error')
      return
    }
    deleteMember(id)
    showToast('عضو حذف شد', 'info')
  }

  return (
    <div className={styles.page}>
      <div className={styles.headRow}>
        <div>
          <h1 className={styles.heading}>مدیریت کاربران</h1>
          <p className={styles.subheading}>{users.length} عضو در تیم</p>
        </div>
        <button className={styles.newBtn} onClick={() => { setEditingUser(null); setOpen(true) }}>+ افزودن عضو</button>
      </div>
      <UserList
        users={users}
        onEdit={(u) => { setEditingUser(u); setOpen(true) }}
        onDelete={handleDelete}
      />
      <Modal open={open} title={editingUser ? 'ویرایش عضو' : 'افزودن عضو تیم'} onClose={() => { setOpen(false); setEditingUser(null) }}>
        <UserForm initial={editingUser ?? undefined} onSubmit={handleSubmit} onCancel={() => { setOpen(false); setEditingUser(null) }} />
      </Modal>
    </div>
  )
}
