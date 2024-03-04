import React, { useRef } from 'react'
import { setTrainerName } from '../store/slices/trainerName.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/homePage.css'

const HomePage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setTrainerName(textInput.current.value.trim()))
    navigate('/pokedex')
  }

  return (
    <div className='header'>
      <img src="../assets/pokemon.svg" alt="" />
      <h1>¡Hola Entrenador!</h1>
      <h2>Para poder comenzar, dame tu nombre</h2>
      <form onSubmit={handleSubmit}>
        <input  className='input-field' type="text" placeholder='Tu nombre...' ref={textInput} required/>
        <button className='button'>Comenzar</button>
      </form>
      <footer></footer>
    </div>
  )
}

export default HomePage