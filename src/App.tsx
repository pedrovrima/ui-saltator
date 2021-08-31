import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Context, ContextProvider } from "./context";
import { SaltatorRouter } from "./router";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
  });
  console.log(window.location.origin);
  return (
    <Auth0Provider
      domain="dev-skphwm08.us.auth0.com"
      clientId="5AkjixQWOlv1FQpzboje929M5eJepDDP"
      redirectUri={`${window.location.origin}/login`}
    >
      <ApolloProvider client={client}>
        <ContextProvider>
          <SaltatorRouter />
        </ContextProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
