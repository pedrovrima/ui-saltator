import { useContext, useEffect, useState } from "react";
import { Context, contextType, StateSpecies } from "../../context";
import sendScore from "../../api/send_results";
import { send } from "process";

interface newSpp extends StateSpecies {
    new_score: number;
}

const updateScore = (score: number, points: number) => {
    console.log(points)
    const val: number = points > 0 ? 1 : -1;
    console.log(val,Math.max(score + val, 0))

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
  const [finalScore, setFinalScore] = useState<StateSpecies[]>([]);
  const [resuStatus, setStatus] = useState<number>();
  const { studySpp } = useContext(Context) as contextType;

  const sendResu = async () => {
    if (studySpp) {
      const newP = createPoints(studySpp);
      const scores = newP.map((spp) => getScores(spp));
      const status = await sendScore(scores);
        console.log(status)
      setStatus(status);

      setFinalScore(newP);
    }
  };

  useEffect(() => {
    sendResu();
  }, []);


  return <div>
      <div>{resuStatus}</div>
  </div>
  ;
}
