import { useEffect, useRef, useState } from "react"
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
//import { landingOffers } from "../locales/landingOffers"
import PaymentDetails from "./PaymentDetails"
import { OFFERS } from "../locales/landingOffers"

const Landing = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(["landing", "offers"])

  const auth = useSelector((state) => state.auth)
  const browserLocale = navigator.language || navigator.userLanguage
  //const code = browserLocale.split("-")[0]
  //const language =
  // auth?.language || navigator.language || navigator.userLanguage
  const cookie = useSelector((state) => state.cookie)
  const [visibility, setVisibility] = useState("visible")
  const stripe = false

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
  /*
  const toggleVisibility = () => {
    setVisibility(visibility === "visible" ? "hidden" : "visible")
    const signin = document.getElementById("signin")
    if (signin) {
      signin.style.visibility =
        signin.style.visibility === "visible" ? "hidden" : "visible"
    }
  }*/
  const renderFaqForm = () => {
    if (auth && auth.type === "admin") return <FaqForm />
    return null
  }

  // Browser locale for Legal Notice

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
  const firstRender = useRef(true)

  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [trainingType, setTrainingType] = useState("individual")
  const [mode, setMode] = useState("online")
  //const [selectedOffer, setSelectedOffer] = useState("pilot")
  const [selectedOfferCode, setSelectedOfferCode] = useState("O_COACHING_PILOT")

  const currentOffer = OFFERS.find((o) => o.code === selectedOfferCode)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setSelectedOfferCode(null)
  }, [trainingType, mode])
  const visibleOffers = OFFERS.filter(
    (o) => o.category === trainingType && o.delivery === mode,
  )

  return (
    <div className="page">
      {auth && !auth.hasConsultation && (
        <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
          <button className="actionbook">{t("btnActionbook")}</button>
        </a>
      )}
      {/* Training{!auth && visibility === "visible" && (
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
      )}*/}

      <fieldset>
        <legend>
          <h2>{t("h2OffersLegend")}</h2>
        </legend>

        <p className="itemp">{t("H2OffersIntro")}</p>

        {/* Training type */}
        <div className="toggles center">
          <div className="toggleContainer">
            <button
              className={
                trainingType === "individual" ? "toggle active" : "toggle"
              }
              onClick={() => setTrainingType("individual")}
            >
              {t("lblIndividualCoaching")}
            </button>

            <button
              className={
                trainingType === "corporate" ? "toggle active" : "toggle"
              }
              onClick={() => setTrainingType("corporate")}
            >
              {t("lblCorporateWorkshops")}
            </button>
          </div>

          {/* Delivery mode */}

          <div className="toggleContainer">
            <button
              className={mode === "online" ? "toggle active" : "toggle"}
              onClick={() => setMode("online")}
            >
              {t("lblOnline")}
            </button>

            <button
              className={mode === "onsite" ? "toggle active" : "toggle"}
              onClick={() => setMode("onsite")}
            >
              {trainingType === "individual"
                ? t("lblInPerson")
                : t("lblOnSite")}
            </button>
          </div>
        </div>

        {/* Pricing cards */}

        <div className="pricingGrid">
          {visibleOffers.map((offer) => (
            <PricingCard
              key={offer.code}
              title={auth?.language === "fr" ? offer.titleFr : offer.titleEn}
              price={`€${offer.price}`}
              description={offer.description}
              selected={selectedOfferCode === offer.code}
              onClick={() => setSelectedOfferCode(offer.code)}
              paymentLink={offer.paymentLink}
            />
          ))}
        </div>

        {/* Selected offer */}
        <div className="selectedOfferGlobal">
          <div className="selectedOffer center">
            {currentOffer && (
              <>
                <div className="selectedOfferChildren">
                  {auth?.language === "fr"
                    ? currentOffer.titleFr
                    : currentOffer.titleEn}
                </div>

                <div className=" selectedOfferChildren">
                  {" "}
                  - {currentOffer.description}{" "}
                </div>

                <div className="selectedOfferChildren ">
                  €{currentOffer.price}
                </div>
              </>
            )}
          </div>
          <span
            className={
              stripe && auth
                ? "paymentContainerDouble"
                : "paymentContainerSingle"
            }
          >
            {currentOffer && (
              <>
                <p className=" itemp">
                  <button
                    className="payment"
                    onClick={() => setShowPaymentDetails(true)}
                    disabled={!auth}
                  >
                    Bank transfer
                  </button>
                </p>
              </>
            )}

            {stripe && auth && currentOffer?.paymentLink && (
              <p className=" itemp">
                <a
                  href={currentOffer.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="payment actionupload"
                  onClick={(e) => e.stopPropagation()}
                  disabled={!auth}
                >
                  Stripe
                </a>
              </p>
            )}
          </span>
          {!auth && (
            <span className="smallWarning">{t("divLoginToAccessPayment")}</span>
          )}
        </div>

        <p className="itemp">{t("pOfferBook")}</p>

        <a href="https://calendar.app.google/znY72K9W2gZQohNw5">
          <button className="actionbook2">{t("btnActionbook")}</button>
        </a>
      </fieldset>

      <fieldset>
        <legend>
          <h2>{t("h2Features")}</h2>
        </legend>
        <p className="itemp">{t("pFeatures")}</p>
        <h2>{t("h2AudioFeedback")}</h2>
        <p className="itemp">{t("pAudioFeedback")}</p>

        <h2>{t("h2GrammarPractice")}</h2>
        <p className="itemp">{t("pGrammarPractice")}</p>
        {false && (
          <>
            <h2>{t("h2SpellingFeedback")}</h2>
            <p className="itemp">{t("pSpellingFeedback")}</p>
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
        <StarReview />
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
          <h2>{t("h2terms")}</h2>
        </legend>

        <p id="indterms" className="offerTerms itemp">
          {t("pIndividualTermsSummary")}
        </p>

        <p className="offerNote itemp">{t("pIndividualOfferNote")}</p>
      </fieldset>
      <fieldset>
        <legend>
          <h2>{t("h2Contact")}</h2>
        </legend>

        <div id="contact" className="bottomItem">
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
      {showPaymentDetails && currentOffer && (
        <PaymentDetails
          visible={showPaymentDetails}
          onClose={() => setShowPaymentDetails(false)}
          title={
            auth?.language === "fr"
              ? currentOffer.titleFr
              : currentOffer.titleEn
          }
          price={currentOffer.price}
        />
      )}
      {showPaymentDetails && (
        <PaymentDetails onClose={() => setShowPaymentDetails(false)} />
      )}

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
    </div>
  )
}

export default Landing
