import React from 'react';
import { Alert, Jumbotron, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { addContact } from '../../../redux/actions/contacts'
import LaddaButton, { XL, EXPAND_LEFT  } from 'react-ladda'

const matchDispatchToProps = (dispatch) => {
    return {
      addContact: (file, contact) => dispatch(addContact(file, contact))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      contacts: state.contacts
    }
  }
  

class CreateContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
      }

      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
      }

      handleFileUpload = (event) => {
        this.setState({file: event.target.files});
      }
        
      handleSubmit(event) {
        event.preventDefault()
        const {contactName,contactEMail, contactPhone, file} = this.state

        this.props.addContact(file[0], {
            name: contactName,
            eMail: contactEMail,
            phone: contactPhone
        })
      }
    
      componentDidUpdate(prevProps) {
          if(!!this.props.contacts.errorMessage) return
          if(this.props.contacts.isCreated !== prevProps.contacts.isCreated) 
          setTimeout(() => this.props.history.push('/'), 500)
      }

      render() {
          const {isCreated,isCreating, errorMessage} = this.props.contacts
          return (
<div>
    {!isCreated && !isCreating && errorMessage && <Alert color="danger">
        There was an error while creating the contact. 
    </Alert>}
    {isCreated && <Alert color="success">
        Successfully created contact.
    </Alert>}
    <Jumbotron>
    <Row>
        <Col xs="12" sm="6">
        <h2 className="display-3">Create Contact</h2>
        </Col>
    </Row>
    </Jumbotron>
    <Row>
        <Col xs="12" sm={{size:10, offset:1}}>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label for="contactName">Name</Label>
                <Input type="text" name="contactName" id="contactName" placeholder="ex.: John Smith" value={this.state.contactName} onChange={this.handleChange} required  />
            </FormGroup>
            <FormGroup>
                <Label for="contactEMail">e-mail Address</Label>
                <Input type="email" name="contactEMail" id="contactEMail" placeholder="mail@example.com" value={this.state.contactEMail} onChange={this.handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="contactPhone">Phone Number</Label>
                <Input type="phone" name="contactPhone" id="contactPhone" value={this.state.contactPhone} onChange={this.handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="contactPicture">Profile Picture</Label>
                <Input type="file" name="contactPicture" id="contactPicture" onChange={this.handleFileUpload} />
            </FormGroup>
            <LaddaButton
                loading={isCreating}
                data-color="#eee"
                data-size={XL}
                data-style={EXPAND_LEFT}
                data-spinner-size={30}
                data-spinner-color="#ddd"
                data-spinner-lines={12}
                className="btn btn-primary"
            >
                Submit
            </LaddaButton>
        </Form>
        </Col>
    </Row> 
</div>
    )
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateContact)