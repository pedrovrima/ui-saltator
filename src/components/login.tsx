import { useContext, useEffect } from "react";
import { Context, contextType } from "../context";
import { useAuth0 } from "@auth0/auth0-react";



export default function Login() {
  const { setUserId } = useContext(Context) as contextType;
  const { user } = useAuth0();
  useEffect(()=>{
    if(user?.sub){
    console.log(user?.sub)

    setUserId(user.sub)}
  },[user])

  return (
<div>
  {JSON.stringify(user)}
  Hi
</div>
    );
}
