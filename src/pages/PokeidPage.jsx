import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import './styles/pokeIdPage.css'

const PokeidPage = () => {

  const [ pokeData, getPokeData ] = useFetch()
  const param = useParams()

  useEffect(() => {
    const url = ` https://pokeapi.co/api/v2/pokemon/${param.id}`
    getPokeData(url)
  }, [])

  const generateBarStyle = value => ({
    width: `${(value / 150) * 100}%`,
    height: '20px',
    background: 'linear-gradient(to bottom, #FAD171, #ECA437)',
    margin: '5px 0',
    border: '1px solid'
  });

  return (
    <article>
      <div className='logoHeader'>
        <img className='pokeLogo' src="../assets/pokemon.svg" alt="Pokedex Logo" />
      </div>
      <div className='blackHeader'></div>

      <div className='card'>
        <figure>
          <img src={pokeData?.sprites.other['official-artwork'].front_default} 
          alt="Pokemon Image"/>
        </figure>
        <section className= {pokeData?.types[0].type.name}></section>

        <h1># {pokeData?.id}</h1>
        <h2>{pokeData?.name}</h2>

        <div className='container'>
          <div className='pokeWeight'>
            <label>Weight</label>
            <h3>{pokeData?.weight}</h3>
          </div>
          <div className='pokeHeight'>
            <label>Height</label>
            <h3>{pokeData?.height}</h3>
          </div>
        </div>

        <div className='pokeTA'>
          <div className='pokeType'>
            <label>Type</label>
            {
              pokeData?.types.map(type => (
                <h3 className={pokeData?.types[0].type.name} key={type.type.url}>
                  {type.type.name}
                </h3>
              ))
            }
          </div>  
          <div className='pokeAbilities'>
            <label>Abilities</label>
            {
              pokeData?.abilities.map(ability => (
                <h3 key={ability.ability.url}>
                  {ability.ability.name}
                </h3>
              ))
            }
          </div>          
        </div>

        <div className='pokeStats'>
          <h3>Stats</h3>
          {
            pokeData?.stats.map(stat => (
              !stat.stat.name.includes('special') && (
              <div key={stat.stat.url}>
                <h4>
                {stat.stat.name}: {stat.base_stat}/150
                </h4>
                <div style={generateBarStyle(stat.base_stat)}></div>
              </div>
              )
            ))
          }

        </div>
      </div>

      <div className='moveCard'>
          <div className='pokeMovements'>
            <h4>Movements</h4>
            {
              pokeData?.moves.map(move => (
                <p className='pokeMovements' key={move.move.url}>
                  {move.move.name}
                </p>
              ))
            }
          </div>
        </div>
    </article>
  )
}

export default PokeidPage