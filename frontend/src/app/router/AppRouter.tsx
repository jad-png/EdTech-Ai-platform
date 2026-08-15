import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../../layouts/AppLayout'
import { LoginPage } from '../../features/auth/pages/LoginPage'
import { RegisterPage } from '../../features/auth/pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteFallback } from '../../shared/components/RouteFallback'
import { DocumentsPage } from '../../features/documents/pages/DocumentsPage'
import { ChatPage } from '../../features/chat/pages/ChatPage'
import { QuizzesPage } from '../../features/quizzes/pages/QuizzesPage'
import { PlaceholderPage } from '../../shared/components/PlaceholderPage'

export function AppRouter() { return <BrowserRouter><Routes><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route element={<ProtectedRoute />}><Route path="/app" element={<AppLayout />}><Route index element={<PlaceholderPage title="Home" />} /><Route path="documents" element={<DocumentsPage />} /><Route path="chat" element={<ChatPage />} /><Route path="quizzes" element={<QuizzesPage />} /><Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} /></Route></Route><Route path="/" element={<Navigate to="/app" replace />} /><Route path="*" element={<RouteFallback />} /></Routes></BrowserRouter> }
