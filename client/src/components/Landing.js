import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import FaqList from "./faqs/FaqList"
import FaqForm from "./faqs/FaqForm"
import StarReviewList from "./starreviews/StarReviewList"
import CookieConsent from "react-cookie-consent"
import { fetchCookieValue, updateCookieAcceptance } from "../actions"
import { useTranslation } from "react-i18next"
import StarReview from "./StarReview"

const Landing = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation("landing")

  const auth = useSelector((state) => state.auth)
  const cookie = useSelector((state) => state.cookie)
  const [visibility, setVisibility] = useState("visible")

  useEffect(() => {
    dispatch(fetchCookieValue())
  }, [dispatch])

  const handleAccept = () => {
    dispatch(updateCookieAcceptance(true))
    dispatch(fetchCookieValue())
  }

  const handleDecline = () => {
    dispatch(updateCookieAcceptance(false))
  }
  const toggleVisibility = () => {
    setVisibility(visibility === "visible" ? "hidden" : "visible")
    const signin = document.getElementById("signin")
    if (signin) {
      signin.style.visibility =
        signin.style.visibility === "visible" ? "hidden" : "visible"
    }
  }
  const renderFaqForm = () => {
    if (auth && auth.type === "admin") return <FaqForm />
    return null
  }

  // Browser locale for Legal Notice
  const browserLocale = navigator.language || navigator.userLanguage
  const countryCode = browserLocale.split("-")[1]

  return (
    <div className="page">
      

      <div className="col"></div>
      {auth && (
        <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
          <button className="actionbook">{t("btnActionbook")}</button>
        </a>
      )}
      {!auth && visibility === "visible" && (
        <span className="actionsign button" id="signin">
          {t("btnActionsign")}
          <br />
          <span className="closeWindow" onClick={toggleVisibility}>
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
      )}

      <fieldset>
        <legend>
          <h2>{t("h2OffersLegend")}</h2>
        </legend>
        <p>{t("pOffers")}</p>

        <table className="offersTable">
          <tr>
            <th>{t("thOfferOnline5")}</th>
            <th>{t("thOfferOnline10")}</th>
            <th>{t("thOffer5")}</th>
            <th>{t("thOffer10")}</th>
          </tr>
          <tr>
            <td>{t("tdOfferOnline5")}</td>
            <td>{t("tdOfferOnline10")}</td>
            <td>{t("tdOffer5")}</td>
            <td>{t("tdOffer10")}</td>
          </tr>
        </table>

        <p>{t("pOfferBook")}</p>

        <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
          <button className="actionupload">{t("btnActionbook")}</button>
        </a>
      </fieldset>

      <fieldset>
        <legend>
          <h2>{t("h2Features")}</h2>
        </legend>
        <p>{t("pFeatures")}</p>
        <h2>{t("h2AudioFeedback")}</h2>
        <p>{t("pAudioFeedback")}</p>

        <h2>{t("h2GrammarPractice")}</h2>
        <p>{t("pGrammarPractice")}</p>
        {false && (
          <>
            <h2>{t("h2SpellingFeedback")}</h2>
            <p>{t("pSpellingFeedback")}</p>
          </>
        )}
      </fieldset>

      <fieldset>
        <legend>
          <h2>{t("h2Reviews")}</h2>
        </legend>

        <span id="reviews">
          <StarReviewList />
        </span>

        {false && (
          <Link to="/dashboard">
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
        {renderFaqForm()}
      </fieldset>

      <fieldset>
        <legend>
          <h2>{t("h2Contact")}</h2>
        </legend>

        <div id="contact">
          <img
            className="me"
            src="/isabellebidou.png"
            alt="isabelle bidou"
            loading="lazy"
            title="Isabelle Bidou"
          />
          <p className="itemp">
            {t("pContact")}{" "}
            <a href="mailto:isa.bidou@gmail.com?subject= Izzy Speak English Teaching Platform Enquiry">
              isa.bidou@gmail.com
            </a>
          </p>
        </div>
      </fieldset>

      {cookie === true || cookie === "" || cookie === null}

      <CookieConsent
        location="bottom"
        buttonText="ok"
        cookieName="TeachingPlatformCookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        enableDeclineButton
        onDecline={handleDecline}
        onAccept={handleAccept}
        overlay
      >
        {t("pCookie")}
        <br />
        {countryCode !== "FR" && countryCode !== "fr" && (
          <span className="item">
            <Link to={"/legalnotice"}>Legal Notice</Link>
          </span>
        )}
        {(countryCode === "FR" || countryCode === "fr") && (
          <span className="item">
            <Link to={"/mentionslegales"}>Mentions legales</Link>
          </span>
        )}
      
      </CookieConsent>
      <StarReview />
    </div>
  )
}

export default Landing
