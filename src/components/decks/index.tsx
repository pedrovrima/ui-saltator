import { useContext } from "react";
import DeckCard from "./deck-cards";
import { Context, contextType } from "../../context";
import type { User } from "../../types";


export default function DeckChooser() {
  const { userInfo, setdeckID } = useContext(Context) as contextType;
  const { user_decks } = userInfo as User;
  const rare = user_decks.filter((deck) => deck.name === "rare");
  const medium = user_decks.filter((deck) => deck.name === "medium");
  return (
    <>
      <h1>Decks</h1>
      <div>
        {user_decks.map((deck) => {
          return <DeckCard  setdeckID={setdeckID} {...deck} />;
        })}

        {medium.length === 0 ? (
          <DeckCard id={0} active={false} name="medium" spp={[]} />
        ) : (
          ""
        )}

        {rare.length === 0 ? (
          <DeckCard id={0} active={false} name="rare" spp={[]} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
