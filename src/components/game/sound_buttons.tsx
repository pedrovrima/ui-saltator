import { useEffect, useState } from "react";
import { MdPlayArrow, MdPause, MdReplay } from "react-icons/md";
export default function SoundButtons(props: any) {
  const { sound } = props;
  const [playing, setPlaying] = useState<boolean>(true);

  // const audioCtx = new AudioContext();


  return (
    <>
      <div className="flex w-full justify-center items-center">
        <button
          onClick={() => {
            if (sound.playing()) {
              sound.pause();
              setPlaying(false);
            } else {
              sound.play();
              setPlaying(true);
            }
          }}
        >
          {!playing ? (
            <MdPlayArrow className="w-6 h-6 sm:w-8 sm:h-8"></MdPlayArrow>
          ) : (
            <MdPause className="w-6 h-6 sm:w-8 sm:h-8"></MdPause>
          )}
        </button>
        <button
          onClick={() => {
            sound.stop();
            sound.play();
            setPlaying(true);
          }}
        >
          <MdReplay className="w-5 h-5 sm:w-7 sm:h-7"></MdReplay>
        </button>
      </div>
    </>
  );
}
