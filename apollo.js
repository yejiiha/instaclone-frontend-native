import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { AsyncStorage } from "react-native";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

const client = new ApolloClient({
  uri: "https://5451cdf52b6d.ngrok.io/graphql",
  cache: new InMemoryCache(),
});

export default client;
