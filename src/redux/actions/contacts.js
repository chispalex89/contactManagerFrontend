import { FETCHING_CONTACT_LIST, FETCHING_CONTACT_LIST_FAILURE, FETCHING_CONTACT_LIST_SUCCESS,
    CREATE_CONTACT, CREATE_CONTACT_FAILURE, CREATE_CONTACT_SUCCESS } from "../config/consts";

import axios from 'axios'

export function fetchContacts() {
    return (dispatch) => {
        dispatch(getContacts())
        fetch('/api/contacts')
            .then(response => response.json())
            .then(json => dispatch(getContactsSuccess(json)))
            .catch(err => dispatch(getContactsFailure(err)))
    }
}

export function addContact(file, contact) {
    let data = new FormData()
    data.append('name', contact.name)
    data.append('email', contact.eMail)
    data.append('phone', contact.phone)
    data.append('file', file)
    return (dispatch) => {
        dispatch(createContact())
        axios.post('/api/contacts', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(json => {
            if(json.status === 201) dispatch(createContactSuccess(json))
            else dispatch(createContactFailure(json.statusText))
        })
        .catch(err => dispatch(createContactFailure(err)))
    }
}

function getContactsSuccess(data) {
    return {
        type: FETCHING_CONTACT_LIST_SUCCESS,
        data
    }
}

function getContactsFailure(err) {
    console.error(err)
    return {
        type: FETCHING_CONTACT_LIST_FAILURE
    }
}

function getContacts() {
    return {
        type: FETCHING_CONTACT_LIST
    }
}

function createContact() {
    return {
        type: CREATE_CONTACT
    }
}

function createContactSuccess() {
    return {
        type: CREATE_CONTACT_SUCCESS,
    }
}

function createContactFailure(data) {
    console.error(`[app] ${data}`)
    return {
        type: CREATE_CONTACT_FAILURE,
        data
    }
}