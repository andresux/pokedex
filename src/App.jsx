import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PokedexPage from './pages/PokedexPage'
import PokeidPage from './pages/PokeidPage'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/pokedex' element={<PokedexPage/>}/>
        <Route path='/pokedex/:id' element={<PokeidPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
