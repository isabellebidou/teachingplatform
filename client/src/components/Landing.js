import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
//import Feedback from "./FeedbackForm";
import FaqList from "./faqs/FaqList"
import FaqForm from "./faqs/FaqForm"
import StarReviewList from "./starreviews/StarReviewList"
import $ from "jquery"
//import CookieDisplay from "./CookieDisplay";
import CookieConsent from "react-cookie-consent"
import { updateCookieAcceptance } from "../actions"
import { fetchCookieValue } from "../actions"
import { withTranslation } from "react-i18next"
import enLanding from "../locales/en/landing.json"
import frLanding from "../locales/fr/landing.json"

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCookieValue()
    // $(".logo").removeClass("logo").addClass("logo_mounted");
  }

  handleClose(e) {
    $(".actionsign").slideToggle()
  }
  renderFaqForm() {
    if (this.props.auth && this.props.auth.type === "admin") {
      return <FaqForm />
    }
  }
  renderLinkForm() {
    if (this.props.auth && this.props.auth.type === "admin") {
      return
    }
  }
  handleAccept = () => {
    updateCookieAcceptance(true)
    this.props.fetchCookieValue()
    // this.renderButton()
  }

  handleDecline = () => {
    updateCookieAcceptance(false)
    $(".actionsign").hide()
    $(".actionbook").hide()
  }

  renderButton() {
    if (this.props.auth) {
      return (
        <Link to="/dashboard" className="">
          <button className="actionbook">test your pronunciation skills</button>
        </Link>
      )
    } else {
      return (
        <span className="actionsign button">
          Sign in and start learning today!
          <br />
          <span className="closeWindow" onClick={this.handleClose}>
            x
          </span>
          <a href="/auth/google">
            <img
              alt="google sign in"
              loading="eager"
              title="sign in with google"
              src="/btn_google_signin_dark_normal_web.png"
            />
          </a>
        </span>
      )
    }
  }
  render() {
    const { cookie } = this.props
    const { t } = this.props;
    // Get the browser locale

    const browserLocale = navigator.language || navigator.userLanguage

    // Extract the country code from the locale
    const countryCode = browserLocale.split("-")[1]
    return (
      <div className="page">
        {/* TBD
                <div className="navigation-container">
                    <a className="nav-link" href="#can">Learning</a>
                    <a className="nav-link" href="#reviews">Reviews</a>
                    <a className="nav-link" href="#faq">FAQ</a>
                    <a className="nav-link" href="#offer">Offer</a>
                    <a className="nav-link" href="#links">Resources & links</a>
                    <a className="nav-link" href="#contact">Contact</a>
                </div>
                <p className="disclaimerp">
                Disclaimer: The content provided on this page is for informational and recreational purposes only.
                </p>
        */}
        <h1>{t("h1Title")}</h1>

        <div className="col"></div>

        <fieldset>
          <legend>
            <h2>{t("h2Features")}</h2>
          </legend>
          <h2>{t("h2AudioFeedback")}</h2>
          <p>{t("pAudioFeedback")}</p>

          <h2>{t("h2SpellingFeedback")}</h2>
          <p>{t("pSpellingFeedback")}</p>

          <h2>{t("h2GrammarPractice")}</h2>
          <p>{t("pGrammarPractice")}</p>
        </fieldset>

        <fieldset>
          <legend>
            <h2>{t("h2Reviews")}</h2>
          </legend>

          <span id="reviews">
            <StarReviewList />
          </span>

          {this.props.auth && (
            <Link to="/dashboard" className="">
              <button className="actionupload">{t("btnLeaveReview")}</button>
            </Link>
          )}
        </fieldset>
        <fieldset>
          <legend>
            <h2>{t("h2faq")}</h2>
          </legend>

          <span id="faq"></span>
          <FaqList />
          {this.renderFaqForm()}
        </fieldset>
        {/* 
                <fieldset>
                    <legend><h2> Links </h2></legend>

                    <span id="links" >

                    </span>
                    {this.renderLinkForm()}


                </fieldset>
        */}
        <fieldset>
          <legend>
            <h2> Contact </h2>
          </legend>

          <div id="contact">
            <img
              className="me"
              src="/me.png"
              alt="isabelle bidou"
              loading="lazy"
              title="Isabelle Bidou"
            ></img>
            <p className="itemp">
              {t("pContact")}{" "}
              <a href="mailto:isa.bidou@gmail.com?subject=Teaching Platform Enquiry">
                isa.bidou@gmail.com
              </a>
            </p>
          </div>
        </fieldset>
        {(cookie === true || cookie === "" || cookie === null) && (
          <span>{this.renderButton()}</span>
        )}
        <div></div>
        <CookieConsent
          location="bottom"
          buttonText="ok"
          cookieName="TeachingPlatformCookieConsent"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
          enableDeclineButton
          onDecline={() => {
            this.handleDecline()
          }}
          onAccept={() => {
            this.handleAccept()
          }}
          overlay
        >
          {t("pCookie")}
          <br />
          {(countryCode !== "FR" || countryCode !== "fr") && (
            <span className="item">
              <Link key={"legalnoticelink"} to={"/legalnotice"}>
                Legal Notice
              </Link>
            </span>
          )}
          {(countryCode === "FR" || countryCode === "fr") && (
            <span className="item">
              <Link key={"mentionslegaleslink"} to={"/mentionslegales"}>
                Mentions legales
              </Link>
            </span>
          )}{" "}
        </CookieConsent>
      </div>
    )
  }
}
function mapStateToProps({ auth, cookie }) {
  return { auth, cookie }
}

export default connect(mapStateToProps, { fetchCookieValue })(
  withTranslation("landing")(Landing),
)
