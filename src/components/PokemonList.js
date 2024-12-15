import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = ({ onAddToTeam }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 649; i++) {
          promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }
        
        const results = await Promise.all(promises);
        const pokemonData = results.map(result => ({
          id: result.data.id,
          name: result.data.name,
          staticSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.data.id}.png`,
          animatedSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${result.data.id}.gif`,
          types: result.data.types.map(type => type.type.name)
        }));

        setPokemonList(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <div className="loading">Loading Pokémon... (this might take a while)</div>;
  }

  return (
    <div className="pokemon-list">
      {pokemonList.map(pokemon => (
        <div 
          key={pokemon.id} 
          className="pokemon-card"
          onMouseEnter={() => setHoveredPokemon(pokemon.id)}
          onMouseLeave={() => setHoveredPokemon(null)}
        >
          <img 
            src={
              hoveredPokemon === pokemon.id 
                ? pokemon.animatedSprite 
                : pokemon.staticSprite
            } 
            alt={pokemon.name} 
            className="pokemon-sprite"
            onError={(e) => {
              // Fallback to static sprite if animated sprite fails
              e.target.onerror = null;
              e.target.src = pokemon.staticSprite;
            }}
          />
          <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <span key={type} className={`type-${type}`}>{type}</span>
            ))}
          </div>
          <button onClick={() => onAddToTeam(pokemon)}>
            Add to Team
          </button>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;