import axios from "axios";
import { IGetPokemonResponse, ISearchPokemonResponse } from "./types";

const API_URL = "http://localhost:3001";

export async function fetchPokemon({
  pageParam = 0,
  limit = 9,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<IGetPokemonResponse> {
  console.log("fetching pokemons", pageParam);

  const { data } = await axios.get<IGetPokemonResponse>(
    `${API_URL}/pokemon?limit=${limit}&offset=${pageParam}`,
  );
  return data;
}

export async function searchPokemon({
  name,
}: {
  name: string;
}): Promise<ISearchPokemonResponse> {
  const { data } = await axios.get(`${API_URL}/search?name=${name}`);
  return data;
}
