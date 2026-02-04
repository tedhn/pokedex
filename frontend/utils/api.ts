import axios from "axios";
import { IPokemonResponse } from "./types";

const API_URL = "http://localhost:3001";

export async function fetchPokemon({
  pageParam = 0,
  limit = 9,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<IPokemonResponse> {
  console.log("fetching pokemons", pageParam);

  const { data } = await axios.get<IPokemonResponse>(
    `${API_URL}/pokemon?limit=${limit}&offset=${pageParam}`,
  );
  return data;
}
