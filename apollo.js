import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://5451cdf52b6d.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
