import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ShortenerPage from './pages/ShortenerPage'
import StatsPage from './pages/StatsPage'
import RedirectPage from './pages/RedirectPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Dynamic short link route */}
        <Route path="/:code" element={<RedirectPage />} />
        <Route path="/home" element={<Navigate to='/' replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
