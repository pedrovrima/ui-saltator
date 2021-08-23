import React, { useContext } from "react";
import { Context, contextType } from "../context";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Entry: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div
        style={{
          backgroundImage:            "url(https://sites.unicentro.br/wp/manejoflorestal/files/2019/11/T.jpg)",
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
          {/* <Link to="/login"> */}
            <button  onClick={() => loginWithRedirect()} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-900 rounded-lg font-bold text-gray-200 shadow-lg m-4 font-md sm:text-lg">
              Comece já!{" "}
            </button>
          {/* </Link> */}
        </div>
      </div>
      <div className="">
        <h1 className="text-center font-bold font-gray-900 text-2xl sm:text-4xl mt-4 p-2">
          Como Funciona
        </h1>
        <div className="mx-4 sm:mx-24 grid sm:grid-cols-3  mt-6">
          <div className="mb-4 sm:mr-12 ">
            <h2 className="text-lg font-bold">Selecione um deck</h2>
            <p className="text-md">
              Escolha um grupo espécies para começar a estudar, montados com
              base na localização e raridade das espécies
            </p>
          </div>
          <div className="mb-4 sm:mr-12 ">
            <h2 className="text-lg font-bold"> Tente identificar os sons</h2>
            <p className="text-md">
              Ouça o canto tocado e selecione a espécie que você acha que é a
              correspondente ao canto{" "}
            </p>
          </div>

          <div className="mb-4 sm:mr-12 ">
            <h2 className="text-lg font-bold"> Continue estudando</h2>
            <p className="text-md">
              Seus futuros estudos serão baseados em seus acerto e erros,
              otimizando o aprendizado.{" "}
            </p>
          </div>
        </div>

        <div className="m-12 flex sm:flex-row justify-around">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold"> Realização</h2>
            <img src="https://www.oama.eco.br/_next/image?url=%2Flogo.png&w=64&q=75"></img>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold col"> Apoio</h2>
            <div className="flex flex-row justify-center items-center">
            <img className="h-16 w-16" src="https://www.oama.eco.br/_next/image?url=%2Fpartners%2Fbirds%20atlantic.jpg&w=1920&q=75"></img>
            <img className="h-12 w-12" src="https://crbio04.gov.br/wp-content/uploads/2020/07/logo-crbio04.png"></img>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Entry;
