//TODO: custom tip
//TODO: dynamic show/hide total/each
import React, {useState} from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
    opacity: ${props=>(props.value==='0.00' ? '.5' : '1')};    
`

const Toggle = styled.span`
    background-color: ${props=>(props.toggle ? '#F34040' : '#FFBB36')};
`

const Bill = (props) => {
    const [toggle,setToggle] = useState(true)
    const [roundUp,setRoundUp] = useState(false)    
    const [count,setCount] = useState(1)
    
    const handleHeadcountChange = event => {
        const value = event.target.value
        setCount(value)
        props.headcount(props.bill,value)
    }
    
    const toggleRoundUp = () => {
        setRoundUp(roundUp => !roundUp)  
        props.rounding(!roundUp)
    }

    return(
        <>        
        <div className='bill'>
            <div className="people">
                    <input className="" type="number" min="1" min-step="1" placeholder="1" value={count} onChange={handleHeadcountChange} />
                    <p>{count>1 ? 'people' : 'person'}</p>
            </div>
                <div className='bill-display'>
                    {toggle ?        
                        <div className='total'>
                                <H1 className='tip' value={props.tip}>${props.tip} tip</H1>
                                <H1 className='final' value={props.bill_tip}>${props.bill_tip}</H1>
                        </div>
                        :
                        <div className='each'>
                            <H1 className='tip' value={props.tip_share}>${props.tip_share} tip</H1>
                            <H1 className='final' value={props.share}>${props.share}</H1>
                        </div>            
                    }
                    <Toggle toggle={toggle} className={props.count>1 ? "toggle"  : "toggle disabled"} onClick={()=>setToggle(toggle => !toggle)}>{toggle ? 'Total' : 'Each'}</Toggle>
                </div>
                <div className='round small-container'>
                <button className={roundUp ? 'active nearest' : 'nearest'} onClick={(toggleRoundUp)}>{roundUp ? '-' : '+' } ${props.remainder}</button>
            </div>
        </div>   
        </>
    );
    }

export default Bill