import { useSelector } from "react-redux"

//import Payments from "./Payments";
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { fetchCookieValue } from "../actions"
import { AiOutlineLogout } from "react-icons/ai"
//import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs" // <BsPencil />
import { MdHeadphones } from "react-icons/md";
import { AiOutlineAudio } from "react-icons/ai" //<AiOutlineAudio />
import { IoDocumentsOutline } from "react-icons/io5" //<IoDocumentsOutline />
import { MdOutlineSchool } from "react-icons/md" //<MdOutlineSchool />
import { FaUsers } from "react-icons/fa"
import { AiOutlineHome } from "react-icons/ai"
import { FaBookOpen } from "react-icons/fa6"
import { useLocation } from "react-router-dom"
import $ from "jquery"

function MobileMenu() {
  const auth = useSelector((state) => state.auth)
  const navClick = () => {
    $("#mobilemenu").slideToggle()
  }
  const location = useLocation()
  const renderMobileMenu = () => {
    const isAdmin = auth && auth.type === "admin"
    const isGuest = auth && auth.type === "guest"
    const isOnDashboard = location.pathname === "/dashboard"
    const isOnDocuments = location.pathname === "/documents"
    const isOnStress = location.pathname === "/stress"
    const isHome = location.pathname === "/"
    const isOnBoard = location.pathname === "/board"
    const isOnExercice = location.pathname === "/exercice"
    const isOnTopics = location.pathname === "/topics"

    return (
      <ul id="mobilemenuul">
        {!auth && isHome && (
          <a key={`${6}gg`} href="/auth/google">
            <img
              src="/btn_google_signin_dark_normal_web.png"
              alt="sign in with google"
            />
          </a>
        )}
        {auth && isAdmin && (
          <li>
            <Link key={`6users`} to="/users" className="mobilemenuli button">
              <FaUsers style={{ color: "#7f5f87" }} key={"FaUsers"} />
            </Link>
          </li>
        )}
        {auth &&
          !isOnDashboard &&
          !isGuest && ( //ok
            <li>
              <Link
                key={`${6}dashboard`}
                to="/dashboard"
                className="mobilemenuli button"
              >
                <AiOutlineAudio style={{ color: "#7f5f87" }} key={"FaUsers"} />
              </Link>
            </li>
          )}
        {auth &&
          !isOnDocuments &&
          !isGuest && ( //
            <li>
              <Link
                key={`${2}docs`}
                to="/documents"
                className="mobilemenuli button"
              >
                <IoDocumentsOutline
                  style={{ color: "#7f5f87" }}
                  key={"IoDocumentsOutline"}
                />
              </Link>
            </li>
          )}
        {!isHome && (
          <li>
            <Link key={`${3}home`} to={"/"} className="mobilemenuli button">
              <AiOutlineHome
                style={{ color: "#7f5f87" }}
                key={"AiOutlineHome"}
              />
            </Link>
          </li>
        )}

        {auth && isOnBoard === false && isGuest === false && (
          <li>
            <Link key={`${9}board`} to="/board" className="mobilemenuli button">
              <BsPencil style={{ color: "#7f5f87" }} key={"FaUBsPencils"} />
            </Link>
          </li>
        )}

        {auth && !isOnExercice && !isGuest && (
          <li>
            <Link
              key={8 + `exercice`}
              className="mobilemenuli button"
              to="/exercice"
            >
              <MdOutlineSchool
                style={{ color: "#7f5f87" }}
                key={"AiOutlineAudio"}
              />
            </Link>
          </li>
        )}
        {!isOnStress && (
          <li>
            <Link key={`6stress`} to="/stress" className="mobilemenuli button">
              <MdHeadphones style={{ color: "#7f5f87" }} key={"MdHeadphones"} />
            </Link>
          </li>
        )}
        {!isOnTopics && (
          <li>
            <Link key={`3topics`} to="/topics" className="mobilemenuli button">
              <FaBookOpen style={{ color: "#7f5f87" }} key={"FaBookOpen"} />
            </Link>
          </li>
        )}
        {auth && (
          <li>
            <a
              key={5 + `4logout`}
              className="mobilemenuli button"
              href="/api/logout"
            >
              <AiOutlineLogout
                style={{ color: "#7f5f87" }}
                key={"AiOutlineLogout"}
              />
            </a>
          </li>
        )}

        {/*<li><Link key={3 + '/parasitedetox'}
                    to={'/parasitedetox'}
                    className="mobilemenuli button"
                >
                    link1
                </Link></li>*/}
      </ul>
    )
  }

  return (
    <div>
      <div data-role="navbar" id="mobilemenu" onClick={navClick}>
        {renderMobileMenu()}
      </div>
    </div>
  )
}

export default MobileMenu
