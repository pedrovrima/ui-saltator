import React, { useContext, useEffect, useState } from "react";
import { Context, contextType } from "../../context";
import Counter from "./counter";
import { Species } from "../../types";
import GamePart from "./gamepart";
export default function Game() {
  const { sounds, songOrder, total_played } = useContext(
    Context
  ) as contextType;

  return (
    <>
    <div className="w-full p-2 flex justify-center sm:p-8">
      <div className="bg-gray-200 w-full p-4 rounded-lg sm:w-3/5 sm:p-16 max-w-2xl">
        <Counter total={songOrder.length} this_position={total_played + 1} />
        {songOrder.map((snd: any, i: number) => (
          <GamePart position={i} />
        ))}
      </div>
      </div>
    </>
  );
}
