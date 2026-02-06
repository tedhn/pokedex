import { fetchPokemon } from "@/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

const usePokemonInfiniteHook = () => {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam }) => fetchPokemon({ pageParam }),
    initialPageParam: 0,
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      return lastPage.hasNext ? lastPage.nextOffset : undefined;
    },
  });
};

export default usePokemonInfiniteHook;
