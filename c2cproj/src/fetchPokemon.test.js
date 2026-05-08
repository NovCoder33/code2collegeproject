import fetchPokemon from "./fetchPokemon";

test("succeeds on ok response", async () => {
  const mockSetData = jest.fn();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ name: "pikachu" }),
    }),
  );

  await fetchPokemon("pikachu", mockSetData);

  expect(mockSetData).toHaveBeenCalled();
});
