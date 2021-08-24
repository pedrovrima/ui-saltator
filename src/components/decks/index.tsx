import { useContext } from "react";
import DeckCard from "./deck-cards";
import { Context, contextType } from "../../context";
import type { User } from "../../types";


export default function DeckChooser() {
  const { userInfo, setdeckID } = useContext(Context) as contextType;
  const { user_decks } = userInfo as User;
  const rare = user_decks.filter((deck) => deck.type === "rare");
  const medium = user_decks.filter((deck) => deck.type === "medium");
  return (
    <div className="w-full min-h-screen bg-emerald-700 flex flex-col justify-center items-center">

      <div className="bg-gray-200 mt-8 w-full p-4 rounded-lg sm:w-3/4 sm:p-8  shadow-lg">
      <h1 className="text-center text-3xl font-bold mb-2">Aves da Serra da Mantiqueira</h1>

       <div className="grid grid-cols-1 sm:grid-cols-3">
        {user_decks.map((deck) => {
          
          return <DeckCard  setdeckID={setdeckID} {...deck} />;
        })}

        {medium.length === 0 ? (
          <DeckCard id={0} active={false} type="medium" spp={[]} />
        ) : (
          ""
        )}

        {rare.length === 0 ? (
          <DeckCard id={0} active={false} type="rare" spp={[]} />
        ) : (
          ""
        )}
      </div>
    </div>
    </div>
  );
}
