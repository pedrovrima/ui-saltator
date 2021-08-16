import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const get_user = gql`
  query user($id: ID!) {
    User(id: $id) {
      id
      name
      user_decks {
        id
        active
        name
        deck_species {
          species {
            id
            genus
            species
          }
          score
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

export default async function (id: number) {
  const result = await client.query({ query: get_user, variables: { id } });
  console.log(result);
  const user_decks = result.data.User.user_decks.map((deck: any) => {
    return {
      ...deck,
      spp: deck.deck_species.map((spp: any) => {
        return { ...spp.species, score: spp.score };
      }),
    };
  });
  console.log(result);
  const typed_user = {...result.data.User,user_decks}
  return typed_user;
}
