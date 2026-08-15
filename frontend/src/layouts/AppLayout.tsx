import { NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'

export function AppLayout() {
  const { user, logout } = useAuthStore()
  return <div><header><strong>EdTech AI Platform</strong><nav aria-label="Main navigation"><NavLink to="/app">Home</NavLink>{['documents','chat','quizzes','dashboard'].map((item) => <NavLink key={item} to={`/app/${item}`}>{item}</NavLink>)}</nav><span>{user?.username} <button onClick={logout}>Log out</button></span></header><main><Outlet /></main></div>
}
