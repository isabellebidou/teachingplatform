import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { useSelector } from "react-redux";
import i18n from "../i18n";

// components
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import Landing from "./Landing";
import Feedback from "./FeedbackForm";
import Payment from "./Payment";
import Completion from "./Completion";
import UserDashboard from "./UserDashboard";
import UserBoard from "./UserBoard";
import UserDocuments from "./UserDocuments";
import UserExercice from "./UserExercice";
import ReadingNew from "./readings/ReadingNew";
import UserData from "./UserData";
import UserDataFormEdit from "./userData/UserDataFormEdit";
import UserDataFormNew from "./userData/UserDataFormNew";
import SelectedUserDashboard from "./SelectedUserDashboard";
import AdminDashboard from "./AdminDashboard";
import FaqList from "./faqs/FaqList";
import FaqForm from "./faqs/FaqForm";
import LegalNotice from "./LegalNotice";
import MentionsLegales from "./MentionsLegales";
import ProtectedRoute from "./ProtectedRoute";

function App({ fetchUser, fetchCookieValue }) {
  const auth = useSelector((state) => state.auth);

 
  useEffect(() => {
    fetchUser();
    fetchCookieValue();
  }, [fetchUser, fetchCookieValue]);

 
  useEffect(() => {
    if (auth?.language) {
      i18n.changeLanguage(auth.language);
    }
  }, [auth?.language]);

  return (
    <div className="maincontent">
      <BrowserRouter>
        <Header />

        <Route exact path="/" component={Landing} />
        <Route path="/api/feedback" component={Feedback} />
        <Route path="/payment" component={Payment} />
        <Route exact path="/completion" component={Completion} />

        <ProtectedRoute exact path="/dashboard" component={UserDashboard} />
        <ProtectedRoute exact path="/board" component={UserBoard} />
        <ProtectedRoute exact path="/exercice" component={UserExercice} />
        <ProtectedRoute exact path="/documents" component={UserDocuments} />
        <ProtectedRoute exact path="/readings/new" component={ReadingNew} />
        <ProtectedRoute exact path="/userdata/new" component={UserDataFormNew} />
        <ProtectedRoute exact path="/userdata" component={UserData} />
        <ProtectedRoute exact path="/userdata/edit" component={UserDataFormEdit} />

        <ProtectedRoute exact path="/users/dashboard" component={SelectedUserDashboard} />

        <Route exact path="/users" component={AdminDashboard} />
        <Route exact path="/faq/list" component={FaqList} />
        <Route exact path="/faq/add" component={FaqForm} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/mentionslegales" component={MentionsLegales} />
        <Route exact path="/legalnotice" component={LegalNotice} />

        <MobileMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default connect(null, actions)(App);