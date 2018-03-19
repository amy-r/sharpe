import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as helper from '../../helper/helper.js'

class App extends Component {

  componentDidMount() {
    helper.getData('https://api.nomics.com/v0/sparkline')
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
