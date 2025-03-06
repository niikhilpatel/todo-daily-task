import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
function App() {
  
  return (
    <>
        <BrowserRouter>
     <Routes>
    
     <Route path="/home" element={<Home />} />
      <Route path="/" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
