import fetchPokemon from "./fetchPokemon";
const devolvePokemon = (data, setData) => {
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
export default devolvePokemon;
