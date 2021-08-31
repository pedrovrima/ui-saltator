import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const get_spp = gql`

  mutation sendScore($infos: [updateScoreInfo]) {
    updateScore(info: $infos) {
      status
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

type score = {
  id: number;
  score: number;
};

export default async function sendScore(scoreInfo: score[]) {
 const sendInfo= scoreInfo.filter(scr=>scr.score<6)
  const result = await client.mutate({
    mutation: get_spp,
    variables: { infos: sendInfo },
  });
  console.log(result);
  return result.data.updateScore.status;
}
