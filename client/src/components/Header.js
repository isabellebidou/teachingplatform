import  { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import MenuButton from "./MenuButton"
import { fetchCookieValue } from "../actions"

import { AiOutlineLogout, AiOutlineAudio, AiOutlineHome } from "react-icons/ai"
import { BsPencil } from "react-icons/bs"
import { IoDocumentsOutline } from "react-icons/io5"
import { MdOutlineSchool } from "react-icons/md"
import { FaUsers } from "react-icons/fa"

import Logo from "./Logo"
import Settings from "./Settings"
import Approval from "./Approval"

function Header() {
  const location = useLocation()
  const [showSettings, setShowSettings] = useState(false)
  const [showApproval, setShowApproval] = useState(false)
  const auth = useSelector((state) => state.auth)
  //const cookie = useSelector((state) => state.cookie)

  useEffect(() => {
    fetchCookieValue()
  }, [fetchCookieValue])

  const isAdmin = auth && auth.type === "admin"
  const isGuest = auth && auth.type === "guest"

  const isOnDashboard = location.pathname === "/dashboard"
  const isOnDocuments = location.pathname === "/documents"
  const isHome = location.pathname === "/"
  const isOnBoard = location.pathname === "/board"
  const isOnExercice = location.pathname === "/exercice"

  const language = auth?.language || "en"

    useEffect(() => {
  if (isGuest) {
    setShowApproval(true);
  }
}, [isGuest]);


  const renderContent = () => (
    <div className="authentication">
      <Settings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        auth={auth}
      />


      {!auth && (
        <a href="/auth/google">
          <img
            src="/btn_google_signin_dark_normal_web.png"
            loading="lazy"
            alt="sign in with google"
          />
        </a>
      )}
      {/* 🌐 Language button */}
      {auth && (
        <button className="button" onClick={() => setShowSettings(true)}>
          🌐 {language.toLowerCase()}
        </button>
      )}
      {isAdmin && (
        <a className="button" href="/users">
          <FaUsers style={{ color: "#7f5f87" }} />
        </a>
      )}

      {auth && !isOnDocuments && isAdmin && (
        <Link to="/documents" className="button">
          <IoDocumentsOutline style={{ color: "#7f5f87" }} />
        </Link>
      )}

      {auth && !isOnDashboard && !isGuest && (
        <Link to="/dashboard" className="button">
          <AiOutlineAudio style={{ color: "#7f5f87" }} />
        </Link>
      )}

      {auth && !isOnBoard && !isGuest && (
        <Link to="/board" className="button">
          <BsPencil style={{ color: "#7f5f87" }} />
        </Link>
      )}

      {auth && !isOnExercice && !isGuest && (
        <Link to="/exercice" className="button">
          <MdOutlineSchool style={{ color: "#7f5f87" }} />
        </Link>
      )}

      {!isHome && (
        <Link to="/" className="button">
          <AiOutlineHome style={{ color: "#7f5f87" }} />
        </Link>
      )}

      {auth && (
        <a className="button" href="/api/logout">
          <AiOutlineLogout style={{ color: "#7f5f87" }} />
        </a>
      )}
    </div>
  )

  return (
    <div className="header">
      <Logo />

      {<span>{renderContent()}</span>}
      
        <span>
          <MenuButton />
        </span>
      
      {/* ✅ pending approval popup */}

      {showApproval && <Approval onClose={() => setShowApproval(false)} />}

      {/* ✅ Settings popup */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default Header
