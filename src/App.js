import React, { Component } from "react";
import "./App.css";
import CryptoTable from './components/CryptoTable'
import Graph from './components/Graph'
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: ["tether", "litecoin", "cosmos","polkadot", "binancecoin"],
      api: {
        time: Date.now(),
        datas: []
      }
    };
  }

  updateLocalStorage = () => {
    // Get the api form the local storage
    const apiFromLocalStorage = JSON.parse(localStorage.getItem("api"));
    // If the api is not in the local storage, get the api from Axios and update the state and the local storage
    // if (apiFromLocalStorage.time === undefined)   
    this.updateStateWithAxios();
    //console.log(apiFromLocalStorage)
    //console.log('data', this.state.api.datas)
    // check if the "time" date from local storage is older than 5min.
    let time = Date.now();
    let fiveMin = 1 * 60 * 1000;
    //console.log("localstorage",apiFromLocalStorage)
    if (time - new Date(apiFromLocalStorage.time) > fiveMin) {
      // get the api from Axios and update the state and the local storage
      this.updateStateWithAxios();
    } 
  };

  updateStateWithAxios = () => {
    // Axios + envoyer les données dans le state
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=" +
        this.state.currencies.join("%2C%20") +
        "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        //console.log(response.data);
        this.setState({
          api: {
            time: Date.now(),
            datas: response.data
          }
        });
        localStorage.setItem("api", JSON.stringify(this.state.api));
        //console.log("data", this.state.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  componentDidMount() {
    //this.updateStateWithAxios();
    this.updateLocalStorage();
  }

  render() {
    return (
      <div className="App">
        <h1>CryptoTable</h1>
        <CryptoTable data={this.state.api.datas}/>
        
        <Graph data={this.state.api.datas}/>
      </div>
    );
  }
}
