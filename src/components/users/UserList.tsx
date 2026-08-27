import { User } from '@/types'
import UserCard from './UserCard'
import styles from './UserList.module.scss'

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  if (users.length === 0) {
    return <p className={styles.empty}>هنوز عضوی اضافه نشده است.</p>
  }
  return (
    <div className={styles.grid}>
      {users.map((u) => (
        <UserCard key={u.id} user={u} onEdit={() => onEdit(u)} onDelete={() => onDelete(u.id)} />
      ))}
    </div>
  )
}
