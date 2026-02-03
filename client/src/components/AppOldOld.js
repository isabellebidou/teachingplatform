import FeedbackForm from "./FeedbackForm";
import * as actions from '../actions';
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import { createRoot } from 'react-dom/client';

import { connect } from "react-redux";

import ProtectedRoute from "./ProtectedRoute";







class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchCookieValue();

    

  }
  render() {
    return (
      <div className="maincontent">
        

            

        <FeedbackForm></FeedbackForm>

      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth }

};


export default connect (mapStateToProps, actions)(App);
