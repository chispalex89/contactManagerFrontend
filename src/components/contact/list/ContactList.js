import React from 'react';
import { Jumbotron, Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText,
   Button, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import { fetchContacts } from '../../../redux/actions/contacts'

const matchDispatchToProps = (dispatch) => {
  return {
    getContacts: () => dispatch(fetchContacts())
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
}

class ContactList extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      picture: '',
      description: '',
      modal: false
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  showModal = (contact) => {
    const {name,picture,phone,email} = contact
    this.setState({
      ...this.state,
      name,
      picture,
      phone,
      email
    })
    this.toggle()
  }

  componentDidMount() {
    this.props.getContacts()
  }

  render() {
    const {props, toggle, state} = this
    const {contacts} = props
    const {isFetchingContacts, contactList} = contacts
    return(
<div>
  <Jumbotron>
    <Row>
    <Col xs="12" sm="6">
    <h2 className="display-3">Contacts</h2>
    </Col>
    <Col style={{textAlign:'right'}} xs="12" sm="6">
    <Link to={'/create'} className={'btn btn-success btn-lg'}>Add Contact</Link>
    </Col>
    </Row>
  </Jumbotron>
  <Row>
    {
      isFetchingContacts && <Col style={{textAlign:'center'}}><Loader type="Oval" color="black" height={80} width={80} /></Col>
    }
  {
    !isFetchingContacts && contactList.length > 0 && contactList.map((contact, index) => {
      return (
        <Col key={index} xs="6" sm="4" md="3" xl="2">
          <Card>
            <CardImg top width="100%" style={{maxHeight:200}}  src={contact.picture} alt="Card image cap" />
            <CardBody>
              <CardTitle>{contact.name}</CardTitle>
              <CardSubtitle>{contact.email}</CardSubtitle>
              <CardText>{contact.phone}</CardText>
              <Col style={{textAlign:'right'}}>
              <Button outline color="primary" onClick={() => {this.showModal(contact)}}>Details</Button>
              </Col>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }
  {
    !isFetchingContacts && contactList.length === 0 && <Col>No contacts found</Col>
  }
  </Row>
  <Modal isOpen={this.state.modal} toggle={toggle}>
    <ModalHeader toggle={this.toggle}>Detail</ModalHeader>
    <ModalBody>
    <Row>
      <Col xs="12" sm="5">
      <img className="img-responsive" alt={state.name} src={state.picture} width="100%"/>
      </Col>
      <Col xs="12" sm="7">
        <Row><Col sm="12"><h2>{state.name}</h2></Col></Row>
        <Row><Col sm="12"><a href={`mailto:${state.email}`}>{state.email}</a></Col>
        </Row><Row><Col sm="12">
        <a href={`tel:${state.phone}`}>{state.phone}</a>
        </Col></Row>
      </Col>
    </Row>
    </ModalBody>
    <ModalFooter>
      <Button outline color="primary" onClick={toggle}>Dismiss</Button>
    </ModalFooter>
  </Modal>
</div>      
    )
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ContactList)