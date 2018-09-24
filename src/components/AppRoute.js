import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './navbar/Navbar';
import ContactList from './contact/list/ContactList'
import CreateContact from './contact/create/CreateContact'

export default function AppRoute() {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Route exact path="/" component={ContactList} />
          <Route path="/home" component={ContactList} />
          <Route path="/create" component={CreateContact}/>
        </main>
      </div>
    </Router>
  );
}
