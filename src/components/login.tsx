import { useContext } from "react";
import { Context, contextType } from "../context";

export default function Login() {
  const { userInfo, setUserInfo } = useContext(Context) as contextType;

  return (
    <>
      <h1>Login</h1>
      {JSON.stringify(userInfo)}
      <button
        onClick={() =>
          setUserInfo({
            id: 1,
            email: "pedrovrima@gmail.com",
            user_decks: [
              {
                id: 1,
                active: true,
                name: "common",
                spp: [{ id: 1, genus: "a", species: "b", score: 1 }],
              },
            ],
            name: "Pedro",
          })
        }
      >
        Logar{" "}
      </button>
    </>
  );
}
