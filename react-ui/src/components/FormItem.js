import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../css/App.css'

class FormItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      amount: "",
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
      console.log('mambo')
      event.preventDefault();
      event.stopPropagation();
    } else {
        this.setState({
          validated: true,
        });
        return;
    }
    let amount = this.state.amount.length === 0 ? 0 : this.state.amount;
    this.props.onSubmit(this.state.description, amount)
    this.setState({
      description:'',
      amount:"",
    })
    
  }

  render() {
    var isDeleting;
    (this.props.listToDelete !== undefined)  
      ? isDeleting = this.props.listToDelete.length !== 0 
      : isDeleting = false;
    
    return (
      <>
        <Form className="container-form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="descGroup">
            <Form.Label column sm="2">Descripcion</Form.Label>
            <Col sm="10">
              <Form.Control
              type="text" name="description"
              size="sm" onChange={this.handleChange}
              value={this.state.description}
              required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                placeholder={0}
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
          {
            isDeleting ? '' :
            <Button className="btn" type="submit" variant="primary" size="lg" block >
              OK
            </Button>
          }
        </Form>
        {
          isDeleting ? 
          <Button className="btn-danger" type="submit" variant="primary" size="lg" block onClick={this.props.onDeleteSubmit}>
            DELETE
          </Button>
          :  ''
        }
      </>
    );
  }
}

export default FormItem;