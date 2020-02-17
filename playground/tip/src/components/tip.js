//TODO: convert custom tip to slider
import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const Icon = styled.span`
  transform: ${props=>(props.edit===true ? 'rotate(0deg)' : 'rotate(135deg)')};
`

  const ThickSlider = withStyles({
    root: {
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },active:{},    
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const Tip = (props) => {
    const [chosen, setChosen] = useState(false)
    const [custom,setCustom] = useState('custom')
    const [edit,setEdit] = useState(false)

    function handleClick(event){
        const name = event.target.name
        const value = event.target.value
        chosen===name ? toggle(true,name,0) : toggle(false,name,value)   
        setEdit(false)     
    }
    const toggle = (chosen,name,value) => {
        if (chosen === true) {
            setChosen(!name)
            props.calculate(0)
        } else {
            setChosen(name)
            props.calculate(value)
        }
    }
    const handleInputChange = (event,input) => {
        setCustom(input)
    }
    const handleSliderChange = (event,value) => {
        setCustom(parseFloat(value))
    }
    const tips = props.tips
    return(
        <div className='tips'>
            {tips.map((t,index)=>(            
                <button onClick={handleClick} active={chosen===(t+'-'+index) ? 'true' : 'false'} className={(chosen===(t+'-'+index)) ? "active" : ""} name={t+'-'+index} key={t} value={parseFloat(t/100)}>{t}%</button>
            ))}
            <button onClick={custom==='Custom' ? null : handleClick} className={(chosen===(custom+'-4')) ? "active" : ""} name={custom+'-4'} value={isNaN(custom) ? 'custom' : parseFloat(custom/100)}>{custom>0 ? custom : 'custom'}%</button>
            <Icon edit={edit} className={edit ? "edit active" : "edit"} onClick={()=>setEdit(edit => !edit)}>{edit ? '✔' : '✏'}</Icon>
            {//<input type="number" className={edit ? '' : 'hide'} name="btn-test" onBlur={()=>setEdit(false)} onChange={(e) => handleInputChange(e.target.value)}></input>                       
            }
            <ThickSlider 
                defaultValue={25}
                valueLabelDisplay="auto"              
                step={1}
                min={0}
                max={100}
                name="btn-test"
                onChange={handleSliderChange}
                className={edit ? 'slider' : 'slider hidden'}
            />
        </div>
    );
}

export default Tip