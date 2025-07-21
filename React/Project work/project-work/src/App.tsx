import './App.css'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DisplayAlbum from './pages/DisplayAlbum'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index path='/' element={<MainPage/>}/>
              <Route path='album/:id' element={<DisplayAlbum />}/>
              <Route path='/explore'/>
              <Route path='/videos'/>
              <Route path='/mixes_ratio'/>
              <Route path='/playlists'/>
              <Route path='/tracks'/>
              <Route path='/artists'/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
