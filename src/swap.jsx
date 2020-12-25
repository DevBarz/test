import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';





export default class Swap extends Component {

     constructor(props){
     super(props);
     this.currencies = ["ETH","DAI","MKR","LINK","KNC","LEND","WETH"];

     this.state={

        swap: this.props.swap,
        confirm: this.props.confirm,
        amount: this.props.amount,
        converted: this.props.converted

     }
     


    }
    

      
    render() {
        
        return (
            <div>
                <form action="#" method="Post">
               <div> 
           <select onChange={this.props.makeSelection} className="base"  value={this.props.base}>
                {this.currencies.map(currency => <option  disabled={(this.props.swap === true)||(this.props.confirm === true)} key={currency} value={currency}>{currency}</option>)}
            </select>
              <input disabled={(this.props.swap === true)||(this.props.confirm === true)} className="amount" placeholder="Amount" onChange={this.props.changeValue} value={this.props.amount}></input>
         </div>
               <br></br>
                <div>
               <select onChange={this.props.makeSelection} className="other" value={this.props.other}>
               {this.currencies.map(currency => <option disabled={(this.props.swap === true)||(this.props.confirm === true)} key={currency} value={currency}>{currency}</option>)}
               </select>
               <input disabled={true} className="converted"  placeholder="your Swap amount" value={this.props.converted} ></input>

               </div>
               
               <br></br>
                
               <button disabled={(this.props.swap === true)||(this.props.confirm === true)} className="swap" onClick={this.handleSwap} >SWAP</button>
                </form>

            </div>

              
        )

    }
     
        handleSwap =(event)=>{
            event.preventDefault();
             this.props.makeTransaction();
            
         }
    
         
    
     

}
Swap.propTypes = {
    amount: PropTypes.number.isRequired,
    converted: PropTypes.number.isRequired, 
    swap: PropTypes.bool.isRequired,
    confirm: PropTypes.bool.isRequired,
};