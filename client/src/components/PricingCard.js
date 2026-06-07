import { useState } from "react"

function PricingCard({
  title,
  price,
  description,
  clientEmail,
  paymentLink,
  selected,
  onClick,
}) {
  return (
    <>
      <div
        className={` pricingCard ${selected ? "selected" : ""}`}
        onClick={onClick}
      >
        <h3 className="pricingCardTitle">{title}</h3>

        <span className="pricingCardPrice"> {price}</span>
      </div>
    </>
  )
}
export default PricingCard
