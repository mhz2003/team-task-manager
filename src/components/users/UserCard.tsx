import { User } from '@/types'
import Badge from '@/components/common/Badge'
import styles from './UserCard.module.scss'

interface UserCardProps {
  user: User
  onEdit: () => void
  onDelete: () => void
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.identity}>
        <div className={styles.avatar}>{user.fullName.trim()[0] ?? '?'}</div>
        <div className={styles.names}>
          <p className={styles.name}>{user.fullName}</p>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <Badge color={user.role === 'manager' ? 'brand' : 'slate'}>
          {user.role === 'manager' ? 'مدیر' : 'عضو عادی'}
        </Badge>
        <div className={styles.actions}>
          <button className={`${styles.iconBtn} ${styles.edit}`} onClick={onEdit}>ویرایش</button>
          <button className={`${styles.iconBtn} ${styles.del}`} onClick={onDelete}>حذف</button>
        </div>
      </div>
    </div>
  )
}
