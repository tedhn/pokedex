import express from "express";
import cors from "cors";
import Pokedex from "pokedex-promise-v2";

const pokedexOptions = {
  protocol: "https" as const,
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const pokedex = new Pokedex(pokedexOptions);

const app: express.Application = express();
const port = 3001;

app.use(cors());

app.get("/", async (req, res) => {
  const pokemonsRes = await pokedex.getPokemonsList({ limit: 9, offset: 0 });

  console.log(pokemonsRes);

  res.send("Hello World!");
});

app.get("/pokemon", async (req, res) => {
  const { limit, offset } = req.query;

  const limitNum = limit ? Number(limit) : 9;
  const offsetNum = offset ? Number(offset) : 0;

  const {
    results: pokemonNamesRes,
    count,
    next,
  } = await pokedex.getPokemonsList({
    limit: limitNum,
    offset: offsetNum,
  });

  const pokemonDetailsPromises = pokemonNamesRes.map((pokemon) => {
    return pokedex.getPokemonByName(pokemon.name);
  });

  const pokemonRawData = await Promise.allSettled(pokemonDetailsPromises);
  const pokemonData = pokemonRawData
    .filter((pokemon) => pokemon.status === "fulfilled")
    .map((pokemon) => {
      return {
        image: pokemon.value.sprites.front_default,
        name: pokemon.value.name,
        type: pokemon.value.types.map(
          (t: { slot: number; type: { name: string } }) => t.type.name,
        ),
        height: pokemon.value.height,
        weight: pokemon.value.weight,
      };
    });

  res.json({
    data: pokemonData,
    total: count,
    hasNext: next !== null,
    nextOffset: next ? offsetNum + limitNum : null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
