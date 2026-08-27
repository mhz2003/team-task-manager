import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ThemeToggle from './ThemeToggle'
import NotificationsBell from './NotificationsBell'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const initials = currentUser?.fullName?.trim()?.[0] ?? '?'

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>✓</span>
          <span className={styles.brandText}>مدیریت وظایف تیمی</span>
        </Link>

        <nav className={styles.nav}>
          {currentUser && (
            <>
              <NavLink to="/projects" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                پروژه‌ها
              </NavLink>
              <NavLink to="/users" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                کاربران
              </NavLink>
              <span className={styles.user}>
                <span className={styles.avatar}>{initials}</span>
                {currentUser.fullName}
              </span>
              <NotificationsBell />
              <button onClick={() => { logout(); navigate('/login') }} className={styles.logout}>
                خروج
              </button>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
