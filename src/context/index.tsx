import { useState, useEffect, createContext, ReactNode } from "react";
import type { User, Species, Sounds } from "../types";
import { Howl, Howler } from "howler";
import { url } from "inspector";

export type contextType = {
  deckID?: number,
  setdeckID: (id: number) =>void,
  addPoints?: Function,
  setUserInfo: (user:User)=>void,
  userInfo?: User,
  sounds?: any,
  loaded_sounds?: any,
  songOrder?: any,
}


export const Context = createContext<contextType| null>(null)

interface SoundList extends Sounds {
  species_id: number;
  random: number;
}

interface StateSpecies extends Species {
  sounds: Sounds[];
}

// user info

const createHowl = (
  urls: string[],
  this_url: number,
  setSound: Function,
  setLoadedSounds: Function
) => {
  const sounds = new Howl({
    src: urls[this_url],
    onload: () => {
      if (urls[this_url + 1]) {
        createHowl(urls, this_url + 1, setSound, setLoadedSounds);
      }
    },
  });

  setSound(sounds);
  setLoadedSounds(this_url + 1);
};

export const ContextProvider = (props: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [deckID, setdeckID] = useState<number>();
  const [studySpp, setStudySpp] = useState<StateSpecies[]>();
  const [songOrder, setSongOrder] = useState<SoundList[]>();
  const [sounds, setSounds] = useState();
  const [loaded_sounds, setLoadedSounds] = useState<number>(0);

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
      const sound_urls = songOrder.map((song) => `url${song.xeno_id}`);
      createHowl(sound_urls, loaded_sounds, setSounds, setLoadedSounds);
    }
  }, [songOrder, sounds]);

  const value = {
    deckID,
    setdeckID,
    addPoints,
    setUserInfo,
    userInfo,
    sounds,
    loaded_sounds,
    songOrder,
  };
  return (<Context.Provider value={value}>{props.children}</Context.Provider>);
};
