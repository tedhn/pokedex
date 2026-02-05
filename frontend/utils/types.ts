export interface IPokemon {
  image: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export interface IGetPokemonResponse {
  data: IPokemon[];
  total: number;
  hasNext: boolean;
  nextOffset: number | null;
}

export interface ISearchPokemonResponse {
  data: IPokemon[];
}
