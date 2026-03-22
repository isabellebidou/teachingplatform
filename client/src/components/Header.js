import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";
import { fetchCookieValue } from "../actions";

import { AiOutlineLogout, AiOutlineUser, AiOutlineAudio, AiOutlineHome } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineSchool } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import Logo from "./Logo";
import Settings from "./Settings";

function Header({ auth, cookie, fetchCookieValue }) {
  const location = useLocation();
  

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchCookieValue();
  }, [fetchCookieValue]);

  const isAdmin = auth && auth.type === "admin";
  const isGuest = auth && auth.type === "guest";

  const isOnDashboard = location.pathname === "/dashboard";
  const isOnDocuments = location.pathname === "/documents";
  const isHome = location.pathname === "/";
  const isOnBoard = location.pathname === "/board";
  const isOnExercice = location.pathname === "/exercice";

  const language = auth?.language || "en";

  const renderContent = () => (
    <div className="authentication">
      <Settings
  visible={showSettings}
  onClose={() => setShowSettings(false)}
  auth={auth}
/>

      {/* 🌐 Language button */}
      <button
        className="button"
        onClick={() => setShowSettings(true)}
      >
        🌐 {language.toLowerCase()}
      </button>

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

      {!auth && isHome && (
        <a href="/auth/google">
          <img
            src="/btn_google_signin_dark_normal_web.png"
            loading="lazy"
            alt="sign in with google"
          />
        </a>
      )}
    </div>
  );

  return (
    <div className="header">
      <Logo />

      {cookie && <span>{renderContent()}</span>}
      {cookie && <span><MenuButton /></span>}

      {/* ✅ Settings popup */}
      {showSettings && (
        <Settings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

function mapStateToProps({ auth, cookie }) {
  return { auth, cookie };
}

export default connect(mapStateToProps, { fetchCookieValue })(Header);

