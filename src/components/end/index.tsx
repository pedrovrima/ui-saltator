import { useContext, useEffect, useState } from "react";
import { Context, contextType, StateSpecies } from "../../context";
import { Species } from "../../types";
import sendScore from "../../api/send_results";
import { send } from "process";
import { MdStar, MdStarBorder } from "react-icons/md";
import { scorePercentage } from "../../help-functions/scorePercentage";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";

const getScore = (spp: newSpp[]): number[] =>
  spp.map((species: newSpp): number => species.new_score || species.score);

interface newSpp extends StateSpecies {
  new_score: number;
}

const updateScore = (score: number, points: number) => {
  console.log(points);
  const val: number = points > 0 ? 1 : -1;
  console.log(val, Math.max(score + val, 0));

  return Math.max(score + val, 0);
};

const createPoints = (spps: StateSpecies[]) => {
  return spps.map((spp: StateSpecies) => {
    return {
      ...spp,
      new_score: updateScore(spp.score, spp.points),
    };
  });
};

const getScores = (spp: newSpp) => {
  return { id: spp.deck_id, score: spp.new_score };
};

export default function End() {
  const [finalScore, setFinalScore] = useState<any>([]);
  const [resuStatus, setStatus] = useState<number>();
  const {
    deckID,
    studySpp,
    userInfo,
    setLoadedSounds,
    setSongOrder,
    setStudySpp,
    setPlayed,
    setOptions,
    setSounds,
    setdeckID,
  } = useContext(Context) as contextType;
  const placeDeck = deckID;
  const reset = () => {
    setStudySpp([]);
    setPlayed(0);
    setOptions([]);
    setSounds([]);
    setdeckID(0);
    setLoadedSounds(0);
    setSongOrder([]);
    setdeckID(placeDeck);
  };

  const sendResu = async () => {
    if (studySpp) {
      const newP = createPoints(studySpp);
      const scores = newP.map((spp) => getScores(spp));
      const status = await sendScore(scores);
      console.log(status);
      setStatus(status);

      const newpIds = newP.map((spp) => spp.id);
      const oldSpp = userInfo?.user_decks[0].spp.filter(
        (sp) => newpIds.indexOf(sp.id) < 0
      );
      if (oldSpp) {
        setFinalScore([...newP, ...oldSpp]);
      }
    }
  };

  useEffect(() => {
    sendResu();
  }, []);

  const percentage_complete =
    finalScore.length > 0
      ? Math.round(scorePercentage(getScore(finalScore), 5, 0))
      : 0;

  return (
    <div>
      <div>
        <OAMaBanner></OAMaBanner>
      </div>
      {resuStatus === 200 ? (
        <div className="mt-4 sm:m-8 flex flex-col items-center">
          <Link to="/">
            <button
              onClick={() => {
                reset();
              }}
              className="bg-emerald-600 shadow-lg text-gray-200 px-4 py-2 rounded-lg font-bold"
            >
              Jogar de novo
            </button>
          </Link>
          <div className="relative pt-1 mx-4 w-5/6  sm:w-1/2">
            <div className="overflow-hidden h-6 mt-4 text-xs flex rounded-full bg-gray-500 ">
              <div
                style={{ width: `${percentage_complete}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
              ></div>
            </div>
            <h2 className="px-2 font-bold text-sm">{`${percentage_complete}% completo${
              percentage_complete > 1 ? "s" : ""
            }`}</h2>
          </div>{" "}
          <SpeciesList spp={finalScore}></SpeciesList>
        </div>
      ) : (
        <div className="flex items-center text-center justify-center">
          <p className="text-2xl font-bold">Enviando resultados</p>
        </div>
      )}{" "}
    </div>
  );
}

const StarScore = (props: { total: number; score: number }) => {
  const { total, score } = props;
  const full_stars = Array.from(Array(score)).map(() => "");
  const empty_stars = Array.from(Array(total - score)).map(() => "");
  return (
    <div className="flex ">
      {full_stars.map((f) => (
        <MdStar fill="#FBBF24" />
      ))}
      {empty_stars.map((f) => (
        <MdStar fill="#1F2937" />
      ))}
    </div>
  );
};

const SpeciesList = (props: any) => {
  const { spp } = props;
  return (
    <div className={`w-5/6 mt-4 sm:m-2 sm:grid sm:grid-cols-3 sm:w-full `}>
      {spp.map((species: any, i: number) => {
        return (
          <div
            key={i}
            className="mb-4 w-full sm:w-5/6 sm:m-4 px-4 py-2 bg-gray-200 rounded-md"
          >
            <div className="flex justify-around">
              <div className="w-5/6">
                <h1 className="text-md font-bold mb-0 p-0">{`${species.pt_common_name}`}</h1>

                <h2 className="italic text-sm">{`${species.genus} ${species.species}`}</h2>
                <StarScore
                  score={species.new_score || species.score}
                  total={5}
                ></StarScore>
              </div>
              <div className="flex items-center text-xl font-bold ">
                {species.new_score ? (
                  species.new_score > species.score ? (
                    <p className="text-green-700">+1</p>
                  ) : species.new_score < species.score ? (
                    <p className="text-red-700">-1</p>
                  ) : (
                    <p className="text-gray-800"> =</p>
                  )
                ) : (
                  <p> </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OAMaBanner = () => (
  <div className="flex flex-col justify-center items-center bg-amber-200 p-8">
    <div className="h-sm w-sm mb-2">
      <ReactGA.OutboundLink
        eventLabel="siteOAMa"
        rel="noreferrer"
        target="_blank"
        to="https://www.oama.eco.br"
      >
        <img src="/logo_oama.png"></img>
      </ReactGA.OutboundLink>
    </div>
    <h1 className="font-medium text-md">
      Este aplicativo foi criado e é mantido pelo
    </h1>
    <h2 className="font-bold text-center text-xl">
      Observatório de Aves da Mantiqueira
    </h2>
    <ReactGA.OutboundLink
      eventLabel="goto-apoie"
      target="_blank"
      rel="noreferrer"
      to="https://www.oama.eco.br/apoie"
      className="py-2 px-4 bg-amber-600 rounded-lg font-bold mt-4 text-gray-100"
    >
      Apoie
    </ReactGA.OutboundLink>
  </div>
);
