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
import Loading from "../components/loading";
import Game from "../components/game";
import End from "../components/end";
import { Context, contextType } from "../context";

export const SaltatorRouter = () => {
  const { userInfo, deckID, loaded_sounds, total_played, songOrder } =
    useContext(Context) as contextType;
  return (
    <div className="w-full">
    <Router>
      <Switch>
        <Route path="/login">
          {userInfo ? <Redirect to="/decks" /> : <Login />}{" "}
        </Route>
        <Route path="/decks">
          {userInfo ? (
            deckID ? (
              <Redirect push={false} to="/loading"></Redirect>
            ) : (
              <Decks />
            )
          ) : (
            <Redirect to="/login" />
          )}{" "}
        </Route>
        <Route path="/loading">
          {loaded_sounds===songOrder?.length ||  loaded_sounds > 4 ? <Redirect to="/game" /> : <Loading />}
        </Route>
        <Route path="/game">
          {total_played === songOrder?.length ?<Redirect to="/end" />  : <Game />}
        </Route>
        <Route path="/end">
            <End></End>
        </Route>
        <Route path="/">
          <Entry />
        </Route>
      </Switch>
    </Router>
    </div>
  );
};
