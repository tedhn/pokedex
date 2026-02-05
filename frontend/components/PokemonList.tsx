"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import React from "react";

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
    return <div className="text-center text-white">Loading...</div>;
  }

  if (pokemonList.length === 0) {
    return <div className="text-center text-white">No Pokémon found.</div>;
  }

  return (
    <div>
      {/*  Pokemon Cards Grid */}
      <div className="my-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {!isSearching && (
        <div className="flex justify-center pb-4">
          {isFetchingNextPage ? (
            "Loading more..."
          ) : (
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {hasNextPage ? "Load More" : "No more data"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
