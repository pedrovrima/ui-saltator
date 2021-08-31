import { useEffect, useContext, useState } from "react";
import { contextType, Context } from "../context";

export default function Loading() {
  const [percentage_complete, setPercentage] = useState(0);
  const [image, setImage] = useState(Math.ceil(Math.random()*4))
  const { studySpp, loaded_sounds } = useContext(Context) as contextType;

  useEffect(() => {
    if (studySpp) {
      setPercentage(10);
    }
  }, [studySpp]);
useEffect(() => {
  setInterval(
    () =>
      setPercentage((percentage_complete) => {
        if(percentage_complete<40){
          return percentage_complete + 1;}
        if(percentage_complete<70){
        return percentage_complete + 0.5;}
        return percentage_complete
      }),
    500
  );
},[])

  // const image = Math.ceil(Math.random()*4)

  useEffect(() => {
    setPercentage(percentage_complete+5)
  }, [loaded_sounds]);

  return (
    <div style={{backgroundImage:"url(/load"+image+".jpg)",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="load mt-0 min-h-screen w-screen">
      
      <>
        <div className="z-10 relative  pt-24 mb-4 mx-16 sm:mx-24">
          <div className="flex flex-col items-center">
          <img className="h-24 w-24" src="/logo_oama.png"></img>

    <p className="text-gray-200 font-bold">Conservação com Ciência</p>
          </div>
          <div className="overflow-hidden h-4 mt-4 text-xs flex rounded bg-gray-500 ">
            <div
              style={{ width: `${Math.round(percentage_complete)}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
            ></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
          <h2 className="font-bold text-gray-100 text-sm">{`${Math.round(percentage_complete)}%`}</h2>
          <h3 className="text-gray-100">Isso pode levar alguns segundos...</h3>
          </div>
        </div>{" "}
      </>
    </div>
  );
}
