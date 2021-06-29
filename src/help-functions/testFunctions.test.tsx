import { sumArray } from "./sumArray";
import { scorePercentage } from "./scorePercentage";

test("sumArray", () => {
  expect(sumArray([1, 2, 3, 4])).toEqual(10);
  expect(sumArray([10, 11])).toEqual(21);
});

test("scorePercentage", () => {
  const species = [{ score: 10 }, { score: 4 }, { score: 1 }];
  const group = species.map(spp=>spp.score)
  expect(scorePercentage(group, 11, 0)).toEqual((100 * 15) / 30);
  expect(scorePercentage(group, 21, 1)).toEqual((100 * 12) / 60);
});
