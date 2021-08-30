import React, { useContext } from "react";
import { Context, contextType } from "../context";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactGA from 'react-ga';


const Entry: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/inicio.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hero-small z-0 md:hero relative sm:grid sm:grid-cols-2 h-qscreen w-full bg-emerald-100"
      >
        <div className="relative z-50">
          <div className="absolute h-16 w-16 top-5 left-5">
            <ReactGA.OutboundLink
              eventLabel="siteOAMa"
              rel="noreferrer"
              target="_blank"
              to="https://www.oama.eco.br"
            >
              <img alt="logo-oama" src="/logo_oama.png"></img>
            </ReactGA.OutboundLink>
          </div>
          <div className=" h-qscreen text-center md:p-8  flex flex-col justify-end mb-16 items-center">
            <h1 className="p-4 text-3xl sm:text-7xl text-blue-100 font-extrabold font-sans">
              Aprenda os cantos das aves brasileiras
            </h1>
            {/* <Link to="/login"> */}
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-900 rounded-lg font-bold text-gray-200 shadow-lg m-4 font-md sm:text-lg"
            >
              Comece já!{" "}
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="text-center font-extrabold font-gray-900 text-2xl sm:text-4xl mt-4 p-2">
          Como Funciona
        </h1>
        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>

        <div className="mx-4 p-4 sm:mx-24 grid sm:grid-cols-3  mt-6">
          <div className="flex flex-col items-center mb-4 sm:mr-12 ">
            <img className="h-32 w-32 p-2 mb-4  " src="/1.png"></img>
            <div>
              <h2 className="text-lg font-bold">Selecione um deck</h2>
              <p className="text-md">
                Escolha um grupo espécies para começar a estudar, montados com
                base na localização e raridade das espécies
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center mb-4 sm:mr-12 ">
            <img
              alt="logo oama cantando"
              className="h-32 w-32 p-2 mb-4  "
              src="/2.png"
            ></img>
            <div>
              {" "}
              <h2 className="text-lg font-bold"> Tente identificar os sons</h2>
              <p className="text-md">
                Ouça o canto tocado e selecione a espécie que você acha que é a
                correspondente ao canto{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-4 sm:mr-12 ">
            <img className="h-32 w-32 p-2 mb-4  " src="/3.png"></img>
            <div>
              {" "}
              <h2 className="text-lg font-bold"> Continue estudando</h2>
              <p className="text-md">
                Seus futuros estudos serão baseados em seus acerto e erros,
                otimizando o aprendizado.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="m-12 flex sm:flex-row justify-around">
          <div className="flex h-16 w-16 md:h-32 md:w-32 flex-col items-center">
            <h2 className="text-lg font-bold"> Realização</h2>
            <img 
              alt="logo OAMa"
              src="/logo_oama.png"></img>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold col"> Apoio</h2>
            <div className="flex flex-row justify-center items-center">
              <img
              alt="logo birds atlantic"
              className="h-16 w-16 md:h-32 md:w-32"
                src="https://www.oama.eco.br/_next/image?url=%2Fpartners%2Fbirds%20atlantic.jpg&w=1920&q=75"
              ></img>
              <img
              alt="logo crbio-04"
              className="h-12 w-12 md:h-24 md:w-24"
                src="https://crbio04.gov.br/wp-content/uploads/2020/07/logo-crbio04.png"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Entry;
