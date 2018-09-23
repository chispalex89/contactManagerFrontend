import { FETCHING_CONTACT_LIST, FETCHING_CONTACT_LIST_FAILURE, FETCHING_CONTACT_LIST_SUCCESS,
    CREATE_CONTACT, CREATE_CONTACT_FAILURE, CREATE_CONTACT_SUCCESS } from "../config/consts";
const initialState = {
    isFetchingContacts: false,
    isCreating: false,
    isCreated: false,
    errorMessage: '',
    contactList: []
}

export default function contactReducer(state = initialState, action) {
    switch(action.type){
        case FETCHING_CONTACT_LIST:
        return {
            ...state,
            isFetchingContacts: true,
            contactList: []
        }
        case FETCHING_CONTACT_LIST_SUCCESS:
        return {
            ...state,
            isFetchingContacts: false,
            contactList: action.data
        }
        case FETCHING_CONTACT_LIST_FAILURE: 
        return {
            ...state,
            isFetchingContacts: false,
            contactList: []
        }
        case CREATE_CONTACT:
        return {
            ...state,
            isCreated: false,
            isCreating: true,
            errorMessage: ''
        }
        case CREATE_CONTACT_SUCCESS:
        return {
            ...state,
            isCreating: false,
            isCreated: true,
            errorMessage: ''
        }
        case CREATE_CONTACT_FAILURE:
        return {
            ...state,
            isCreating: false,
            isCreated: false,
            errorMessage: action.data
        }
        default:
        return state
    }
}