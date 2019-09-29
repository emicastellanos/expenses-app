import React, { Component } from 'react';
import '../css/App.css';
import BootstrapTable from 'react-bootstrap-table-next';

import FormItem from './FormItem';

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

  handleSubmit = (description, amount) => {
    //event.preventDefault();
    const item = { description, amount };
    let products = [...this.state.products];
    products.push(item);
    this.setState({ products })
    console.log('productos', this.state.products)
  }

  render() {
    return (
      <div className="app">
        <FormItem onSubmit={this.handleSubmit}/>
        <BootstrapTable
          keyField='id'
          headerClasses="header-class"
          wrapperClasses="wrapper-table"          
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
    );
  }
}

export default App;
