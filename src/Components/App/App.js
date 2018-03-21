import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as helper from '../../helper/helper.js'
import Table from '../Table/Table.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currencyReturns: {}
    }
  }

  componentDidMount = async () => {
    const fetched = await helper.fetchApi('https://api.nomics.com/v0/sparkline')
    const currencyReturns = helper.getData(fetched)
    this.setState({ currencyReturns })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Nomics</h1>
        </header>
        <Table currencyReturns={this.state.currencyReturns} />
      </div>
    );
  }
}

export default App;
