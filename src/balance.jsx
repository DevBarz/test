import React, { Component } from 'react'
import styled from 'styled-components';

export default class Balance extends Component {
    render() {
        var showBal = this.props.showBalance;
        let amount = this.props.account;
        let buttonText= "Hide Balances";
        let textButton= "Show balance in USD";
  
        if (showBal===false) {
          buttonText = "Show Balances";
          amount = "*****"
        }
        else if(this.props.usdBalance===true){
           textButton= "Show Balance in ETH";
        }

        return (
            <div>
              <h1> Portfolio Balance: {amount} ETH  <button onClick={this.props.dollarBal}>{textButton}</button></h1> 
              <button onClick={this.handleVisibility}>{buttonText}</button>
       
  
            </div>
        )
    }

    handleVisibility = (event) => {
       event.preventDefault();
       this.props.handleVis();
    }
}
