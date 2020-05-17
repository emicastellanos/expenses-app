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
      balance: 0,
      loading: true,
      toDelete: []
    };

    this.updateBalance = this.updateBalance.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/getAllMovements')
    .then((response) => {
      console.log('mambo', response.data)
      this.setState({
        products: response.data.movs,
        loading: false,
        toDelete:[]
      })
    })
  }

  columns = [{
    dataField: 'description',
    text: 'description'
  }, {
    dataField: 'amount',
    text: '$',
    sort: true
  }, {
    dataField: 'date',
    text: 'fecha',
  }];

  updateBalance = (products) => {
    let balance = products.reduce( (acc, val) =>  parseFloat(acc) + parseFloat(val.amount), 0);
    return parseFloat(balance).toFixed(2);
  }

  handleSubmit = (description, amount, date) => {
    const item = { description, amount };
    let products = [...this.state.products];
    products.unshift(item);
    let balance = this.updateBalance(products);
    this.setState({ products, balance })

    axios.post('/api/insert', { description, amount, date })
  }

  handleDeleteSubmit = () => {
    console.log('trying to delete..')
    console.log("should delete", this.state.toDelete)
    axios.post('/api/deleteAll', this.state.toDelete)
    this.setState({
      toDelete:[]
    })
    console.log('finished well')
  }

  handleSelect = (row, isSelect, rowIndex) => {
    console.log(row, isSelect, rowIndex)
    let deleteaux = this.state.toDelete;
    (isSelect) ? deleteaux.push(row) : deleteaux = deleteaux.filter( item => item.id !==  row.id)
    this.setState({
      toDelete: deleteaux
    })
  }



  render() {
    
    return (
      <div className="app wrapper-table">
        <BootstrapTable
          keyField='id'
          headerClasses="header-class"
          data={ this.state.products }
          columns={ this.columns }
          striped
          hover
          bordered={ false }
          // cellEdit={ true } 
          loading={ this.state.loading }
          overlay={ overlayFactory({ spinner: true}) }
          noDataIndication="Table is Empty"
          selectRow={{
            mode: "checkbox",
            clickToSelect: true,
            clickToEdit: true,
            onSelect: (row, isSelect, rowIndex) => this.handleSelect(row, isSelect, rowIndex),
            style: { background: 'rgb(238, 193, 213)' }
          }}
        />
        <div className="container-summary">
        { `Balance : ${this.state.balance}`}
        </div>
        <FormItem onSubmit={this.handleSubmit} onDeleteSubmit={this.handleDeleteSubmit} 
        listToDelete={this.state.toDelete} />
      </div>
    );
  }
}

export default App;
