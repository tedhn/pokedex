"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import useInfiniteQueryHook from "@/hooks/useInfiniteQueryHook";
import { searchPokemon } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const [searchInput, setSearchInput] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryHook();

  const {
    mutate: mutateSearch,
    data: searchResults,
    isPending: isSearchPending,
    isSuccess: isSearchSuccess,
    reset: resetSearch,
  } = useMutation({
    mutationFn: (name: string) => {
      setIsSearching(true);
      return searchPokemon({ name });
    },
  });

  React.useEffect(() => {
    if (searchInput === "") {
      setIsSearching(false);
      resetSearch();
    }
  }, [searchInput, resetSearch]);

  const pokemonList =
    searchInput && isSearchSuccess && !isSearchPending
      ? searchResults.data
      : data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen w-full container mx-auto bg-slate-900 ">
      <div className="container ">
        <div className="grid grid-cols-12 h-60 grid-rows-2 gap-4 mb-4">
          <div className="border-2 border-amber-600 row-span-2 col-span-9">
            CAROUSEL
          </div>
          <div className="border-2 border-red-600 col-span-3">
            STATIC BANNER
          </div>
          <div className="border-2 border-blue-600  col-span-3">
            STATIC BANNER
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ">
          <div className="border-2 sticky top-4 border-green-600 col-span-2 h-75">
            STSATIC IMAGE
          </div>
          <div className="col-span-7">
            <div className="sticky top-4 flex justify-between items-center gap-4 pb-4 bg-slate-900 z-10">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full flex rounded border-2 border-slate-700 px-4 py-2 bg-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
              <Button
                onClick={() => mutateSearch(searchInput)}
                disabled={isSearchPending}
              >
                Search
              </Button>
            </div>

            <div className="my-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {pokemonList.length === 0 ? (
                <p className="text-white col-span-3 text-center">
                  No Pokémon found.
                </p>
              ) : (
                pokemonList.map((pokemon) => (
                  <Card key={pokemon.name} pokemon={pokemon} />
                ))
              )}
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
          <div className="border-2 border-green-600 col-span-3 sticky top-4 h-75">
            STSATIC IMAGE
          </div>
        </div>
      </div>
    </div>
  );
}
