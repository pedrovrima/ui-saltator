import React, { useContext } from "react";
import { Context, contextType } from "../context";
import { Link } from "react-router-dom";
const Entry: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 h-full w-full bg-gr">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-3xl font-extrabold font-sans">Aprenda os cantos das aves brasileiras</h1>
        <Link to="/login">
          <button className="px-4 py-2 bg-emerald-400 rounded-lg font-bold text-gray-700 shadow-lg m-4">
            Comece já!{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Entry;
