import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Todos from './pages/Todos'
import Habits from './pages/Habits'
import Events from './pages/Events'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Todos' element={<Todos/>}/>
        <Route path='/Habits' element={<Habits/>}/>
        <Route path='/Events' element={<Events/>}/>
      </Routes>

    </div>
    )
  
}

export default App
