import { useEffect,useState } from "react";
import Options from "./options"

export default function GamePart (props:any){
const {sound,next,options} = props;
const [answered, setAnswered] = useState(false);

useEffect(() => {
    sound.play()
},[])

return(<>
      {/* image + sound_blob */}
      {/* play/pause and  replay button*/}
<Options options={options} answered={answered} setAnswered={setAnswered} ></Options>
</>)

}