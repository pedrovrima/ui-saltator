import React, { useContext } from "react";
import { Context, contextType } from "../context";
import { Link } from "react-router-dom";
const Entry: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://sites.unicentro.br/wp/manejoflorestal/files/2019/11/T.jpg",
          backgroundRepeat: "no-repeat",
          backgroundSize: "fill",
        }}
        className="sm:grid sm:grid-cols-2 h-qscreen w-full bg-emerald-100"
      >
        <div className="absolute top-5 left-5">
          <a target="_blank" href="https://www.oama.eco.br">
            <img src="https://www.oama.eco.br/_next/image?url=%2Flogo.png&w=64&q=75"></img>
          </a>
        </div>
        <div className=" h-full text-center  flex flex-col justify-end mb-16 items-center">
          <h1 className="text-3xl sm:text-7xl text-gray-200 font-extrabold font-sans">
            Aprenda os cantos das aves brasileiras
          </h1>
          <Link to="/login">
            <button className="px-4 py-2 bg-emerald-400 rounded-lg font-bold text-gray-700 shadow-lg m-4 font-md sm:text-lg">
              Comece já!{" "}
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <h1 className="text-center font-bold font-gray-900 text-2xl sm:text-4xl mt-4 p-2">Como Funciona</h1>
<div className="mx-24 grid grid-cols-3  mt-6">
  <p className="mr-12 text-2xl">Selecione um deck de espécies para começar a estudar, montados com base na localização e raridade das espécies</p>
  <p className="mr-12 text-2xl">Comece seus estudos: ouça o canto tocado e selecione a espécie que você acha que é a correspondente ao canto</p>
        <p className="mr-12 text-2xl">Baseado na </p>

</div>

      
      </div>
    </>
  );
};

export default Entry;
