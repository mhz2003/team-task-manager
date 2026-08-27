import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Role } from '@/types'
import { useToast } from '@/components/common/Toast'
import auth from './AuthForm.module.scss'
import form from '@/components/common/FormElements.module.scss'

export default function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('member')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const res = register(fullName, username, password, role)
    if (!res.ok) { setError(res.message ?? 'خطا'); return }
    showToast('ثبت‌نام با موفقیت انجام شد', 'success')
    navigate('/projects')
  }

  return (
    <div className={auth.wrap}>
      <form onSubmit={handleSubmit} className={auth.card}>
        <h1 className={auth.title}>ساخت حساب جدید</h1>
        <p className={auth.subtitle}>به تیم بپیوندید و شروع به مدیریت وظایف کنید</p>
        {error && <p className={auth.error}>{error}</p>}

        <div className={form.field}>
          <label className={form.label}>نام و نام خانوادگی</label>
          <input className={form.input} value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className={form.field}>
          <label className={form.label}>نام کاربری</label>
          <input className={form.input} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={form.field}>
          <label className={form.label}>رمز عبور</label>
          <input type="password" className={form.input} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={form.field}>
          <label className={form.label}>نقش</label>
          <select className={form.select} value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="member">عضو عادی</option>
            <option value="manager">مدیر</option>
          </select>
        </div>

        <button type="submit" className={auth.submit}>ثبت‌نام</button>
        <p className={auth.footer}>
          حساب دارید؟ <Link to="/login">وارد شوید</Link>
        </p>
      </form>
    </div>
  )
}
