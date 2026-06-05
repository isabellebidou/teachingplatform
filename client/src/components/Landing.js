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
  const { t } = useTranslation(["landing", "offers"])

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
  /*async function buyOffer(offerCode) {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offerCode }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Payment error")
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url
  }*/

  return (
    <div className="page">
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

      <div>
        <h2>{t("H2OffersIntro")}</h2>
        <div className="modeflex">
          <a href="#coaching" className={`cardbtn `}>
            {t("coachinglink")}
          </a>

          <a href="#coorporate" className={`cardbtn`}>
            {t("workshoplink")}
          </a>
        </div>
      </div>

      <fieldset>
        <legend>
          <h2>{t("h2OffersLegend")}</h2>
        </legend>

        <p id="ind" className="offerParagraph">
          {t("pIndividualOffers")}
        </p>
        <div id="coaching" className="modeToggle">
          <button
            className={`cardbtn ${mode === "online" ? "active" : ""}`}
            onClick={() => setMode("online")}
          >
            {t("lblOnline")}
          </button>

          <button
            className={`cardbtn ${mode === "onsite" ? "active" : ""}`}
            onClick={() => setMode("onsite")}
          >
            {t("lblInPerson")}
          </button>
        </div>

        <div className="pricingGrid">
          <PricingCard
            title={
              mode === "online"
                ? t("offers:coachingOnlineSingleTitle")
                : t("offers:coachingInPersonSingleTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:coachingOnlineSinglePrice")}`
                : `${t("offers:coachingInPersonSinglePrice")}`
            }
            description={
              mode === "online"
                ? t("offers:coachingOnlineSingleDesc")
                : t("offers:coachingInPersonSingleDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:coachingOnlineSingleMarketing")
                : t("offers:coachingInPersonSingleMarketing")
            }
            paymentLink={
              mode === "online"
                ? "https://buy.stripe.com/test_dRm28sehN9nvaTeaC63ks03"
                : "https://buy.stripe.com/test_4gM00kehNczH5yUfWq3ks05"
            }
            selected={selectedIndividualOffer === "individualSingle"}
            onClick={() => setIndividualSelectedOffer("individualSingle")}
          />

          <PricingCard
            title={
              mode === "online"
                ? t("offers:coachingOnlinePilotTitle")
                : t("offers:coachingInPersonPilotTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:coachingOnlinePilotPrice")}`
                : `${t("offers:coachingInPersonPilotPrice")}`
            }
            description={
              mode === "online"
                ? t("offers:coachingOnlinePilotDesc")
                : t("offers:coachingInPersonPilotDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:coachingOnlinePilotMarketing")
                : t("offers:coachingInPersonPilotMarketing")
            }
            paymentLink={
              mode === "online"
                ? "https://buy.stripe.com/test_28E6oI2z57fnf9u4dI3ks04"
                : "https://buy.stripe.com/test_9B68wQ7Tp2Z78L6h0u3ks06"
            }
            selected={selectedIndividualOffer === "individualPilot"}
            onClick={() => setIndividualSelectedOffer("individualPilot")}
          />

          <PricingCard
            title={
              mode === "online"
                ? t("offers:coachingOnlineMonthlyTitle")
                : t("offers:coachingInPersonMonthlyTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:coachingOnlineMonthlyPrice")}`
                : `${t("offers:coachingInPersonMonthlyPrice")}`
            }
            description={
              mode === "online"
                ? t("offers:coachingOnlineMonthlyDesc")
                : t("offers:coachingInPersonMonthlyDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:coachingOnlineMonthlyMarketing")
                : t("offers:coachingInPersonMonthlyMarketing")
            }
            selected={selectedIndividualOffer === "individualMonthly"}
            onClick={() => setIndividualSelectedOffer("individualMonthly")}
          />
        </div>

        <p id="indterms" className="offerTerms">
          {t("pIndividualTermsSummary")}
        </p>

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
        <div id="coorporate" className="modeToggle">
          <button
            className={`cardbtn ${mode === "online" ? "active" : ""}`}
            onClick={() => setMode("online")}
          >
            {t("lblOnlineCorporate")}
          </button>

          <button
            className={`cardbtn ${mode === "onsite" ? "active" : ""}`}
            onClick={() => setMode("onsite")}
          >
            {t("lblInPersonCorporate")}
          </button>
        </div>

        <div className="pricingGrid">
          <PricingCard
            title={
              mode === "online"
                ? t("offers:corpOnlineSingleTitle")
                : t("offers:corpOnsiteSingleTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:corpOnlineSinglePrice")}`
                : `${t("offers:corpOnsiteSinglePrice")}`
            }
            description={
              mode === "online"
                ? t("offers:corpOnlineSingleDesc")
                : t("offers:corpOnsiteSingleDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:corpOnlineSingleMarketing")
                : t("offers:corpOnsiteSingleMarketing")
            }
            selected={selectedCorporateOffer === "corporateSingle"}
            onClick={() => setCorporateSelectedOffer("corporateSingle")}
          />

          <PricingCard
            title={
              mode === "online"
                ? t("offers:corpOnlinePilotTitle")
                : t("offers:corpOnsitePilotTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:corpOnlinePilotPrice")}`
                : `${t("offers:corpOnsitePilotPrice")}`
            }
            description={
              mode === "online"
                ? t("offers:corpOnlinePilotDesc")
                : t("offers:corpOnsitePilotDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:corpOnlinePilotMarketing")
                : t("offers:corpOnsitePilotMarketing")
            }
            selected={selectedCorporateOffer === "corporatePilot"}
            onClick={() => setCorporateSelectedOffer("corporatePilot")}
          />

          <PricingCard
            title={
              mode === "online"
                ? t("offers:corpOnlineMonthlyTitle")
                : t("offers:corpOnsiteMonthlyTitle")
            }
            price={
              mode === "online"
                ? `${t("offers:corpOnlineMonthlyPrice")}`
                : `${t("offers:corpOnsiteMonthlyPrice")}`
            }
            description={
              mode === "online"
                ? t("offers:corpOnlineMonthlyDesc")
                : t("offers:corpOnsiteMonthlyDesc")
            }
            marketing={
              mode === "online"
                ? t("offers:corpOnlineMonthlyMarketing")
                : t("offers:corpOnsiteMonthlyMarketing")
            }
            selected={selectedCorporateOffer === "corporateMonthly"}
            onClick={() => setCorporateSelectedOffer("corporateMonthly")}
          />
        </div>

        <p id="#workshopterms" className="offerNote">
          {t("pCorporateOfferNote")}
        </p>
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
