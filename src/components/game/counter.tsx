type counterType = {
  total: number;
  this_position: number;
};

const Counter = (props: counterType) => {
  const { total, this_position } = props;

  return (
    <div className="w-full flex justify-center">
      <p className="text-lg font-bold">{`${this_position}/${total}`}</p>
    </div>
  );
};

export default Counter;
