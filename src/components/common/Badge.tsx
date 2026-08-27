import { ReactNode } from 'react'
import styles from './Badge.module.scss'

interface BadgeProps {
  children: ReactNode
  color?: 'slate' | 'green' | 'amber' | 'red' | 'brand'
}

export default function Badge({ children, color = 'slate' }: BadgeProps) {
  return <span className={styles[color]}>{children}</span>
}
