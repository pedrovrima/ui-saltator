import { useEffect, useState, useContext } from "react";
import { Context, contextType } from "../../context";

import Options from "./options";
import SoundButtons from "./sound_buttons";
import { Species } from "../../types";
import Figure from "./image";

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export default function GamePart(props: any) {
  const { position,path } = props;
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

  useEffect(() => {
    if (!sound && sounds[position]) {
      setSound(sounds[position]);
    }
  }, [sounds]);

  useEffect(() => {
    if (position === total_played) {
      sound.play();
    }
  }, [total_played]);

  return (
    <div
      style={{ display: `${total_played === position ? "" : "none"}` }}
    >
      <div       className="grid sm:grid-cols-2"
>
      <div>
        <Figure answered={answered} position={position} url={songOrder[total_played].image.url}></Figure>
        <SoundButtons sound={sound}></SoundButtons>
      </div>
      <div>
        <Options
          score_function={setScore}
          options={options ? options[position] : undefined}
          answered={answered}
          setAnswered={setAnswered}
        ></Options>
        </div>
        </div>
        <div
          className={`${
            answered ? "" : "invisible"
          } w-full mt-4 flex flex-col sm:flex-row justify-between `}
        >
          <div className="flex text-xs sm:text-md  flex-col">
            <p>{`Gravação: ${toTitleCase(songOrder[total_played].author)}`}</p>
            <p>{`Fotografia: ${toTitleCase(
              songOrder[total_played].image.author
            )}`}</p>
          </div>
          <div className="flex items-end justify-end">
            <button
              className={` mt-4 sm:mt-0 border-2  shadow-lg border-emerald-700 px-4 py-2 rounded-md text-sm sm:text-md text-emerald-700`}
              onClick={() => {
                setPlayed(total_played + 1);
                sound.stop();
              }}
            >
              Próximo
            </button>
        </div>
      </div>
    </div>
  );
}
