import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as helper from '../../helper/helper.js'

class App extends Component {

  componentDidMount = async () => {
    const fetched = await helper.fetchApi('https://api.nomics.com/v0/sparkline')
    console.log(fetched)
    helper.getData(fetched)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
