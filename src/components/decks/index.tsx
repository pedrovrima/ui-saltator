import { useContext, useState,useEffect } from "react";
import DeckCard from "./deck-cards";
import { Context, contextType } from "../../context";
import type { User } from "../../types";
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";
import { gql, useQuery, useMutation } from "@apollo/client";
import { scorePercentage } from "../../help-functions/scorePercentage";
import SpeciesList from "../spp_list/spp_list";
import CreateDeck from "../../api/create_deck";
const getScore = (spp: any): number[] =>
  spp.map((species: any): number => species.score);

export default function DeckChooser() {
  const { userInfo, setdeckID } = useContext(Context) as contextType;
  const { user_decks, id } = userInfo as User;
  const [visible, setVisible] = useState(false);
  console.log(user_decks);
  // const rare = user_decks.filter((deck) => deck.type === "rare");
  // const medium = user_decks.filter((deck) => deck.type === "medium");
  return (
    <div style={{backgroundImage:"url(/bg2.jpg",backgroundPosition:"top",backgroundSize:"cover" }} className="w-full min-h-screen bg-emerald-700 flex flex-col justify-center items-center">
      <div             style={{backgroundColor: "rgba(228, 228, 231, 0.8)"}}
 className="mx-2 mt-8 mb-2 pb-8 w- p-4 rounded-lg sm:w-3/4 sm:p-8  shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-2">
          Escolha um deck para estudar
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3">
          {user_decks.map((deck) => {
            return <DeckCard setdeckID={setdeckID} {...deck} />;
          })}

          {/* {medium.length === 0 ? (
          <DeckCard id={0} active={false} type="medium" spp={[]} />
        ) : (
          ""
        )}

        {rare.length === 0 ? (
          <DeckCard id={0} active={false} type="rare" spp={[]} />
        ) : (
          "" */}
          {/* )} */}
          <AddDeckCard setVisible={setVisible}></AddDeckCard>
        </div>
      </div>
      <PopUp
        setVisible={setVisible}
        user_decks={user_decks}
        visible={visible}
        userId={id}
      ></PopUp>
    </div>
  );
}

const AddDeckCard = (props: any) => {
  const { setVisible } = props;
  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
        className=" border-4 border-gray-900  border-dashed rounded-lg m-4 p-8 flex flex-col justify-center items-center shadow-lg"
      >
        <h1 className="font-bold mb-4 text-xl">Adicionar Deck</h1>
        <AiOutlinePlus className="h-12 w-12"></AiOutlinePlus>
      </button>
    </>
  );
};

const deckQuery = gql`
  query {
    DeckGroups {
      id
      name
      group
      deckTypes {
        id
        name
        type
        requirementId
        deck_species {
          species {
            genus
            species
            pt_common_name
            id
          }
        }
      }
    }
  }
`;

const PopUp = (props: any) => {
  const result = useQuery(deckQuery);
  const { loading, data } = result;

  const { setVisible, visible, user_decks, userId } = props;
  return (
    <div
      className={`${
        visible ? "" : "hidden"
      } absolute t-0 l-0 h-screen w-screen flex items-center justify-center`}
    >
      <div
        onClick={() => setVisible(false)}
        className={`h-screen w-screen  bg-gray-800 opacity-70 absolute top-0 left-0`}
      ></div>
      <div className="w-full sm:w-5/6 h-3/4 overflow-scroll bg-gray-200 absolute z-10 rounded-lg pt-8 px-2 sm:p-4 ">
        <button onClick={() => setVisible(false)} className="p-4">
          <AiFillCloseCircle
            color="gray"
            className="h-8 w-8 absolute top-1 right-1"
          ></AiFillCloseCircle>
        </button>
        <h1 className="font-extrabold text-2xl">Selecione um Deck</h1>
        <div className="grid-flow-row mt-2">
          {data
            ? data.DeckGroups.map((dckGrp: any) => {
                return (
                  <div className="p-4">
                    <h1 className="font-bold text-xl sm:text-2xl">
                      {dckGrp.name}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                      {dckGrp.deckTypes.map((type: any) => {
                        if (
                          user_decks
                            .map((dck: any) => dck.deckType.id)
                            .indexOf(type.id) > -1
                        ) {
                          const this_deck = user_decks.filter(
                            (dck: any) => dck.deckType.id === type.id
                          );
                          return <DeckCard {...this_deck[0]}></DeckCard>;
                        }
                        return (
                          <div className="bg-gray-100 relative rounded-lg m-4 p-8 flex flex-col shadow-lg">
                            <h2 className="font-bold text-sm pb-12 sm:text-md">
                              {type.name}
                            </h2>
                            <div className="flex justify-center items-center h-full">
                              {type.deck_species.length ? (
                                !type.requirementId ? (
                                  <Estudar
                                    userId={userId}
                                    type={type}
                                  ></Estudar>
                                ) : Math.round(
                                    scorePercentage(
                                      getScore(
                                        user_decks.filter(
                                          (dck: any) =>
                                            +dck.deckType.id ===
                                            type.requirementId
                                        )[0].spp
                                      ),
                                      5,
                                      0
                                    )
                                  ) > 74 ? (
                                    <div className="flex w-full justify-center h-full items-end  ">
                                  <Estudar
                                    type={type}
                                    userId={userId}
                                  ></Estudar>
                                  </div>
                                ) : (
                                <p className="font-bold">  Complete 75% do nível anterior para liberar</p>
                                )
                              ) : (
                                <p className="font-bold">Em breve</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

const create_deck = gql`
  mutation deckCreate($id: ID!, $userId: ID!) {
    createDeck(id: $id, userId: $userId) {
      id
    }
  }
`;

const Estudar = (props: any) => {
  const { userInfo, setdeckID } = useContext(Context) as contextType;
  const [addDeck, { data, loading, error }] = useMutation(create_deck);

  const { type, userId } = props;
  const [showSpecies, setShowSpecies] = useState(false);

  useEffect(() => console.log(error?.graphQLErrors,error?.message),[error])

  useEffect(() => setdeckID(data?.createDeck.id),[data])

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <button
          onClick={async () => {
            
             addDeck({
              variables: { id: type.id, userId: userInfo?.id || 0 },
            });
          }}
          className="bg-emerald-500 border-2 mr-2 border-emerald-500 rounded-lg py-2 px-4 font-bold text-gray-900"
        >
          Iniciar
        </button>
        <button
          className="border-2 border-gray-900 rounded-lg py-2 px-4"
          onClick={() => setShowSpecies(!showSpecies)}
        >
          Espécies{" "}
        </button>
      </div>
      <SpeciesList
        spp={type.deck_species.map((dck: any) => dck.species)}
        visible={showSpecies}
      ></SpeciesList>
    </div>
  );
};
