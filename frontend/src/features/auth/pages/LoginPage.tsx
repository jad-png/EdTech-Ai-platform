import { FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function LoginPage() {
  const { login } = useAuthStore(); const navigate = useNavigate(); const location = useLocation(); const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('')
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); try { await login(username, password); navigate((location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/app', { replace: true }) } catch { setError('Unable to sign in. Check your username and password.') } }
  return <main><h1>Sign in</h1><form onSubmit={submit}><label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>{error && <p role="alert">{error}</p>}<button type="submit">Sign in</button></form><p>Need an account? <Link to="/register">Register</Link></p></main>
}
