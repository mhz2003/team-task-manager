import { TaskFilters as Filters, User } from '@/types'
import styles from './TaskFilters.module.scss'

interface TaskFiltersProps {
  filters: Filters
  users: User[]
  onChange: (filters: Filters) => void
}

export default function TaskFilters({ filters, users, onChange }: TaskFiltersProps) {
  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className={styles.bar}>
      <div className={styles.field}>
        <span className={styles.fieldLabel}>جستجو</span>
        <input
          className={styles.input}
          placeholder="عنوان تسک..."
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>وضعیت</span>
        <select className={styles.select} value={filters.status} onChange={(e) => set('status', e.target.value as Filters['status'])}>
          <option value="all">همه وضعیت‌ها</option>
          <option value="todo">در انتظار</option>
          <option value="in_progress">در حال انجام</option>
          <option value="done">انجام‌شده</option>
        </select>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>اولویت</span>
        <select className={styles.select} value={filters.priority} onChange={(e) => set('priority', e.target.value as Filters['priority'])}>
          <option value="all">همه اولویت‌ها</option>
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">زیاد</option>
        </select>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>عضو مسئول</span>
        <select className={styles.select} value={filters.assigneeId} onChange={(e) => set('assigneeId', e.target.value)}>
          <option value="all">همه اعضا</option>
          {users.map((u) => <option key={u.id} value={u.id}>{u.fullName}</option>)}
        </select>
      </div>

      <div className={styles.dateGroup}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>از تاریخ سررسید</span>
          <input
            type="date"
            className={styles.input}
            value={filters.dueFrom}
            onChange={(e) => set('dueFrom', e.target.value)}
          />
        </div>
        <span className={styles.dateSeparator}>تا</span>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>تا تاریخ سررسید</span>
          <input
            type="date"
            className={styles.input}
            value={filters.dueTo}
            onChange={(e) => set('dueTo', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
