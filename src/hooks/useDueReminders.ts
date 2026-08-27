import { useEffect, useRef } from 'react'
import { Project, Task } from '@/types'
import { useToast } from '@/components/common/Toast'
import { computeReminders } from './useReminders'

// Pops a toast the moment a task assigned to the current user gets close to,
// or passes, its due date. Re-checks on an interval (not just on data change)
// so it also catches tasks that quietly become "due soon" while the tab is
// just sitting open. The navbar bell (useReminders) reads the same rule, so
// the two never disagree — this hook only adds the one-time toast on top.
const CHECK_INTERVAL_MS = 60 * 1000

export function useDueReminders(tasks: Task[], projects: Project[], userId: string | undefined) {
  const { showToast } = useToast()
  const notified = useRef<Set<string>>(new Set())

  useEffect(() => {
    function check() {
      for (const { task, overdue } of computeReminders(tasks, projects, userId)) {
        if (notified.current.has(task.id)) continue
        notified.current.add(task.id)
        showToast(
          overdue ? `مهلت تسک «${task.title}» گذشته است` : `تسک «${task.title}» به‌زودی سررسید می‌شود`,
          'error',
        )
      }
    }

    check()
    const id = setInterval(check, CHECK_INTERVAL_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, projects, userId])
}
