import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemonName } from '../store/slices/pokemonName.slice'
import useFetch from '../hooks/useFetch.js'
import PokeCard from '../components/pokedexPage/PokeCard.jsx'
import SelectType from '../components/pokedexPage/SelectType.jsx'
import './styles/pokedexPage.css'

const PokedexPage = () => {

  const [selectValue, setSelectValue] = useState('allPokemon')
  const trainerName = useSelector(store => store.trainerName)
  const pokemonName = useSelector(store => store.pokemonName)
  const dispatch = useDispatch()
  const [ pokemons, getPokemons, getType ] = useFetch()

  useEffect(() => {
    if (selectValue==='allPokemon') {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=30'
      getPokemons(url) 
    } else {
      getType(selectValue)
    }
  }, [selectValue])
  
  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()))
    textInput.current.value = ''
  }

  const cbFilter = () => {
    if (pokemonName) {
      return pokemons?.results.filter(element => element.name.includes(pokemonName))
    } else {
      return pokemons?.results
    }
  }

  return (
    <div className='pokedex'>
      <div className='logoHeader'>
        <img className='pokeLogo' src="../assets/pokemon.svg" alt="Pokedex Logo" />
      </div>
      <div className='blackHeader'>

      </div>
      <section className='pokeHeader'>
          <h3><span>Bienvenido {trainerName},</span> aqui podras encontrar tu pokemon favorito</h3>
        <div>
          <form onSubmit={handleSubmit} className='pokeForm'>
            <input type="text" ref={textInput}/>
            <button>Buscar</button>
          </form>
          <SelectType 
            setSelectValue = {setSelectValue}
          />
        </div>
      </section>
      <section className='pokeContainer'>
        {
          cbFilter()?.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
    </div>
  )
}

export default PokedexPage