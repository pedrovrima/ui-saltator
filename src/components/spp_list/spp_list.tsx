import {Species} from "../../types";

type speciesListProps = {
    spp:Species[]
    visible: boolean
}

const SpeciesList = (props:speciesListProps) => {
  const { spp, visible } = props;
  return (
    <div>
      <ul>
        {visible?spp.map((species: Species, i: number) => {
          return (
            <li key={i}>
              <h1>{`${species.genus} ${species.species}`}</h1>
              <h2>{`${species.score}`}</h2>
            </li>
          );
        }):""}
      </ul>
    </div>
  );
};

export default SpeciesList;
