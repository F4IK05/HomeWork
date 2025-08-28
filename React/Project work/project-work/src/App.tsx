import './App.css'
import Layout from './components/Layout/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import DisplayAlbum from './pages/DisplayAlbum'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import { AuthProvider } from './contexts/AuthContext'
import GoogleCallbackPage from './pages/GoogleCallbackPage'
import AccountPage from './pages/AccountPage'
import { AccountProvider } from './contexts/AccountContext'


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index path='/' element={<MainPage />} />
              <Route path='album/:id' element={<DisplayAlbum />} />
              <Route path='/explore' />
              <Route path='/videos' />
              <Route path='/mixes_ratio' />
              <Route path='/playlists' />
              <Route path='/tracks' />
              <Route path='/artists' />
            </Route>
            <Route path='/sign_in' element={<SignInPage />} />
            <Route path='/sign_up' element={<SignUpPage />} />
            <Route path='/verify-email' element={<VerifyEmailPage />} />
            <Route path='/auth/google' element={<GoogleCallbackPage />} />

            <Route
              path='/account'
              element={
                <AccountProvider>
                  
                  <AccountPage />
                </AccountProvider>
              } />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
