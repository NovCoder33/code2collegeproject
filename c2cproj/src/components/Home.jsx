import { useState } from "react";

import source from "../assets/pokeball.jpg";
import "./component-styles/home.css";
import fetchPokemon from "../fetchPokemon";
import devolvePokemon from "../devolvePokemon";
import evolvePokemon from "../evolvePokemon";
var evolutions = [];

const Home = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState();

  const display = (dta) => {
    var str = "";
    if (dta == "abilities") {
      for (let i = 0; i < data.abilities.length; i++) {
        str = str + data.abilities[i].ability.name + ", ";
      }
    } else if (dta == "moves") {
      for (let i = 0; i < data.moves.length; i++) {
        str = str + data.moves[i].move.name + ", ";
      }
    } else if (dta == "types") {
      for (var i = 0; i < data.types.length; i++) {
        str = str + data.types[i].type.name + ", ";
      }
    }
    return str.substring(0, str.length - 2);
  };

  return (
    <div className="main-container">
      <Search input={input} setInput={setInput} setData={setData}></Search>
      <div className="poke-container">
        <button onClick={() => devolvePokemon(data, setData)}> Devolve </button>
        <div className="poke-info">
          <img
            src={data != null ? data.sprites.front_default : source}
            alt="poke-image"
          ></img>
          <p>{data != null ? data.species.name : "Pokemon"}</p>
          <p>{data != null ? display("abilities") : "Abilities"}</p>
          <details className="moves-scroll">
            <summary>Moves</summary>
            <div className="moves-list">
              {data != null ? display("moves") : "—"}
            </div>
          </details>{" "}
          <p>{data != null ? display("types") : "Types"}</p>
        </div>

        <button onClick={() => evolvePokemon(evolutions, data, setData)}>
          {" "}
          Evolve{" "}
        </button>
      </div>
    </div>
  );
};

const Search = ({ input, setInput, setData }) => {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a pokemon..."
        value={input}
        onChange={handleInput}
      ></input>
      <button onClick={() => fetchPokemon(input, setData)}>Search</button>
    </div>
  );
};

export default Home;
