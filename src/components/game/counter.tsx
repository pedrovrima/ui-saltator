type counterType = {
    total:number,
    this_position:number
}

const Counter = (props:counterType)=>{
    const {total, this_position} = props

    return(
        <p>{`${this_position}/${total}`}</p>
    )
}


export default Counter