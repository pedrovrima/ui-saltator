import { sumArray } from "./sumArray";

const scorePercentage = (
  score: number[],
  maxScore: number,
  minScore: number
) => {
  const fake_score = score.map(scr=>scr>maxScore?maxScore:scr)
  return (
    (100 * sumArray(fake_score.map((scr) => scr - minScore))) /
    (score.length * (maxScore ))
  );
};

export { scorePercentage };
