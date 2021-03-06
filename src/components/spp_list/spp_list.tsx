import { Species } from "../../types";
import { MdStar, MdStarBorder } from "react-icons/md";

type speciesListProps = {
  spp: Species[];
  visible: boolean;
};

const StarScore = (props: { total: number; pre_score: number }) => {
  const { total, pre_score } = props;
  const score = pre_score>5?5:pre_score
  const full_stars = Array.from(Array(score)).map(() => "");
  const empty_stars = Array.from(Array(total - score)).map(() => "");
  console.log(empty_stars)
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

const SpeciesList = (props: speciesListProps) => {
  const { spp, visible } = props;
  return (
    <div className={`${visible ? "" : "hidden"} m-2`}>
      <ul>
        {spp.map((species: Species, i: number) => {
          return (
            <li key={i} className="mb-4">
              <h1 className="text-lg font-bold mb-0 p-0">{`${species.pt_common_name}`}</h1>

              <h2 className="italic">{`${species.genus} ${species.species}`}</h2>
              {species.score+1 ? (
                <StarScore pre_score={species.score} total={5}></StarScore>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SpeciesList;
