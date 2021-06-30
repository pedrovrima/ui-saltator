import { useState, Dispatch } from "react";

type optionInfo = {
  genus: string;
  species: string;
  correct: boolean;
  pt_name: string;
};

type optionProps = {
  options: optionInfo[];
};

type optionComponentType = {
  optionInfo: optionInfo;
  answered: boolean;
  setAnswered: Function;
};

const OptionComponent = (props: optionComponentType) => {
  const { optionInfo, answered, setAnswered } = props;
  const { genus, species, correct, pt_name } = optionInfo;
  const [chosen, setChosen] = useState(false);

  //Use correct and chosen to define state after clicked

  return (
    <button
      data-testid={`${genus} ${species}`}
      key={`${genus} ${species}`}
      disabled={answered}
      onClick={() => {
        setChosen(true);
        setAnswered(true);
      }}
    >
      <h1>{pt_name}</h1>
      <h2> {`${genus} ${species}`}</h2>
    </button>
  );
};

const Options = (props: optionProps) => {
  const { options } = props;
  const [answered, setAnswered] = useState(false);
  return (
    <div>
      {options.map((option, i) => {
        return (
          <OptionComponent
            key={i}
            optionInfo={option}
            answered={answered}
            setAnswered={setAnswered}
          ></OptionComponent>
        );
      })}
    </div>
  );
};
export default Options;
