import React, { Component } from 'react';
import '../css/App.css'
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';

import axios from 'axios';
import FormItem from './FormItem';

class App extends Component {
  constructor() {
    super();

    this.state = {
      products:[],
      saldo: 0,
      loading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/getAllMovements')
    .then((response) => {
      console.log('mambo', response.data)
      this.setState({
        products: response.data.movs,
        loading: false
      })
    })
    
  }

  columns = [{
    dataField: 'description',
    text: 'descripcion'
  }, {
    dataField: 'amount',
    text: '$'
  }, {
    dataField: 'date',
    text: 'fecha',
  }];

  handleSubmit = (description, amount, date) => {
    const item = { description, amount };
    let products = [...this.state.products];
    products.push(item);
    this.setState({ products })
    console.log('productos', this.state.products)
    axios.post('/api/insert', { description, amount, date })
  }

  render() {
    return (
      <div className="app wrapper-table">
        <BootstrapTable
          keyField='id'
          headerClasses="header-class"
          // wrapperClasses="wrapper-table"
          data={ this.state.products }
          columns={ this.columns }
          striped
          hover
          bordered={ false }
          loading={ this.state.loading }
          overlay={ overlayFactory({ spinner: true}) }
          noDataIndication="Table is Empty"            
        />
        <div className="container-summary">
        { `Saldo : ${this.state.saldo}`}
        </div>
        <FormItem onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
