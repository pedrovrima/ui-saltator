import React, { useContext, useEffect, useState } from "react";
import { Context, contextType } from "../../context";
import Counter from "./counter";
import { Species } from "../../types";
import GamePart from "./gamepart"
type random = {
  random: number;
};
type other_species = Species & random;


const createOptions = (this_id: number, spp_list: Species[]) => {
  const spp = spp_list.reduce(
    (data:any, spp: Species) => {
      if (spp.id === this_id) {
        return { ...data, this_species: { ...spp, correct: true } };
      }
      return {
        ...data,
        other_species: [
          ...data.other_species,
          { ...spp, random: Math.random(), correct: false },
        ],
      };
    },
    {this_species:{},
      other_species: [],
    }
  );

  const selected_species = spp.other_species
    .sort((a:other_species, b:other_species):number => a.random - b.random)
    .splice(0, 2);
    
  return [...spp.this_species, ...selected_species];
};

export default function Game() {
  const {
    sounds,
    loaded_sounds,
    total_played,
    setPlayed,
    studySpp,
    setStudySpp,
    userInfo,
    this_deck
  } = useContext(Context) as contextType;
  const [options,setOptions] = useState(createOptions(sounds[total_played].spp_id,this_deck.spp));
  const nextSound = ()=>{setPlayed(total_played+1)}

  useEffect(() => {
    setAnswered(false);
    setOptions(createOptions(sounds[total_played].spp_id,this_deck.spp))
  }, [total_played]);

  return (
    <>
      <Counter total={loaded_sounds} this_position={total_played + 1} />
      <GamePart sound={sounds[total_played]}  next={nextSound} options={options} />

    </>
  );
}
