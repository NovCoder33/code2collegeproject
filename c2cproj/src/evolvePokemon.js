import fetchPokemon from "./fetchPokemon";

const evolvePokemon = (evolutions, data, setData) => {
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
export default evolvePokemon;
