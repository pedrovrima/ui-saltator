import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const get_spp = gql`
  query deck($id: ID!) {
    RandomDeck(id: $id, total: 5) {
      id
      
        species {
          id
          genus
          species
          pt_common_name
          image {
            author
            url
          }
          sounds {
            species_id
            author
            xeno_id
          }
        
      }
        score
      }}
  
  
`;

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

export default async function GetSpp(id: number) {
  console.log(client);
  try {
    const result = await client.query({ query: get_spp, variables: { id } });
    console.log(result);
    const deck_spp = result.data.RandomDeck.map((spp: any) => {
      return {
        deck_id: spp.id,
        ...spp,
        ...spp.species,
        points: 0,
      };
    });
    console.log(deck_spp);
    return deck_spp;
  } catch (err) {
    console.log(err);
  }
}
