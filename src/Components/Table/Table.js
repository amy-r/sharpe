import React, {Component} from 'react';
import './Table.css'

class Table extends Component {

  getTableData(){
    const curArrays = Object.entries(this.props.currencyReturns)
    const currencyCells = curArrays.map( (currency, i) => {
      return (
       <tr key={currency[0]}> 
      <td> {currency[0]} </td>  <td> {currency[1]} </td>
      </tr>
      )
    })

    return currencyCells   
  }
  
  render() {
    return (
      <div>
        <h1>Sharpe Ratios and Currencies </h1>
        <table>
          {this.getTableData()}
        </table>
      </div>
    )
  }
}  


export default Table