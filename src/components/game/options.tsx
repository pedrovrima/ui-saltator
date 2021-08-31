import { useState, Dispatch } from "react";

type optionInfo = {
  genus: string;
  species: string;
  correct: boolean;
  pt_common_name: string;
};

type optionProps = {
  options?: optionInfo[];
  answered: boolean;
  setAnswered: Function;
  score_function: Function

};

type optionComponentType = {
  optionInfo: optionInfo;
  answered: boolean;
  setAnswered: Function;
  score_function: Function

};

const OptionComponent = (props: optionComponentType) => {
  const { optionInfo, answered, setAnswered,score_function } = props;
  const { genus, species, correct, pt_common_name } = optionInfo;
  const [chosen, setChosen] = useState(false);

  //Use correct and chosen to define state after clicked

  return (
    <button
    style={{backgroundColor:``}}
      data-testid={`${genus} ${species}`}
      key={`${genus} ${species}`}
      disabled={answered}
      className={` ${answered && correct?"bg-emerald-300":answered && chosen?"bg-red-300":`bg-gray-50`} p-2 sm:p-4  mt-2 sm:my-2  shadow-lg rounded-lg w-full `}
      onClick={() => {
        setChosen(true);
        setAnswered(true);
        score_function(correct);
      }}
    >
      <h1 className="font-bold text-sm sm:text-lg">{pt_common_name}</h1>
      <h2 className="italic text-xs sm:text-sm"> {`${genus} ${species}`}</h2>
    </button>
  );
};

const Options = (props: optionProps) => {
  const { options,score_function, answered, setAnswered } = props;
  return (
    <div className="mt-2 sm:mt-8">
      {options?.map((option, i) => {
        return (
          <OptionComponent
          score_function={score_function}
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
