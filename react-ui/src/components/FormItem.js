import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/App.css'

class FormItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      amount: 0,
      validated: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.setState({
        validated: true,
      });
        return;
    }

    this.props.onSubmit(this.state.description, this.state.amount)
    this.setState({
      description:'',
      amount:0,
    })
  }

  render() {
    return (
      <Form className="container-form" onSubmit={this.handleSubmit}
        noValidate validated={this.state.validated}>
        <Form.Group as={Row} controlId="descGroup">
          <Form.Label column sm="2">Descripcion</Form.Label>
          <Col sm="10">
            <Form.Control
            type="text" name="description"
            size="sm" onChange={this.handleChange}
            value={this.state.description}
            //required
            />
          </Col>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Row} controlId="amountGroup">
            <Form.Label column sm="2">Monto</Form.Label>
            <Col sm="10">
              <Form.Control 
              type="number" name="amount"
              size="sm" onChange={this.handleChange}
              value={this.state.amount}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="dateGroup">
            <Form.Label column sm="2">Fecha</Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="date" size="sm"></Form.Control>
            </Col>
          </Form.Group>
        </Form.Row>
        
        <Button className="btn" type="submit"
          variant="primary" size="lg" block>
          OK
        </Button>
      </Form>
    );
  }
}

export default FormItem;