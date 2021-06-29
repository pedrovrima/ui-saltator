import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Context, ContextProvider } from "./context";
import {SaltatorRouter} from "./router";
function App() {
  return (
    <ContextProvider>
      <SaltatorRouter />
    </ContextProvider>
  );
}

export default App;
