"use client";
import Card from "@/components/Card";
import useInfiniteQueryHook from "@/hooks/useInfiniteQueryHook";
import { fetchPokemon } from "@/utils/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryHook();

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
            <div className="sticky top-4 border-2 border-green-600 ">
              SEARCHBAR
            </div>

            <div className="my-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.pages.map((page, pageIdx) => (
                <React.Fragment key={pageIdx}>
                  {page.data.map((pokemon) => (
                    <Card key={pokemon.name} pokemon={pokemon} />
                  ))}
                </React.Fragment>
              ))}
            </div>

            <div className="flex justify-center pb-4">
              {isFetchingNextPage ? (
                "Loading more..."
              ) : (
                <button
                  className="cursor-pointer bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {hasNextPage ? "Load More" : "No more data"}
                </button>
              )}
            </div>
          </div>
          <div className="border-2 border-green-600 col-span-3 sticky top-4 h-75">
            STSATIC IMAGE
          </div>
        </div>
      </div>
    </div>
  );
}
