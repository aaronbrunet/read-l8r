import React, {Component} from 'react';

import Entry from './components/entry.js';
import Tip from './components/tip.js';
import Bill from './components/bill.js';
//import './styles/App.css';
import './styles/main.css'
import './styles/styles.scss'


const tips = [10,15,18,20];

class App extends Component {
  constructor(){
    super();
    this.state = {
      bill: '0.00',
      bill_tip:'0.00',
      share: '0.00',
      tip: '0.00',
      tip_share: '0.00',
      count: 1,
      percent: 0,
      remainder: '0.00',
      roundUp: false
    }
  }

  headcount = (bill,count) =>{
    this.setState({count:count})
    this.eval(bill,count,null);
  }
  
  rounding = (round) => {
    this.setState({roundUp:round})  
    this.eval(null,null,round);
  }

  roundUp(bill_tip){
      let val=bill_tip;
      val = Math.ceil(val);
      return val;
  }
  remainder(bill_tip){
    let val=bill_tip;
    let rm = Math.ceil(val);
    rm = bill_tip - rm;
    return rm;
}

  //calc by input value
  eval = (bill_,count_,round_) => {    
    let bill,count,round;
    bill_ !== null ? bill = bill_ : bill = this.state.bill;
    count_ !== null ? count = count_ : count = this.state.count;    
    round_ !== null ? round = round_ : round = this.state.roundUp;    
    if(bill>0){
      bill = parseFloat(bill);
      let tip = parseFloat(this.state.tip);
      let bill_tip = parseFloat(this.state.bill_tip);
      let remainder = parseFloat(this.state.remainder);
      try { 
        tip = bill*parseFloat(this.state.percent);
        bill_tip = bill + tip;
        if(round){
          bill_tip = this.roundUp(bill_tip);
          remainder = parseFloat(this.remainder(bill_tip));
          tip = bill_tip - bill;
        }
        let share = bill_tip/count;    
        let tip_share = tip/count;
        this.setState({ bill: bill.toFixed(2), bill_tip: bill_tip.toFixed(2), tip: tip.toFixed(2), tip_share: tip_share.toFixed(2),share: share.toFixed(2), remainder: remainder.toFixed(2)})    
      }catch (e){
        this.setState({
        bill_tip:"eval error"
      })
      }
    }
  }

  //calc by percent
  calculate = (value) =>{    
    let percent;
    value>0 ? percent = parseFloat(value) : percent = 0
    let bill = parseFloat(this.state.bill);
    let tip = parseFloat(this.state.tip);
    let bill_tip = parseFloat(this.state.bill);//this.state.bill_tip;      
    let share = parseFloat(this.state.share);    
    let remainder = parseFloat(this.state.remainder);
    try {      
      tip = bill*percent;
      bill_tip = bill + tip;
      if(this.state.roundUp){
        bill_tip = this.roundUp(bill_tip);
        remainder = parseFloat(this.remainder(bill_tip));
        tip = bill_tip - bill;
      } 
      share = bill_tip / this.state.count;
      let tip_share = tip/this.state.count;
      this.setState({
        bill_tip: bill_tip.toFixed(2).toString(), tip: tip.toFixed(2).toString(), tip_share: tip_share.toFixed(2), share: share.toFixed(2), percent: percent, remainder: remainder.toFixed(2)})
    }catch (e){
      this.setState({
         bill_tip:"calc error"
      })
    }    
  };  

  reset = () =>{
    this.setState({
      bill: '0.00',
      bill_tip:'0.00',
      share: '0.00',
      tip: '0.00',
      tip_share: '0.00',
      remainder: '0.00',
      percent: 0
    });
  };  

  render(){ 
    return (
      <>
      <div className="main">
        <div className="title">
          <h1>A Friendly Tip</h1>
          <p>Tired of fighting with friends over who pays what, and how much tip to leave?
            <br/><br/>Fight no longer!
            <br/>…about that.</p>
        </div>
        <div className='container'>
          <div className='controls'>
          <Entry eval={this.eval} count={this.state.count} reset={this.reset} /> 
          <Tip tips={tips} calculate={this.calculate} reset={this.reset} />
          </div>
          <Bill headcount={this.headcount} count={this.state.count} bill={this.state.bill} bill_tip={this.state.bill_tip} tip={this.state.tip} tip_share={this.state.tip_share} share={this.state.share} rounding={this.rounding} remainder={this.state.remainder}/>
        </div>
      </div>
      <div className="bottom"><p>Created by Aaron Brunet 2020</p></div>
      </>
    );
  }
}

export default App;
