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
export const pokedex = new Pokedex(pokedexOptions);

const app: express.Application = express();
const port = 3001;

app.use(cors());

export const getPokemonDetails = async (
  pokemonNames: Pokedex.NamedAPIResource[],
) => {
  try {
    const pokemonDetailsPromises = pokemonNames.map((pokemon) => {
      return pokedex.getPokemonByName(pokemon.name);
    });

    const pokemonRawData = await Promise.allSettled(pokemonDetailsPromises);
    const pokemonData = pokemonRawData
      .filter((pokemon) => pokemon.status === "fulfilled")
      .map((pokemon) => {
        return {
          image: pokemon.value.sprites.front_default || null,
          name: pokemon.value.name,
          type: pokemon.value.types.map(
            (t: { slot: number; type: { name: string } }) => t.type.name,
          ),
          height: pokemon.value.height,
          weight: pokemon.value.weight,
        };
      });

    return pokemonData;
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    throw error;
  }
};

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/pokemon", async (req, res) => {
  try {
    const { limit, offset } = req.query;

    const limitNum = limit ? Number(limit) : 9;
    const offsetNum = offset ? Number(offset) : 0;

    const {
      results: allPokemon,
      count,
      next,
    } = await pokedex.getPokemonsList({
      limit: limitNum,
      offset: offsetNum,
    });

    const pokemonData = await getPokemonDetails(allPokemon);

    res.json({
      data: pokemonData,
      total: count,
      hasNext: next !== null,
      nextOffset: next ? offsetNum + limitNum : null,
    });
  } catch (error) {
    console.error("Error in /pokemon endpoint:", error);
    res.status(500).json({
      error: "Failed to fetch Pokemon list",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== "string") {
      return res.json({ data: [] });
    }

    const searchTerm = name.toLowerCase();

    const { results: allPokemon } = await pokedex.getPokemonsList({
      limit: 1500,
      offset: 0,
    });

    const matchingPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm),
    );

    const pokemonData = await getPokemonDetails(matchingPokemon);

    res.json({ data: pokemonData });
  } catch (error) {
    console.error("Error in /search endpoint:", error);
    res.status(500).json({
      error: "Failed to search Pokemon",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Global error handler
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  },
);
