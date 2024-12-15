import React from "react";

const TeamBuilder = ({ team, onRemoveFromTeam }) => {
  return (
    <div className="team-builder">
      <h2>Your Team</h2>
      {team.length === 0 && <p>No Pokémon in your team yet!</p>}
      {team.map((pokemon) => (
        <div key={pokemon.id} className="team-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <button onClick={() => onRemoveFromTeam(pokemon.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TeamBuilder;
