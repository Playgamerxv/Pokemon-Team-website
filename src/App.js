import React, { useState } from "react";
import PokemonList from "./components/PokemonList";
import TeamBuilder from "./components/TeamBuilder";
import "./App.css";

const App = () => {
  const [team, setTeam] = useState([]);

  const addToTeam = (pokemon) => {
    if (team.length < 6 && !team.some((p) => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    } else {
      alert("Your team is full or already includes this Pokémon!");
    }
  };

  const removeFromTeam = (id) => {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div className="App">
      <h1>Pokémon Team Builder</h1>
      <TeamBuilder team={team} onRemoveFromTeam={removeFromTeam} />
      <PokemonList onAddToTeam={addToTeam} />
    </div>
  );
};

export default App;
