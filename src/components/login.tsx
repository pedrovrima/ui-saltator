import { useContext } from "react";
import { Context, contextType } from "../context";

export default function Login() {
  const { setUserId } = useContext(Context) as contextType;

  return (
    <>
      <h1>Login</h1>
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
