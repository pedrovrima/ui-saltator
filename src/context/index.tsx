import { useState, useEffect, createContext, ReactNode } from "react";
import type { User, Species, Sounds, Deck } from "../types";
import { Howl, Howler } from "howler";
import { url } from "inspector";
import options from "../components/game/options";
import Options from "../components/game/options";

type random = {
  random: number;
};
type other_species = Species & random;

type optionInfo = {
  genus: string;
  species: string;
  correct: boolean;
  pt_name: string;
};
type OptionsType =   optionInfo[];
;

type OptionGroups = OptionsType[];

const createOptions = (this_id: number, spp_list: Species[]):OptionsType => {
    const spp = spp_list.reduce(
      (data: any, spp: Species) => {
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
      { this_species: {}, other_species: [] }
    );

    const selected_species = spp.other_species
      .sort((a: other_species, b: other_species): number => a.random - b.random)
      .splice(0, 2);

    console.log(spp.this_species);

  
  return [spp.this_species, ...selected_species];

};

export type contextType = {
  deckID?: number;
  setdeckID: (id: number) => void;
  addPoints?: Function;
  setUserInfo: (user: User) => void;
  userInfo?: User;
  sounds?: any;
  loaded_sounds: number;
  songOrder?: any;
  studySpp?: StateSpecies[];
  setStudySpp: (spp: StateSpecies[]) => void;
  total_played: number;
  setPlayed: (num: number) => void;
  this_deck?: Deck;
  options?: OptionGroups;
};

export const Context = createContext<contextType | null>(null);

interface SoundList extends Sounds {
  species_id: number;
  random: number;
}

interface StateSpecies extends Species {
  sounds: Sounds[];
}

// user info

const createHowl = (
  this_url: string,
  setLoadedSounds: Function,
  loaded_sounds: number
) => {
  const sound = new Howl({
    src: [this_url],
    onload: () => {
      setLoadedSounds(loaded_sounds + 1);
    },
  });

  return sound;
};

export const ContextProvider = (props: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [deckID, setdeckID] = useState<number>();
  const [studySpp, setStudySpp] = useState<StateSpecies[]>();
  const [songOrder, setSongOrder] = useState<SoundList[]>();
  const [sounds, setSounds] = useState<any[]>();
  const [loaded_sounds, setLoadedSounds] = useState<number>(0);
  const [total_played, setPlayed] = useState<number>(0);
  const [this_deck, setThisDeck] = useState<Deck>();
  const [options, setOptions] = useState<OptionGroups>();

  const addPoints = (spp_id: number, points: number) => {
    if (studySpp) {
      const otherSpp = studySpp.filter((spp) => spp.id !== spp_id);
      const thisSpp = studySpp.filter((spp) => spp.id === spp_id)[0];
      if (thisSpp.points) {
        thisSpp.points = thisSpp.points + points;
      }
      setStudySpp([...otherSpp, thisSpp]);
    }
  };

  useEffect(() => {
    // write function to get spp from deckID
    // setStudySpp()
    const use_deck = userInfo?.user_decks?.filter(
      (deck) => deck.id === deckID
    )[0];
    setThisDeck(use_deck);
  }, [deckID]);

  useEffect(() => {
    if (studySpp) {
      const sounds = studySpp
        .map((spp) =>
          spp.sounds
            .map((snd) => {
              return { ...snd, species_id: spp.id, random: Math.random() };
            })
            .flat()
        )
        .flat();
      const random_sounds = sounds.sort((a, b) => a.random - b.random);
      setSongOrder(random_sounds);
    }
  }, [studySpp]);

  useEffect(() => {
    if (songOrder) {
      const sound_urls = songOrder.map((song) => song.url);
      if (sound_urls[loaded_sounds]) {
        const this_url = sound_urls[loaded_sounds];
        const sound = createHowl(this_url, setLoadedSounds, loaded_sounds);
        if (sounds) {
          setSounds([...sounds, sound]);
        } else {
          setSounds([sound]);
        }
      }
    }
  }, [songOrder, loaded_sounds]);

  useEffect(() => {
    if (songOrder && this_deck) {
      const the_options:OptionGroups = songOrder.map((sng, i):OptionsType => {
        const options = createOptions(sng.species_id, this_deck.spp);
        return options;
      });

      console.log(the_options)

      setOptions(the_options);
    }
  }, [songOrder]);
  const value = {
    deckID,
    setdeckID,
    addPoints,
    setUserInfo,
    userInfo,
    sounds,
    loaded_sounds,
    songOrder,
    setStudySpp,
    studySpp,
    total_played,
    setPlayed,
    this_deck,
    options
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
