import { useTheme } from '@/context/ThemeContext'
import styles from './ThemeToggle.module.scss'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
      aria-label="تغییر تم"
      title="تغییر تم روشن/تیره"
    >
      <span className={styles.knob}>{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  )
}
