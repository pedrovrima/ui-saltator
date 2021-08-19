import { useContext, useEffect, useState } from "react";
import { Context, contextType, StateSpecies } from "../../context";
import {Species} from "../../types"
import sendScore from "../../api/send_results";
import { send } from "process";

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
  const { studySpp, userInfo } = useContext(Context) as contextType;

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

  return (
    <div>
      {
        resuStatus===200?
      <div>{finalScore.map((spp:any)=>
        <div>
          <p>{`${spp.genus} ${spp.species}`}</p>
          <p>{spp.new_score||spp.score}</p>
          </div>
     )}</div>:"Sending"
   } </div>
  );
}
