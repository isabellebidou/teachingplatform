
import { connect } from "react-redux";



function Approval({onClose}) {
  const browserLocale = navigator.language || navigator.userLanguage;
  const countryCode = browserLocale.split("-")[1];


  return (
    <div className="settings-overlay">
      <div className="content">

         {(countryCode === "FR" || countryCode === "fr") && (
          <span >
            Profil en attente de d'approbation.
            
          </span>
        )} 
        { (countryCode !== "FR" || countryCode !== "fr") &&
          <span >
            Profile awaiting Approval.
          </span>

        }
        <button id= "approvalPendingButton" className="close-btn" onClick={onClose}>
          x
        </button>
      

        </div>
    </div>
  );
}

export default connect(null)(Approval);