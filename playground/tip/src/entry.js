import React, {useState} from 'react'

const Entry = props => {
    const[bill,setBill]=useState('');
    const handleInputChange = event => {
        const value = event.target.value        
        setBill(value)
        props.eval(event)
    }
    const reset = event => {    
        setBill('')
        props.reset()
    }

    return(
        <div className="bill-entry">
            <input type="text" name="bill" placeholder="What's the Damage?" value={bill} onChange={handleInputChange} />
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Entry