import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const get_user = gql`
  query user($sub: String) {
    User(sub: $sub) {
      id
      user_decks {
        id
        deckType {
          id
          type
          name
          deckGroup{
            group
            name
          }
        }

        deck_scores {
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

export default async function User(sub: string) {
    const result = await client.query({ query: get_user, variables: { sub } });
    console.log(result);
    const user_decks = result.data.User.user_decks.map((deck: any) => {
      return {
        ...deck,
        spp: deck.deck_scores.map((spp: any) => {
          return { ...spp.species, score: spp.score };
        }),
      };
    });
    console.log(user_decks);
    const typed_user = { ...result.data.User, user_decks };
    return typed_user;
  }

