import { useContext, useEffect, useState } from "react";
import { Context, contextType } from "../context";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const [percentage_complete, setPercentage] = useState(10);

  const { setUserId } = useContext(Context) as contextType;
  const { user } = useAuth0();
  useEffect(() => {
    if (user?.sub) {
      setPercentage(75);
      console.log(user?.sub);

      setUserId(user.sub);
    }
  }, [user]);

  useEffect(() => setPercentage(50), []);
  return (
    <div className="h-full w-full">
      <>
        <div className="relative pt-1 mt-24 mb-4 mx-16 sm:mx-24">
          <div className="overflow-hidden h-4 mt-4 text-xs flex rounded bg-gray-500 ">
            <div
              style={{ width: `${percentage_complete}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
            ></div>
          </div>
          <h2 className="font-bold text-sm">{`${percentage_complete}%`}</h2>
        </div>{" "}
      </>
    </div>
  );
}
