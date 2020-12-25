import React, { Component } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Transact extends Component {
   

     render() {

        let content= "";
        if (this.props.confirm===true){
        content = <> You have sold:{this.props.sold}    {this.props.core} ,   for: {this.props.bought}  {this.props.alter} ,  at the current 0x protocols  {this.props.core} vs {this.props.alter} liquidity pool rate: 1 : {this.props.price}</>;
        }
        else if(this.props.swap){
         
          content= "your transaction is being proccessed";
  
        }   

        
            return (
    
                <div>
                         <p> Transaction status: {content} </p>
                    
                </div>
            );
        }
}
    
Transact.propTypes = {
    sold: PropTypes.number.isRequired,
    core: PropTypes.string.isRequired,
    alter: PropTypes.string.isRequired,
    bought: PropTypes.number.isRequired,
};

