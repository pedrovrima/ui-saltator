import React from "react";
import {useState} from "react"
import { gql, ApolloClient, InMemoryCache, useMutation } from "@apollo/client";

const create_deck = gql`
  mutation deckCreate($id: ID!, $userId: ID!) {
    createDeck(id: $id, userId: $userId) {
      id
    }
  }
`;
const CreateDeck=(props:any)=> {
  const [resu,setResu] = useState<any>()
  const{id, userId}=props
  const result = useMutation(create_deck, {
    variables: { id: id, userId: userId },
  });
  setResu(result)
  return({resu});
}


export default CreateDeck