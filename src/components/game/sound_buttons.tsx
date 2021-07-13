import { useEffect, useState } from "react";

export default function SoundButtons(props: any) {
  const { sound } = props;
  const [playing, setPlaying] = useState<boolean>(true);

  // useEffect(() => {
  //   sound.play();
  // }, []);

  return (
    <>
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
        {!playing ? "Play" : "Pause"}
      </button>
      <button
        onClick={() => {
          sound.stop();
          sound.play();
          setPlaying(true);
        }}
      >
        Recomeçar
      </button>
    </>
  );
}
