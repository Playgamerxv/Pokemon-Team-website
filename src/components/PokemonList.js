import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = ({ onAddToTeam }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = [];
      for (let i = 1; i <= 151; i++) { // Fetch first-gen Pokémon
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(promises);
      setPokemonList(responses.map((res) => res.data));
    };

    fetchPokemons();
  }, []);

  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <button onClick={() => onAddToTeam(pokemon)}>Add to Team</button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
