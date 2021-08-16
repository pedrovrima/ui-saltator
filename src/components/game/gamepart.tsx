import { useEffect, useState, useContext } from "react";
import { Context, contextType } from "../../context";

import Options from "./options";
import SoundButtons from "./sound_buttons";
import { Species } from "../../types";

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

  useEffect(() =>{
    if(!sound && sounds[position]){
      setSound(sounds[position])
      
    }
  },[sounds])

  useEffect(() => {
    if (position === total_played) {
      sound.play();
      console.log(sound.playing(), position);
    }
  }, [total_played]);

  return (
    <div style={{ display: `${total_played === position ? "" : "none"}` }}>
      {/* image + sound_blob */}
      <SoundButtons sound={sound}></SoundButtons>
      <Options
        score_function={setScore}
        options={options ? options[position] : undefined}
        answered={answered}
        setAnswered={setAnswered}
      ></Options>
      {answered ? (
        <button
          onClick={() => {
            setPlayed(total_played + 1);
            sound.stop();
          }}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
