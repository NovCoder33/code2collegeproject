import { useState } from "react";

import source from "../assets/pikachu.png";
import "./component-styles/home.css";
var evolutions = [];
const fetchPokemon = (text, setData) => {
  console.log(text);
  fetch(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`)
    .then((response) => {
      if (response.ok == false) {
        throw new Error("Pokemon could not be fetched!");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      setData(data);
    })
    .catch((error) => {
      console.log("Error detected: " + error);
    });
};

const Home = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState();

  const devolvePokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.name}/`)
      .then((response) => {
        if (response.ok == false) {
          throw new Error("Evolution could not be fetched!");
        } else {
          return response.json();
        }
      })
      .then((dta) => {
        console.log(dta.evolves_from_species?.name);
        if (dta.evolves_from_species?.name != undefined) {
          fetchPokemon(dta.evolves_from_species?.name, setData);
        }
      })
      .catch((error) => console.log("Error detected: " + error));
  };

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
  const evolvePokemon = () => {
    evolutions = [];
    evolutions.push(data.species.name);

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
      .then((response) => {
        if (response.ok == false) {
          throw new Error("Evolution could not be fetched!");
        } else {
          return response.json();
        }
      })
      .then((dta) =>
        fetch(dta.evolution_chain.url)
          .then((response) => {
            if (response.ok == false) {
              throw new Error("Evolution could not be fetched!");
            } else {
              return response.json();
            }
          })
          .then((dta) => {
            console.log("MADE IT HERE");
            var currentEvolutionPointer = dta.chain.evolves_to[0];
            console.log(dta.chain.evolves_to);
            evolutions.push(currentEvolutionPointer.species.name);

            while (currentEvolutionPointer.evolves_to.length > 0) {
              currentEvolutionPointer = currentEvolutionPointer.evolves_to[0];

              console.log(currentEvolutionPointer.species.name);
              evolutions.push(currentEvolutionPointer.species.name);
            }
            console.log(evolutions);
            fetchPokemon(
              evolutions.at(evolutions.lastIndexOf(data.species.name) + 1),
              setData,
            );
          }),
      )
      .catch((error) => console.log("Error detected: " + error));
  };
  return (
    <div className="main-container">
      <Search input={input} setInput={setInput} setData={setData}></Search>
      <div className="poke-container">
        <button onClick={() => devolvePokemon()}> Devolve </button>
        <div className="poke-info">
          <img
            src={data != null ? data.sprites.front_default : source}
            alt="poke-image"
          ></img>
          <p>{data != null ? data.species.name : "Pokemon"}</p>
          <p>{data != null ? display("abilities") : "Abilities"}</p>
          <p>{data != null ? display("moves") : "Moves"}</p>
          <p>{data != null ? display("types") : "Types"}</p>
        </div>

        <button onClick={() => evolvePokemon()}> Evolve </button>
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
