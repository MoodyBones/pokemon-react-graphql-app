import React from 'react'

export function Pokemon({ pokemon }) {
  return (
    <div className="pokemon">
      <div className="pokemon__name">
        <h1>{pokemon.name}</h1>
      </div>
      <div className="pokemon__meta">
        <span>{pokemon.maxHP}</span>
        <span>{pokemon.maxCP}</span>
      </div>
      <div className="pokemon__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="pokemon__attacks">
        <ul>
          {pokemon.attacks.special.slice(0, 3).map(attacks => (
            <li key={`${attacks.name}-${attacks.damage}`}>
              {attacks.name} | {attacks.damage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
