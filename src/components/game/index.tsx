import React, { useContext, useEffect, useState } from "react";
import { Context, contextType } from "../../context";
import Counter from "./counter";
import { Species } from "../../types";
import GamePart from "./gamepart";
import {Howler} from "howler";
import animate from "./glob_function"
export default function Game() {
  const { sounds, songOrder, total_played } = useContext(
    Context
  ) as contextType;

  // const [path,setPath] = useState("")

  //     let analyser = Howler.ctx.createAnalyser();
  // analyser.fftSize = 256; //Size of data array that is returned
  // Howler.masterGain.connect(analyser);


  // //this connects our music back to the default output, such as your //speakers
  // analyser.connect(Howler.ctx.destination);

  //  setInterval(()=>setPath(animate(new Uint8Array(analyser.frequencyBinCount),32)),2000)
    
  //  useEffect(()=>console.log(path),[path])


  return (
    <>
      <div
        style={{
          backgroundImage: `url("https://www.suaaventura.com.br/wp-content/uploads/2018/10/Pedra-do-Altar_Web-2206-2-Copy-1024x683.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-full p-2 flex justify-center items-start sm:p-8 bg-emerald-900 min-h-screen"
      >
        <div
          style={{
            backgroundColor: "rgba(228, 228, 231, 0.9)",
          }}
          className="  w-full p-2 sm:p-16 rounded-lg sm:w-11/12 lg:w-5/6  z-10 sm:h-3/4  backdrop-blur-2xl shadow-lg"
        >
          <Counter total={songOrder.length} this_position={total_played + 1} />
          {songOrder.map((snd: any, i: number) => (
            <GamePart position={i} />
          ))}
        </div>
      </div>
    </>
  );
}
