


export default function SoundButtons(props){
const {sound} = props

    return(<>
        <button onClick={()=>sound.playing()?sound.pause():sound.play()}>{!sound.playing()?"Play":"Pause"}</button>
        <button onClick={()=>{sound.stop();sound.play()}}>Recomeçar</button>
    </>)
}