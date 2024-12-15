import React from 'react';

const TeamBuilder = ({ team, onRemoveFromTeam }) => {
  return (
    <div className="team-builder">
      <h2>Your Team ({team.length}/6)</h2>
      <div className="team-list">
        {team.map((pokemon) => (
          <div key={pokemon.id} className="team-pokemon">
            <img 
              src={pokemon.animatedSprite || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
              alt={pokemon.name} 
              className="team-sprite"
            />
            <div className="pokemon-info">
              <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              <button onClick={() => onRemoveFromTeam(pokemon.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamBuilder;