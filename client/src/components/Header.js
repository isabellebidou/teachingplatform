import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import MenuButton from "./MenuButton"
//https://react-icons.github.io/react-icons/search/
import { fetchCookieValue } from "../actions"

import { AiOutlineLogout, AiOutlineAudio, AiOutlineHome } from "react-icons/ai"
import { BsPencil } from "react-icons/bs"
import { MdHeadphones } from "react-icons/md"
import { IoDocumentsOutline } from "react-icons/io5"
import { MdOutlineSchool } from "react-icons/md"
import { FaUsers } from "react-icons/fa"
import { FaBookOpen } from "react-icons/fa6"

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
      visible: auth && !isGuest,
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


  const browserLocale = navigator.language || navigator.userLanguage
  const code = browserLocale.split("-")[0]
  const language =
    auth?.language || code || navigator.language || navigator.userLanguage

  useEffect(() => {
    if (isGuest) {
      setShowApproval(true)
    }
  }, [isGuest])

  const renderContent = () => (
    <>
      <h2 className="headertitle"> Izzy Speak English</h2>

      <div className="authentication">
        {/* 🌐 Language button */}
        {auth && (
          <button
            id="languagebtn"
            className="button"
            onClick={() => setShowSettings(true)}
          >
            🌐 {language.toLowerCase()}
          </button>
        )}
        {navItems
          .filter((item) => item.visible)
          .map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`button ${isActive ? "onPath" : ""}`}
              >
                <Icon />
              </Link>
            )
          })}
        {auth && (
          <a className="button" href="/api/logout">
            <AiOutlineLogout style={{ color: "#7f5f87" }} />
          </a>
        )}
        {!auth && (
          <a href="/auth/google">
            <img
              src="/btn_google_signin_dark_normal_web.png"
              loading="lazy"
              alt="sign in with google"
            />
          </a>
        )}
      </div>
    </>
  )

  return (
    <div className="header">
      <Logo />

      {<span>{renderContent()}</span>}

      <span>
        <MenuButton />
      </span>

      <Settings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        auth={auth}
      />
      {/* ✅ pending approval popup */}

      {showApproval && <Approval onClose={() => setShowApproval(false)} />}

      {/* ✅ Settings popup */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default Header
