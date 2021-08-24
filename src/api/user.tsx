import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const get_user = gql`
  query user($sub: String) {
    User(sub: $sub) {
      id
      user_decks {
        id
        species_deck {
          deckType{
            type
          }
          species {
            id
            genus
            species
            pt_common_name
            sounds {
              xeno_id
            }
            image {
              id
            }
          }
        }
        score
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

export default async function User(sub: string) {
  const result = await client.query({ query: get_user, variables: { sub } });
  console.log(result);
  const user_decks = result.data.User.user_decks.reduce((cont:any,spp: any,i: number) => {
    const this_spp =       { deck_id:spp.id,...spp.species_deck.species, score: spp.score }
    const type=spp.species_deck.deckType.type
    const this_group = cont.filter((types:any)=>types.type===type)[0]
    
    const others = cont.filter((types:any)=>types.type!==type)
    if(this_group){
      return([...others,{...this_group,spp:[...this_group.spp,this_spp]}])
    }else{
      return([...others,{id:i+1,type:type,active:true,spp:[this_spp]}])

    }
    
  },[]);
  console.log(user_decks);
  const typed_user = { ...result.data.User, user_decks };
  return typed_user;
}
