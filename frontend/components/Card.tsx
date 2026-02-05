import { capitalizeFirstLetter } from "@/utils/function";
import { IPokemon } from "@/utils/types";
import React from "react";

interface CardProps {
  pokemon: IPokemon;
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  return (
    <div className="border-2 rounded border-slate-700 p-4 h-25 flex justify-start items-center">
      <img src={pokemon.image} className="h-16 w-16 object-contain mr-4" />
      <div>
        <p className="text-white mb-2">{capitalizeFirstLetter(pokemon.name)}</p>

        <div>
          {pokemon.type.map((type, idx) => (
            <span
              key={type + idx}
              className="bg-slate-600 text-white px-2 py-1 text-xs rounded mr-2"
            >
              {capitalizeFirstLetter(type)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
