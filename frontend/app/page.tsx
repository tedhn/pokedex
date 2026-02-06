"use client";
import PokemonList from "@/components/PokemonList";
import Button from "@/components/Button";
import useInfiniteQueryHook from "@/hooks/useInfiniteQueryHook";
import { searchPokemon } from "@/utils/api";
import zazaBanner from "@/assets/zaza-banner.png";
import mewBanner from "@/assets/mew-banner.png";
import ashImage from "@/assets/ash.png";
import oakImage from "@/assets/oak.png";

import charmanderImage from "@/assets/charmander.png";
import bulbasaurImage from "@/assets/bulbasaur.png";
import squirtleImage from "@/assets/squirtle.png";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import Carousel from "@/components/Carousel";

export default function Home() {
  const [searchInput, setSearchInput] = React.useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] =
    React.useState(searchInput);
  const [isSearching, setIsSearching] = React.useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
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

    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, resetSearch]);

  React.useEffect(() => {
    if (debouncedSearchInput) {
      mutateSearch(debouncedSearchInput);
    }
  }, [debouncedSearchInput, mutateSearch]);

  const pokemonList =
    searchInput && isSearchSuccess && !isSearchPending
      ? searchResults.data
      : data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="min-h-screen w-full container mx-auto bg-slate-900 p-4">
      <div className="container ">
        <div className="grid grid-cols-12 h-60 grid-rows-2 gap-4 mb-4">
          <div className="row-span-2 col-span-9">
            <Carousel
              images={[
                charmanderImage.src,
                bulbasaurImage.src,
                squirtleImage.src,
              ]}
            />
          </div>
          <div className=" col-span-3">
            <img
              src={zazaBanner.src}
              alt="Logo Banner"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className=" col-span-3">
            <img
              src={mewBanner.src}
              alt="Logo Banner"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 ">
          <div className="bg-white sticky top-4 col-span-2 h-90 rounded">
            <img
              src={ashImage.src}
              alt="Logo Banner"
              className="w-full h-full object-contain rounded"
            />
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

            <PokemonList
              pokemonList={pokemonList}
              isSearching={isSearching}
              isLoading={isSearchPending || isLoading}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
            />
          </div>
          <div className="bg-white sticky top-4 col-span-3 h-90 rounded">
            <img
              src={oakImage.src}
              alt="Logo Banner"
              className="w-full h-full object-contain rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
