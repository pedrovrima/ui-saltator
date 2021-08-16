import { useEffect, useState } from "react";
import { MdPlayArrow, MdPause, MdReplay } from "react-icons/md";

export default function SoundButtons(props: any) {
  const { sound } = props;
  const [playing, setPlaying] = useState<boolean>(true);

  const audioCtx = new AudioContext();
  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256; //Size of data array that is returned

  // Add audio elememt to context.
  let source = audioCtx.createMediaElementSource(sound);

  source.connect(analyser);
  //this connects our music back to the default output, such as your //speakers
  source.connect(audioCtx.destination);

  let data = new Uint8Array(analyser.frequencyBinCount);

  setInterval(loopingFunction,1000)
  // requestAnimationFrame(loopingFunction);

  function loopingFunction() {
    // requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    // console.log(data)

  }

  useEffect(() => {
    sound.play();
  }, []);

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <button
          onClick={() => {
            if (!sound.paused) {
              sound.pause();
              setPlaying(false);
            } else {
              sound.play();
              setPlaying(true);
            }
          }}
        >
          {!playing ? (
            <MdPlayArrow className="w-8 h-8"></MdPlayArrow>
          ) : (
            <MdPause className="w-8 h-8"></MdPause>
          )}
        </button>
        <button
          onClick={() => {
            sound.pause();
            sound.play();
            setPlaying(true);
          }}
        >
          <MdReplay className="w-7 h-7"></MdReplay>
        </button>
      </div>
    </>
  );
}
