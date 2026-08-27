import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/common/Toast'
import auth from './AuthForm.module.scss'
import form from '@/components/common/FormElements.module.scss'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const res = login(username, password)
    if (!res.ok) { setError(res.message ?? 'خطا'); return }
    showToast('خوش آمدید!', 'success')
    navigate('/projects')
  }

  return (
    <div className={auth.wrap}>
      <form onSubmit={handleSubmit} className={auth.card}>
        <h1 className={auth.title}>ورود به حساب</h1>
        <p className={auth.subtitle}>برای مدیریت پروژه‌ها و تسک‌های تیم وارد شوید</p>
        {error && <p className={auth.error}>{error}</p>}

        <div className={form.field}>
          <label className={form.label}>نام کاربری</label>
          <input className={form.input} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={form.field}>
          <label className={form.label}>رمز عبور</label>
          <input type="password" className={form.input} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className={auth.submit}>ورود</button>
        <p className={auth.footer}>
          حساب ندارید؟ <Link to="/register">ثبت‌نام کنید</Link>
        </p>
      </form>
    </div>
  )
}
