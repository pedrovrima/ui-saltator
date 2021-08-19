import animate from "./glob_function";
import { Howler } from "howler";
import { useRef, useState, useEffect } from "react";

export default function Figure(props: any) {
  const { answered, position,path } = props;
  // const [soundData,setSoundData] = useState<Uint8Array>()
  const svg = useRef(null);
  // if(position === 0){
  // let analyser = Howler.ctx.createAnalyser();
  // analyser.fftSize = 256; //Size of data array that is returned
  // Howler.masterGain.connect(analyser);

  // // Add audio elememt to context.
  // let source = audioCtx.createMediaElementSource(sound);

  // source.connect(analyser);
  // //this connects our music back to the default output, such as your //speakers
  // analyser.connect(Howler.ctx.destination);

  //  setInterval(()=>setSoundData(new Uint8Array(analyser.frequencyBinCount)),1000)
  // }
  // // requestAnimationFrame(loopingFunction);

  // useEffect(()=>{

  //   if(svg.current && soundData){
  //     animate(svg.current,soundData,32)
  //   }
  // },[soundData])

  console.log(path)
  return (
    <div className="w-full flex justify-center my-4 sm:my-8">
      {/* <div className="absolute h-64  w-64 z-0 ">
        <svg viewBox="0 0 10 10">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop id="gradientStop1" offset="0%" stop-color="blue" />
              <stop id="gradientStop2 " offset="100%" stop-color="green" />
            </linearGradient>
          </defs>

          <path d={path} fill="blue"></path>
        </svg>
      </div> */}
      <div className=" w-36 h-36  lg:h-64 lg:w-64 z-10 bg-emerald-500 rounded-full">
        <img
          alt="img"
          className={`${
            answered ? "" : "hidden"
          }  bg-emerald-500 rounded-full`}
          src="https://s3.amazonaws.com/media.wikiaves.com.br/images/2583/3852244g_d6cc844d83c3a936626a0f4a3924a33b.jpg"
        ></img>
      </div>

    </div>
  );
}
