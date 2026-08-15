import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function RegisterPage() {
  const { register } = useAuthStore(); const navigate = useNavigate(); const [form, setForm] = useState({ username:'', email:'', password:'', password2:'' }); const [error, setError] = useState('')
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); try { await register(form); navigate('/app', { replace: true }) } catch { setError('Unable to register. Check the details and try again.') } }
  return <main><h1>Create account</h1><form onSubmit={submit}>{(['username','email','password','password2'] as const).map((field) => <label key={field}>{field === 'password2' ? 'Confirm password' : field[0].toUpperCase()+field.slice(1)}<input type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required /></label>)}{error && <p role="alert">{error}</p>}<button type="submit">Register</button></form><p>Already registered? <Link to="/login">Sign in</Link></p></main>
}
