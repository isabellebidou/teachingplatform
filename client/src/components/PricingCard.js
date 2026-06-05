import { useState } from "react"
import PaymentDetails from "./PaymentDetails"

function PricingCard({
  title,
  price,
  description,
  clientEmail,
  paymentLink,
  selected,
  onClick,
}) {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const stripe = false
  return (
    <>
      <div
        className={`pricingCard ${selected ? "selected" : ""}`}
        onClick={onClick}
      >
        <h3>{title}</h3>

        <div className="pricingCardPrice"> € {price}</div>

        <p>{description}</p>
        {stripe && paymentLink && selected && (
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="payButton"
            onClick={(e) => e.stopPropagation()}
          >
            Pay with Stripe
          </a>
        )}
        {selected && (
          <button
            id="showPaymentDetails"
            className="button"
            onClick={() => setShowPaymentDetails(true)}
          >
            Bank transfer
          </button>
        )}
      </div>
      <PaymentDetails
        visible={showPaymentDetails}
        onClose={() => setShowPaymentDetails(false)}
        title={title}
        price={price}
      />
      {showPaymentDetails && (
        <PaymentDetails onClose={() => setShowPaymentDetails(false)} />
      )}
    </>
  )
}
export default PricingCard
