import React, {Component} from 'react';

import Entry from './entry.js';
import Tip from './tip.js';
import Bill from './bill.js';
//import logo from './logo.svg';
import './App.css';
import './main.css'

const tips = [10,15,18,20];

class App extends Component {
  constructor(){
    super();
    this.state = {
      bill: '0.00',
      share: '0.00',
      tip: '0.00',
      percent: 0
    }
  }

  eval = event => {    
    const { value } = event.target
    let tip = parseFloat(this.state.tip);
    let share = parseFloat(this.state.share);
    let bill = parseFloat(value);
    tip = bill*parseFloat(this.state.percent);
    share = parseFloat(value) + tip;
    this.setState({ bill: bill.toFixed(2), share: share.toFixed(2), tip: tip.toFixed(2)})    
  }

  calculate = (value) =>{    
    let bill = parseFloat(this.state.bill);
    let tip = parseFloat(this.state.tip);
    let share = parseFloat(this.state.share);//this.state.share;
    let percent = parseFloat(value);    
    try {      
      tip = bill*percent;
      share = bill + tip;
      this.setState({
        share: share.toFixed(2).toString(), tip: tip.toFixed(2).toString(), percent: percent})
    }catch (e){
      this.setState({
        share:"error"
      })
    }
  };  

  reset = () =>{
    let share = this.state.share;
    let bill = this.state.bill;
    let tip = this.state.tip;
    try {
      share = 0;
      bill = 0;
      tip = 0;
      this.setState({share: share.toFixed(2), bill:bill.toFixed(2), tip:tip.toFixed(2)})
    }catch (e){
      this.setState({
        share:"error"
      })
    }
  };  

  render(){ 
    return (
      <div className="App">
        <h1>Just The Tip!</h1>
        <div className='container small-container'>
          <Entry eval={this.eval} reset={this.reset}/> 
          <Tip tips={tips} click={this.calculate} />
          <Bill bill={this.state.bill} share={this.state.share} tip={this.state.tip}/>
        </div>
      </div>
    );
  }
}

export default App;
