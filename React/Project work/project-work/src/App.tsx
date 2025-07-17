import './App.css'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AlbumPage from './pages/AlbumPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index path='/' element={<MainPage/>}/>
              <Route path="album/:id" element={<AlbumPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
