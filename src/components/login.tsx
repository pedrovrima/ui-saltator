import { useContext } from "react";
import { Context, contextType } from "../context";
import { useAuth0 } from "@auth0/auth0-react";



export default function Login() {
  const { setUserId } = useContext(Context) as contextType;
  const { loginWithRedirect } = useAuth0();


  return (
    <>
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>;
      <button
        onClick={() =>
          setUserId(1)
        }
      >
        Logar{" "}
      </button>
    </>
  );
}
