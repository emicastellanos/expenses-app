import React, { Component } from 'react';

class ButtonBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      amount: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // handleSubmit (event) {
  //   this.setState({
  //     description:'',
  //     amount:''
  //   })
  //   this.props.onSubmit()
  // }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.onSubmit(e,this.state)}>
          <label htmlFor="desc">gasto: </label>
          <input
            id="description"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label htmlFor="amonut">monto: </label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ButtonBar;