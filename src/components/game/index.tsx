import React, {useContext, useEffect, useState} from "react";
import {Context, contextType} from "../../context"
import Counter from "./counter"

export default function Game  ()  {
  const {sounds,loaded_sounds,total_played,setPlayed,studySpp,setStudySpp,userInfo} = useContext(Context) as contextType;
  const [answered,setAnswered]= useState(false);
  
  useEffect(() => {
    setAnswered(false)
    
    
  }, [total_played])


  return (
    <>
  <Counter total={loaded_sounds} this_position={total_played+1} />

      {/* image + sound_blob */}
      {/* play/pause and  replay button*/}
      {/* options */} 

    </>
  );
};
