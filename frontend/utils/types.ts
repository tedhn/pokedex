export interface IPokemon {
  image: string;
  name: string;
  type: string[];
  height: number;
  weight: number;
}

export interface IPokemonResponse {
  data: IPokemon[];
  total: number;
  hasNext: boolean;
  nextOffset: number | null;
}
