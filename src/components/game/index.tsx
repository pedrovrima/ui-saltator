import React, { useContext, useEffect, useState } from "react";
import { Context, contextType } from "../../context";
import Counter from "./counter";
import { Species } from "../../types";
import GamePart from "./gamepart";
export default function Game() {
  const {
    sounds,
    songOrder,
    total_played,
  } = useContext(Context) as contextType;

  return (
    <>
      <Counter total={songOrder.length} this_position={total_played + 1} />
      {songOrder.map((snd: any, i: number) => (
        <GamePart position={i}      />
      ))}
    </>
  );
}
