import { useEffect, useContext,useState } from "react";
import { contextType, Context } from "../context";

export default function Loading() {
  const [percentage_complete,setPercentage]  = useState(0)
  const { studySpp, loaded_sounds } = useContext(Context) as contextType;

  useEffect(()=>{
    if(studySpp){
      setPercentage(10)
    }
  },[studySpp])


  useEffect(()=>{
    setPercentage(percentage_complete+(loaded_sounds)*10)

  },[loaded_sounds])


  return <div className="h-full w-full">
    <>
    <div className="relative pt-1 mt-24 mb-4 mx-16 sm:mx-24">
        <div className="overflow-hidden h-4 mt-4 text-xs flex rounded bg-gray-500 ">
          <div
            style={{ width: `${percentage_complete}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
          ></div>
        </div>
        <h2 className="font-bold text-sm">{`${percentage_complete}%`}</h2>      
      </div>{" "}

    </>
  </div>;
}
