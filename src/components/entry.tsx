import React, { useContext } from "react";
import { Context, contextType } from "../context";
import { Link } from "react-router-dom";
const Entry: React.FC = () => {
  return (
    <>
    <h1>Bem Vindo</h1>
      <Link to="/login">
        <button>Comece já! </button>
      </Link>
    </>
  );
};

export default Entry;
