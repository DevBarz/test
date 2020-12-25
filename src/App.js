import logo from './logo.svg';
import './App.css';
import Swap from './swap';
import Transact from './transaction'; 
import React, { Component } from 'react'
import WalletBalance from './walletbalance';
import Balance from './balance'
import styled from 'styled-components'; 

const Section = styled.section`
    font-size: 10px;
    border: 1px solid black;
    text-align: center;
    padding: 0px;
    paddingBottom: 0px;
    paddingTop: 0px;
    paddingRight: 0px;
    width: 40vh;
    font-color: black;
`;
   


 export default class App extends Component {
   constructor (props){
     super(props);
     this.currencies = ["ETH","DAI","MKR","LINK","KNC","LEND","WETH"];

     this.state={
    
     confirm: false,
     swap: false,
     balanceUpdate: false,
     showBalance: true,
     totalBalance: "",
     usdBalance: false, 
     amount: "",
     converted: "",
     base: "ETH",
     other: "DAI",
     blockId: "",
     timeStamp:"",
     price: "",
     /*liquidityPool: "",*/

     wallets: [
      {ticker:"ETH", total: 3000 ,},
      {ticker:"WETH", total:0,},
      {ticker:"LEND", total:150000,},
      {ticker:"LINK", total:10000,},
      {ticker:"KNC", total: 0,},
      {ticker:"MKR", total:500,},
      {ticker:"DAI", total: 500000,} ] 




     }

     };
       


  
     render() {
      /*const timestamp = date.now();
      const txId = ""; */

      
    

       return (
       <div>
        <div className="App">
        
           <button className="register">SIGN UP</button>
         
           <button className="enter">LOGIN</button>

           <header>
          
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>
          DRaU
          </p>
              <Swap 
              amount={this.state.amount} 
              other={this.state.other} 
              converted={this.state.converted} 
              base={this.state.base} 
              makeSelection={this.makeSelection} 
              changeValue={this.changeValue} 
              calculateSwap={this.calculateSwap}
              swap={this.state.swap} 
              confirm={this.state.confirm} 
              makeTransaction={this.makeTransaction} 
              resetSwap={this.resetSwap} 
              resetTransaction={this.resetTransaction} />
                 <br></br>  

                 

                 <h1 className="details">
                   <Transact 
                 sold={this.state.amount} bought={this.state.converted} 
                 core={this.state.base} alter={this.state.other} 
                 confirm={this.state.confirm} swap={this.state.swap} 
                 price={this.state.price}/></h1>
                 
                 </header>   
       
        <Section>
        
        <thead >
        <Balance 
        account=  {this.state.totalBalance} 
       pbalance={this.portfolioBalance}
       showBalance={this.state.showBalance}
       handleVis={this.handleVis}
       usdBalance={this.state.usdBalance}
       dollarBal={this.dollarBal}/> 
        
        
        </thead>
        
        <table> 
        <th>Wallet Balance</th>
        <tbody>
        
        {this.state.wallets.map((values) =>
            <WalletBalance ticker={values.ticker} 
                           total={values.total} 
                           base = {this.state.base} 
                           other = {this.state.other} 
                           amount = {this.state.amount} 
                           converted = {this.state.converted} 
                           balanceUpdate = {this.state.balanceUpdate}
                           showBalance = {this.state.showBalance}
                           prepareBalance={this.prepareBalance}
                           calculateBalance={this.calculateBalance} />
                           
            )
            }
       
        
         
          </tbody>
        </table>
        </Section>     
        
                </header>
                
                </div>  
            
               {this.showTranId()}
       
            </div>
         
       )
     }

    
     makeSelection = (event) => {
      
      this.setState({ 

        [event.target.className]: event.target.value  
  
        }, this.calculateSwap);

    
   }

   changeValue = (event) => {
     this.setState({

      amount: event.target.value,
      converted: "",

     }, this.calculateSwap);
   }

   calculateSwap = () => {
    
     const isValid = parseFloat(this.state.amount);
    if (isNaN(isValid)){
      return ;
    }

    fetch(`https://api.0x.org/swap/v1/quote?buyToken=${this.state.other}&sellToken=${this.state.base}&sellAmount=${this.state.amount}`)
    .then(response => response.json())
    .then( data => {
      
      /*var dateTime= new Date();*/
     
      this.setState({
       
       converted: data.price * isValid,
       blockId: data.allowanceTarget,
       /*timeStamp: dateTime,*/
       price: data.price,
      /*  liquidityPool: data.sources[1].name */

     });
      

    });
}
 

  makeTransaction = () => {
    const sold= this.state.amount;
    const core = this.state.base;
    const alter=this.state.other; 
    const bought= this.state.converted;
    const wallets = this.state.wallets;
    

  for (var n=0; n < wallets.length; n++){
    if ((wallets[n].ticker ===core) && (wallets[n].total ===0)){
       alert("insufficient balance");
       return false;
    }
  } 
     if(isNaN(sold)){
  
     alert("unable to process");
       return false;
     }
  
     else if(isNaN(bought)){
      alert("unable to process");
      return false;
      
     }
    
     else if(core===alter){
      
      alert("unable to process");
      return false;
     
  
     } 
     else if(bought===0){

      alert("unable to process");
      return false;
     }
     else if(bought===""){

      alert("unable to process");
      return false;
     }
     else if(sold===""){

      alert("unable to process");
      return false;
     }
     
     else{
     
      this.setState({
      swap: true,

      
     },this.prepareBalance);
  }
     setTimeout(this.resetSwap, 5000);
       
     }
     

     resetSwap = () => {
     
      this.setState({
           
      swap: false,
      confirm: true,
      

      });
      setTimeout(this.resetTransaction, 7000);
 }  

 resetTransaction = () =>{

  this.setState({
    confirm: false,
    amount: "",
    converted: "",
  });

 }
   
showTranId = () => {
  if(this.state.confirm===true){
    return (
      <h5>{this.state.timeStamp} {this.state.blockId}</h5>
    );
  }
    
  
 
}

handleVis = () => {
  this.setState(function(oldState){
    return{
     ...oldState,
     showBalance: !oldState.showBalance,
    }
});
}

dollarBal = () => {
  this.setState(function(oldState){
    return{
      ...oldState,
      usdBalance: !oldState.usdBalance,
     }
  })
}
 
  
  prepareBalance = () => {
    
      this.setState({
        balanceUpdate: true,
        
      });

      setTimeout(this.calculateBalance, 5000);
  }

  calculateBalance = () => {
   
    const base = this.state.base;
    const amount = this.state.amount;
    const converted = this.state.converted;
    const other = this.state.other;

    const newWallets = this.state.wallets.map(function ({ ticker, total }) {
      let newTotal = total;

      if (ticker === base) {
        newTotal = newTotal - amount;
      } else if (ticker === other) {
        newTotal = newTotal + converted;
      }

      return {
        ticker,
        total: newTotal
      };
    });

    this.setState({ wallets: newWallets }, this.portfolioBalance);
  };

componentDidMount = async () => {
  const wallets = this.state.wallets;
  //Since the map function will make API calls, make it async
  const newBalance = wallets.map(async ({ ticker, total }) => {
    console.log(ticker, total, "ticker, total");

    if (ticker === "ETH") {
      const price = 1;
     //return the object if its eth
      return {
        ticker: ticker,
        total: total * price
      };
    } 
    
    else if(ticker==="MKR") {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=MKR&sellAmount=100000`
      );
      const responseJSON = await response.json();
      const price = await parseFloat(responseJSON.price).toFixed(5);
      console.log(price, ticker , "price I got from API and corresponding ticker");
      return {
        ticker: ticker,
        total: total / price,
      };
    }
    
    else {
     // await for the API call, basically telling javascript to return a promise when API is in progress but then return value after you got the value
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=${ticker}&sellAmount=100000`
      );
      // await here as well
      const responseJSON = await response.json();
      //await here as well
      const price = await parseFloat(responseJSON.price).toFixed(5);
      console.log(price, ticker , "price I got from API and corresponding ticker");
      // return the value if its any other coin
      return {
        ticker: ticker,
        total: total * price,
      };
    }
  });

 // Here we basically say, the map function returned an array of promises, once  all the promises are resolved, retrieve the actual values and assign it to updatedBalance
  const updatedBalance = await Promise.all(newBalance);
  console.log(updatedBalance); //to check my final array 

  // Update the state with the total balance in ETH by adding the array
  this.setState({
    totalBalance: updatedBalance.reduce((a,v) =>  a = a + v.total , 0),
  });

};

portfolioBalance = async () => { 

  const wallets = this.state.wallets;
  const newBalance = wallets.map(async ({ ticker, total }) => {

    if (ticker === "ETH") {
      const price = 1;
     
      return {
        ticker: ticker,
        total: total * price
      };
    } 
    
    else if(ticker==="MKR") {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=MKR&sellAmount=100000`
      );
      const responseJSON = await response.json();
      const price = await parseFloat(responseJSON.price).toFixed(5);
      return {
        ticker: ticker,
        total: total / price,
      };
    }
    
    else {
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=${ticker}&sellAmount=100000`
      );
      const responseJSON = await response.json();
      const price = await parseFloat(responseJSON.price).toFixed(5);
      return {
        ticker: ticker,
        total: total * price,
      };
    }
  });

  const updatedBalance = await Promise.all(newBalance);
  this.setState({
    totalBalance: updatedBalance.reduce((a,v) =>  a = a + v.total , 0),
  });

  }


}
  
 
 




 




  
  

