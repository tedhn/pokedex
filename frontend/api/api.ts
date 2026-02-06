import axios, { AxiosError } from "axios";
import { IGetPokemonResponse, ISearchPokemonResponse } from "../utils/types";

const API_URL = "http://localhost:3001";

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    public statusCode: number | undefined,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

// Helper function to handle axios errors
function handleAPIError(error: unknown): APIError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const message = axiosError.message || "Failed to fetch data";
    return new APIError(axiosError.response?.status, message);
  }
  if (error instanceof Error) {
    return new APIError(undefined, error.message);
  }
  return new APIError(undefined, "An unknown error occurred");
}

export async function fetchPokemon({
  pageParam = 0,
  limit = 9,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<IGetPokemonResponse> {
  try {
    console.log("fetching pokemons", pageParam);

    const { data } = await axios.get<IGetPokemonResponse>(
      `${API_URL}/pokemon?limit=${limit}&offset=${pageParam}`,
    );
    return data;
  } catch (error) {
    throw handleAPIError(error);
  }
}

export async function searchPokemon({
  name,
}: {
  name: string;
}): Promise<ISearchPokemonResponse> {
  try {
    const { data } = await axios.get(`${API_URL}/search?name=${name}`);
    return data;
  } catch (error) {
    throw handleAPIError(error);
  }
}
