import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import ArticlePage from './pages/ArticlePage/ArticlePage'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/articles/:id' element={<ArticlePage />} />
    </Routes>
  )
}
