import './App.css'
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<SignInPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
      </Routes>

    </Router>
  )
}

export default App
