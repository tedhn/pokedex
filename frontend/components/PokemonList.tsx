"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import React from "react";
import { Loader, Loader2 } from "lucide-react";

interface PokemonListProps {
  pokemonList: any[];
  isSearching: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonList,
  isSearching,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  if (isLoading) {
    return (
      <div className="text-center text-white h-75 flex justify-center items-center">
        <Loader2 className="animate-spin m-auto" />
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return <div className="text-center text-white">No Pokémon found.</div>;
  }

  return (
    <div>
      {/*  Pokemon Cards Grid */}
      <div className="my-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {!isSearching && (
        <div className="flex justify-center pb-4">
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Loader2 className="animate-spin" />
            ) : hasNextPage ? (
              "Load More"
            ) : (
              "No more data"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
