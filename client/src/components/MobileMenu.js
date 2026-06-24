import { useSelector } from "react-redux"

//import Payments from "./Payments";
import { Link } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"
//import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs" // <BsPencil />
import { MdHeadphones } from "react-icons/md";
import { AiOutlineAudio } from "react-icons/ai" //<AiOutlineAudio />
import { IoDocumentsOutline } from "react-icons/io5" //<IoDocumentsOutline />
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
    
      const navItems = [
       {
      path: "/",
      icon: AiOutlineHome,
      visible: true,
    },
    {
      path: "/topics",
      icon: FaBookOpen,
      visible: true,
    },
    {
      path: "/users",
      icon: FaUsers,
      visible: isAdmin,
    },
    {
      path: "/documents",
      icon: IoDocumentsOutline,
      visible: auth && isAdmin,
    },
    {
      path: "/dashboard",
      icon: AiOutlineAudio,
      visible: auth,
    },
    {
      path: "/board",
      icon: BsPencil,
      visible: auth && !isGuest,
    },
 
    {
      path: "/stress",
      icon: MdHeadphones,
      visible: true,
    },

  ]

    return (
      <ul id="mobilemenuul">
        {!auth && (
          <a key={`${6}gg`} href="/auth/google">
            <img
              src="/btn_google_signin_dark_normal_web.png"
              alt="sign in with google"
            />
          </a>
        )}
{navItems
          .filter((item) => item.visible)
          .map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li  className="mobilemenuli button">
              <Link
                key={item.path}
                to={item.path}
                className={`button ${isActive ? "onPathBtnMenuMobile" : "btnMenuMobile"}`}
              >
                <Icon />
              </Link>
              </li>
            )
          })}
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
