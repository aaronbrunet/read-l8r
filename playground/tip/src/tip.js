//TODO: add custom tip
//TODO: error handling for empty
import React, {useState} from 'react'

const Tip = (props) => {
    const [chosen, setChosen] = useState()
    function handleClick(event){
        const name = event.target.name;
        console.log(name);
        console.log('chosen: ' +chosen);
        setChosen(name)
        props.click(event.target.value);
    }

    const tips = props.tips
    return(
        <div className='tips flex-row flex-small text-center'>
            {tips.map((t,index)=>(            
                <button onClick={handleClick} className={(chosen===(t+'-'+index)) ? "flex-small active" : "flex-small"} name={t+'-'+index} key={t} value={parseFloat(t/100)}>{t}</button>
            ))}
        </div>
    );
}

export default Tip