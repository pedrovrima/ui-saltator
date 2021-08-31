import { useState, useEffect, createContext, ReactNode } from "react";
import type { User, Species, Sounds, Deck, Image } from "../types";
import { Howl, Howler } from "howler";
import { url } from "inspector";
import Options from "../components/game/options";
import getUser from "../api/user";
import getSpp from "../api/deck";
type random = {
  random: number;
  second_random: number;
};
type other_species = Species & random;

type optionInfo = {
  genus: string;
  species: string;
  correct: boolean;
  pt_common_name: string;
};
type OptionsType = optionInfo[];
type OptionGroups = OptionsType[];

const createOptions = (this_id: number, spp_list: Species[]): OptionsType => {
  const spp = spp_list.reduce(
    (data: any, spp: Species) => {
      if (spp.id === this_id) {
        return {
          ...data,
          this_species: { ...spp, correct: true, second_random: Math.random() },
        };
      }
      return {
        ...data,
        other_species: [
          ...data.other_species,
          {
            ...spp,
            random: Math.random(),
            second_random: Math.random(),
            correct: false,
          },
        ],
      };
    },
    { this_species: {}, other_species: [] }
  );

  const selected_species = spp.other_species
    .sort((a: other_species, b: other_species): number => a.random - b.random)
    .splice(0, 2);

  return [spp.this_species, ...selected_species].sort(
    (a: other_species, b: other_species): number =>
      a.second_random - b.second_random
  );
};

export type contextType = {
  deckID?: number;
  setdeckID: (id: number | undefined) => void;
  addPoints: (spp_id: number, points: number) => void;
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
  setUserId: (id: string) => void;
  setOptions: (opt: OptionGroups) => void;
  setSounds: (snd: any) => void;
  setLoadedSounds: (num: number) => void;
  setSongOrder: (sng: SoundList[]) => void;
};

export const Context = createContext<contextType | null>(null);

interface SoundList extends Sounds {
  species_id: number;
  random: number;
  image: Image;
}

export interface StateSpecies extends Species {
  deck_id: number;
  sounds: Sounds[];
  points: number;
  image: Image[];
}

// user info

const createHowl = (
  this_url: string,
  setLoadedSounds: Function,
  loaded_sounds: number
) => {
  // const sound =    new Audio ()
  // sound.crossOrigin="anonymous";
  // sound.src=this_url;
  // console.log(this_url);

  const sound = new Howl({
    html5: false,
    src: [this_url],
    onload: () => {
      setLoadedSounds(loaded_sounds + 1);
    },
  });

  console.log(this_url);
  // setLoadedSounds(loaded_sounds + 1)

  return sound;
};

export const ContextProvider = (props: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>();
  const [userInfo, setUserInfo] = useState<User>();
  const [deckID, setdeckID] = useState<number | undefined>();
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
      thisSpp.points = thisSpp.points + points;
      setStudySpp([...otherSpp, thisSpp]);
    }
  };

  const userSetter = async (id: string) => {
    const user = await getUser(id);
    console.log(user);
    setUserInfo(user);
  };

  useEffect(() => {
    if (userId) {
      userSetter(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (total_played === songOrder?.length) {
      // create object to send and use on end
      // send
      //set sent and show end
    }
  }, [total_played]);

  const sppSetter = async (id: number) => {
    console.log("here");
    const spp = await getSpp(id);
    console.log(spp);
    setStudySpp(spp);
  };

  useEffect(() => {
    console.log(deckID);
    if (deckID) {
      const use_deck = userInfo?.user_decks?.filter(
        (deck) => deck.id === deckID
      )[0];
      console.log(use_deck);
      if (use_deck) {
        sppSetter(deckID);

        setThisDeck(use_deck);
      }
    }
  }, [deckID]);

  useEffect(() => {
    if (studySpp && !songOrder) {
      const sounds = studySpp
        .map((spp) =>
          spp.sounds
            .map((snd) => {
              return {
                ...snd,
                image: spp.image[0],
                species_id: spp.id,
                random: Math.random(),
              };
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
      const sound_urls = songOrder.map((song) => song.xeno_id);
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
    if (songOrder && this_deck && !options) {
      const the_options: OptionGroups = songOrder.map((sng, i): OptionsType => {
        console.log(sng);
        const options = createOptions(sng.species_id, this_deck.spp);
        // console.log(options[0], sng.species_id, i);
        return options;
      });

      setOptions(the_options);
      console.log(the_options);
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
    options,
    setUserId,
    setOptions,
    setSounds,
    setLoadedSounds,
    setSongOrder,
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
