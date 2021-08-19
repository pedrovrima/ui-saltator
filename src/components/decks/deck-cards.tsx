import { useState } from "react";
import { scorePercentage } from "../../help-functions/scorePercentage";
import type { Deck, Species } from "../../types";
import SpeciesList from "../spp_list/spp_list";


const getScore = (spp: Species[]): number[] =>
  spp.map((species: Species): number => species.score);

const nameMaker = (name: string) => {
  switch (name) {
    case "common":
      return "Espécies comuns";

    case "medium":
      return "Espécies médio-raras";
    case "rare":
      return "Espécies raras";
  }
};

function DeckCard(props: Deck & { setdeckID?: (id: number) => void }) {
  const [showSpecies, setShowSpecies] = useState(false);
  const { id, name, spp, active, setdeckID } = props;
  console.log(id);
  const percentage_complete =
    spp.length > 0 ? Math.round(scorePercentage(getScore(spp), 5, 0)) : 0;
  return (
    <div className="bg-gray-100 rounded-lg m-4 p-8 flex flex-col shadow-lg">
      <h1 className="font-bold text-xl sm:text-2xl">{nameMaker(name)}</h1>
      <div className="relative pt-1">
        <div className="overflow-hidden h-4 mt-4 text-xs flex rounded bg-gray-500 ">
          <div
            style={{ width: `${percentage_complete}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
          ></div>
        </div>
        <h2 className="font-bold text-sm">{`${percentage_complete}% completo${
        percentage_complete > 1 ? "s" : ""
      }`}</h2>      
      </div>{" "}

      
      <div className="flex   mt-4 sm:mt-6 justify-between align-middle  w-full">
      {active ? (
<>
        <button
        className="bg-emerald-500 border-2 w border-emerald-500 rounded-lg py-2 px-4 font-bold text-gray-900"
          disabled={!active}
          onClick={() => (setdeckID ? setdeckID(id) : "")}
        >
          Estudar
        </button>
          <button className="border-2 border-gray-900 rounded-lg py-2 px-4" onClick={() => setShowSpecies(!showSpecies)}>
            Espécies
          </button>
</>        ) : (
          <p className="text-gray-800 font-light">Em breve</p>
        )}

      </div>
      <SpeciesList visible={showSpecies} spp={spp}></SpeciesList>

    </div>
  );
}

export default DeckCard;
