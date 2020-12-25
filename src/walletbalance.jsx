import React, { Component } from 'react'
import styled from 'styled-components';

export default class Walletbalance extends Component {
  
    
       
    render() {
            var balance =this.props.total;
            let content = "";
            let contentB ="";

            if (this.props.showBalance===false) {
                content = this.props.ticker;
                contentB = "******";
            }
            else if (balance !==0){
                content = this.props.ticker;
                contentB = this.props.total;
            }
        
        return (
            <div>

             <tr>
            <td><h1> {content} </h1></td> 
             <td><h3> {contentB} </h3></td> 
            </tr>  

            </div>
        )
    } 
}

