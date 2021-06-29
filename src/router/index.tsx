import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import Entry from "../components/entry";
import Login from "../components/login";
import Decks from "../components/decks";
import { Context, contextType } from "../context";

export const SaltatorRouter = () => {
  const { userInfo } = useContext(Context) as contextType;
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {userInfo ? <Redirect to="/decks" /> : <Login />}{" "}
        </Route>
        <Route path="/decks">
          {userInfo ? <Decks /> : <Redirect to="/login" />}{" "}
        </Route>
        <Route path="/">
          <Entry />
        </Route>
      </Switch>
    </Router>
  );
};
