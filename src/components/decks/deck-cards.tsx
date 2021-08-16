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
console.log(id)
  const percentage_complete =
    spp.length > 0 ? Math.round(scorePercentage(getScore(spp), 5, 0)) : 0;
  return (
    <div>
      <h1>{nameMaker(name)}</h1>
      <h2>{`${percentage_complete}% completo${
        percentage_complete > 1 ? "s" : ""
      }`}</h2>
      {/* {TODO: Create get deck data from server} */}
      <button
        disabled={!active}
        onClick={() => (setdeckID ? setdeckID(id) : "")}
      >
        Estudar
      </button>
      {active ? (
        <button onClick={() => setShowSpecies(!showSpecies)}>
          Ver espécies
        </button>
      ) : (
        <p>Complete 75% do nível anterior para desbloquear este nível</p>
      )}
      <SpeciesList visible={showSpecies} spp={spp}></SpeciesList>
    </div>
  );
}

export default DeckCard;
