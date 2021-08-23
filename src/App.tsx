import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Context, ContextProvider } from "./context";
import {SaltatorRouter} from "./router";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  console.log(window.location.origin)
  return (
    <Auth0Provider
    domain="dev-skphwm08.us.auth0.com"
    clientId="5AkjixQWOlv1FQpzboje929M5eJepDDP"
    redirectUri={window.location.origin}
  >

    
    <ContextProvider>
      <SaltatorRouter />
    </ContextProvider>
   </Auth0Provider>);
}

export default App;
