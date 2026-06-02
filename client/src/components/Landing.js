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
import PricingCard from "./PricingCard"

const Landing = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation("landing")

  const auth = useSelector((state) => state.auth)
  const cookie = useSelector((state) => state.cookie)
  const [visibility, setVisibility] = useState("visible")

  const [mode, setMode] = useState("online") // default: online (important)
  const [selectedIndividualOffer, setIndividualSelectedOffer] =
    useState("individualMonthly")
  const [selectedCorporateOffer, setCorporateSelectedOffer] =
    useState("corporateMonthly")

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
      {auth && !auth.hasConsultation && (
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

      <h2>{t("H2OffersIntro")}</h2>
      <fieldset>
        <legend>
          <h2>{t("h2OffersLegend")}</h2>
        </legend>
        <p className="offerParagraph">{t("pIndividualOffers")}</p>
        <div className="modeToggle">
          <button
            className={mode === "online" ? "active" : ""}
            onClick={() => setMode("online")}
          >
            {t("lblOnline")}
          </button>

          <button
            className={mode === "onsite" ? "active" : ""}
            onClick={() => setMode("onsite")}
          >
            {t("lblInPerson")}
          </button>
        </div>

        <div className="pricingGrid">
          <PricingCard
            title={t("thIndividualSingle")}
            price={
              mode === "online"
                ? t("individualSinglePriceOnline")
                : t("individualSinglePrice")
            }
            description={t("individualSingleDesc")}
            selected={selectedIndividualOffer === "individualSingle"}
            onClick={() => setIndividualSelectedOffer("individualSingle")}
          />

          <PricingCard
            title={t("thIndividualPilot")}
            price={
              mode === "online"
                ? t("individualPilotPriceOnline")
                : t("individualPilotPrice")
            }
            description={t("individualPilotDesc")}
            selected={selectedIndividualOffer === "individualPilot"}
            onClick={() => setIndividualSelectedOffer("individualPilot")}
          />

          <PricingCard
            title={t("thIndividualMonthly")}
            price={
              mode === "online"
                ? t("individualMonthlyPriceOnline")
                : t("individualMonthlyPrice")
            }
            description={t("individualMonthlyDesc")}
            selected={selectedIndividualOffer === "individualMonthly"}
            onClick={() => setIndividualSelectedOffer("individualMonthly")}
          />
        </div>

        <p className="offerTerms">{t("pIndividualTermsSummary")}</p>

        <p className="offerNote">{t("pIndividualOfferNote")}</p>

        <div className="offerCTA">
          <p>{t("pOfferBook")}</p>

          <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
            <button className="actionupload">{t("btnActionbook")}</button>
          </a>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>{t("h2CorporateOffersLegend")}</h2>
        </legend>

        <p className="offerParagraph">{t("pCorporateOffer")}</p>
        <div className="modeToggle">
          <button
            className={mode === "online" ? "active" : ""}
            onClick={() => setMode("online")}
          >
            {t("lblOnlineCorporate")}
          </button>

          <button
            className={mode === "onsite" ? "active" : ""}
            onClick={() => setMode("onsite")}
          >
            {t("lblInPersonCorporate")}
          </button>
        </div>

        <div className="pricingGrid">
          <PricingCard
            title={t("thCorporateSingle")}
            price={
              mode === "online"
                ? t("corporateSinglePriceOnline")
                : t("corporateSinglePrice")
            }
            description={t("corporateSingleDesc")}
            selected={selectedCorporateOffer === "corporateSingle"}
            onClick={() => setCorporateSelectedOffer("corporateSingle")}
          />

          <PricingCard
            title={t("thCorporatePilot")}
            price={
              mode === "online"
                ? t("corporatePilotPriceOnline")
                : t("corporatePilotPrice")
            }
            description={t("corporatePilotDesc")}
            selected={selectedCorporateOffer === "corporatePilot"}
            onClick={() => setCorporateSelectedOffer("corporatePilot")}
          />

          <PricingCard
            title={t("thCorporateMonthly")}
            price={
              mode === "online"
                ? t("corporateMonthlyPriceOnline")
                : t("corporateMonthlyPrice")
            }
            description={t("corporateMonthlyDesc")}
            selected={selectedCorporateOffer === "corporateMonthly"}
            onClick={() => setCorporateSelectedOffer("corporateMonthly")}
          />
        </div>

        <p className="offerNote">{t("pCorporateOfferNote")}</p>
        <p>{t("pCorporateTermsSummary")}</p>

        <div className="offerCTA">
          <p>{t("pOfferBook")}</p>

          <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
            <button className="actionupload">{t("btnActionbook")}</button>
          </a>
        </div>
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
