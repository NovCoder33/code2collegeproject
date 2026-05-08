import evolvePokemon from "./evolvePokemon";
jest.mock("./fetchPokemon");
import fetchPokemon from "./fetchPokemon";
const evolutionChain = {
  chain: {
    species: { name: "pikachu" },
    evolves_to: [{ species: { name: "raichu" }, evolves_to: [] }],
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("evolves to next pokemon in chain", async () => {
  const mockData = { id: 25, species: { name: "pikachu" } };
  const mockSetData = jest.fn();

  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            evolution_chain: {
              url: "https://pokeapi.co/api/v2/evolution-chain/10/",
            },
          }),
      }),
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(evolutionChain),
      }),
    );

  evolvePokemon([], mockData, mockSetData);
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(fetchPokemon).toHaveBeenCalledWith("raichu", mockSetData);
});
