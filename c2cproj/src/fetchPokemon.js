const fetchPokemon = (text, setData) => {
  console.log(text);
  return fetch(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`)
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
export default fetchPokemon;
