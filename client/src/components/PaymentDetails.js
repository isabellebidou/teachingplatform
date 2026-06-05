

import { OFFERS } from "../locales/offers"

function PaymentDetails({ visible, onClose, title, price }) {
  const reference = Object.values(OFFERS).find(
    (offer) => offer.fr.title === title || offer.en.title === title,
  )?.reference

  if (!visible) return null

  return (
    <div className="pd-overlay">
      <div className="contentPd">
        <div className="pdScroll">
          <div className="bankTransferBox">
            <span className="close-btn" onClick={onClose}>
              ×
            </span>
            <h2>Bank Transfer</h2>

            <p>
              <strong>Account Holder:</strong>
              <br />
              <strong className="readable">Isabelle Bidou</strong>
              <button
                className="pdBtn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText("Isabelle Bidou")
                }}
              >
                Copy Account Holder
              </button>
            </p>

            <p>
              <strong>IBAN: </strong>
              <br />
              <strong className="readable">
                FR76 1660 7000 0800 8194 9706 632
              </strong>
              <button
                className="pdBtn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(
                    "FR76 1660 7000 0800 8194 9706 632 ",
                  )
                }}
              >
                Copy IBAN
              </button>
            </p>

            <p>
              <strong>BIC: </strong>
              <br />
              <strong className="readable">CCBPFRPPPPG</strong>
              <button
                className="pdBtn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText("CCBPFRPPPPG")
                }}
              >
                Copy BIC
              </button>
            </p>

            <p>
              <strong>Amount in Euros:</strong>
              <br />
              <strong className="readable">{price}</strong>
              <button
                className="pdBtn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(price)
                }}
              >
                Copy Price
              </button>
            </p>
            <p>
              <strong>Reference:</strong>
              <br />
              <strong className="readable">{reference}</strong>
              <button
                className="pdBtn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(reference)
                }}
              >
                Copy reference
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
