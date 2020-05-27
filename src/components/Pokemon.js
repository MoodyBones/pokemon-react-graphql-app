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
        {pokemon.attacks.special.slice(0, 3).map((attacks) => (
          <span key={`${attacks.name}-${attacks.damage}`}>{attacks.name}</span>
        ))}
      </div>
    </div>
  )
}
