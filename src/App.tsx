import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AppLayout } from '@/components/layout/app-layout'
import LoginPage from '@/pages/login'
import DashboardPage from '@/pages/dashboard'
import ProjectsPage from '@/pages/projects'
import EventsPage from '@/pages/events'
import NewsPage from '@/pages/news'
import GalleryPage from '@/pages/gallery'
import HistoryPage from '@/pages/history'
import ContentPage from '@/pages/content'
import AdminUsersPage from '@/pages/admin-users'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/admin-users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
