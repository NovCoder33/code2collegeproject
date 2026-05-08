import devolvePokemon from "./devolvePokemon";
jest.mock("./fetchPokemon");
import fetchPokemon from "./fetchPokemon";
beforeEach(() => {
  jest.clearAllMocks();
});

test("devolves to correct pokemon", async () => {
  const mockData = { name: "pikachu" };
  const mockSetData = jest.fn();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ evolves_from_species: { name: "pichu" } }),
    }),
  );

  devolvePokemon(mockData, mockSetData);
  await new Promise((resolve) => setTimeout(resolve, 100));

  expect(fetchPokemon).toHaveBeenCalledWith("pichu", mockSetData);
});
