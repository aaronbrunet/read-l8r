import React, {useState} from 'react'
import styled from 'styled-components'

const Input = styled.input`
    text-align: ${props=>(props.value <1 ? 'center':'right')};
`
const Entry = props => {
    const[bill,setBill]=useState('');
    
    const handleInputChange = (input) => {
        const value = input    
        setBill(value)
        props.eval(value,props.count,null)
    }

    const reset = event => {    
        setBill('')
        //setCount(1)
        props.reset()
    }

    return(
        <>        
        <div className="entry-bar"> 
            <div className="entry-field">
                <span className="money">{bill!=='' && bill!==0 ? '$' : ''}</span>
                <Input className="entry" type="number" name="bill" placeholder="What's the damage?" value={bill} onChange={(e) => handleInputChange(e.target.value)} />
                <span className="edit reset hide" onClick={reset}>X</span>
            </div>
        </div>
        </>
    )
}

export default Entry