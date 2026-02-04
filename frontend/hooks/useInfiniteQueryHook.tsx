import { fetchPokemon } from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

const usePokemonInfiniteHook = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam }) => fetchPokemon({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      return lastPage.hasNext ? lastPage.nextOffset : undefined;
    },
  });
};

export default usePokemonInfiniteHook;
