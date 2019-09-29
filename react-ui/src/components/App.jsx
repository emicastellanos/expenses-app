import React, { Component } from 'react';
import '../css/App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ButtonBar from './ButtonBar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      products:[],
      saldo: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  columns = [{
    dataField: 'description',
    text: 'descripcion'
  }, {
    dataField: 'amount',
    text: '$'
  }, {
    dataField: 'date',
    text: 'fecha'
  }];

  

  handleSubmit = (event, item) => {
    event.preventDefault();
    let products = [...this.state.products];
    products.push(item);
    this.setState({ products })
    console.log('productos', this.state.products)
  }

  

  render() {
    
    return (
      <div className="App">
        <ButtonBar onSubmit={this.handleSubmit}/>
        <div className="container-table">
          <BootstrapTable
            keyField='id'
            headerClasses="header-class"
            wrapperClasses="wrapper-table"
            // rowClasses="custom-row-class"
            
            data={ this.state.products }
            columns={ this.columns }
            striped
            hover
            condensed
            bordered={ false }
            noDataIndication="Table is Empty"            
          />
          <div className="container-summary">
          { `Saldo : ${this.state.saldo}`}
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
