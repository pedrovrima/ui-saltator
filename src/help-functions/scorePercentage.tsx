import { sumArray } from "./sumArray";

const scorePercentage = (
  score: number[],
  maxScore: number,
  minScore: number
) => {
  return (
    (100 * sumArray(score.map((scr) => scr - minScore))) /
    (score.length * (maxScore ))
  );
};

export { scorePercentage };
