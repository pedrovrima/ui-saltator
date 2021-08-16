import { useEffect, useState, useContext } from "react";
import { Context, contextType } from "../../context";

import Options from "./options";
import SoundButtons from "./sound_buttons";
import { Species } from "../../types";
import Figure from "./image"

export default function GamePart(props: any) {
  const { position } = props;
  const {
    sounds,
    total_played,
    setPlayed,
    songOrder,
    this_deck,
    options,
    addPoints,
  } = useContext(Context) as contextType;

  const [answered, setAnswered] = useState(false);
  const [sound, setSound] = useState(sounds[position]);
  const setScore = (correct: boolean): void => {
    const points = correct ? 1 : -1;
    addPoints(songOrder[total_played].species_id, points);
  };
  console.log(sound);


  useEffect(() =>{
    if(!sound && sounds[position]){
      setSound(sounds[position])
      
    }
  },[sounds])

  useEffect(() => {
    if (position === total_played) {
      sound.play();
      console.log(sound.paused, position);
    }
  }, [total_played]);

  return (
    <div style={{ display: `${total_played === position ? "" : "none"}` }}>
      <Figure answered={answered}></Figure>
      <SoundButtons sound={sound}></SoundButtons>
      <Options
        score_function={setScore}
        options={options ? options[position] : undefined}
        answered={answered}
        setAnswered={setAnswered}
      ></Options>
      <div className="w-full flex justify-end ">
        <button
        className={`${answered ? "":"invisible"} border-2  shadow-lg border-emerald-700 px-4 py-2 rounded-md mt-4 text-emerald-700`}
          onClick={() => {
            setPlayed(total_played + 1);
            sound.pause();
          }}
        >
          Próximo
        </button>
        </div>
      
    </div>
  );
}
