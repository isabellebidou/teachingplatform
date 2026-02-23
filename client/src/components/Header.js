import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import Payments from "./Payments";
import { withRouter } from 'react-router-dom';
import MenuButton from "./MenuButton";
import { fetchCookieValue } from "../actions";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";// <BsPencil />
import { AiOutlineAudio } from "react-icons/ai";//<AiOutlineAudio />
import { FaUsers } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "./Logo";

// <a href="/"><img className="logo" src="/seagul.png" alt="logo" loading="eager" title="iridology by isabelle logo"></img></a>
class Header extends Component {

  componentDidMount() {
    this.props.fetchCookieValue();

  }


  renderContent() {

    const isAdmin = this.props.auth && this.props.auth.type === 'admin';
    const isGuest = this.props.auth && this.props.auth.type === 'guest';
    const isOnDashboard = this.props.location.pathname === '/dashboard';
    const isHome = this.props.location.pathname === '/';
    const isOnBoard = this.props.location.pathname === '/board';


    return (

      <div className="authentication">
        
        <Link key={4 + '/shop'}
          to={'/shop'}
          className="button"
        >
          link2
        </Link>
        <Link key={3 + '/parasitedetox'}
          to={'/parasitedetox'}
          className="button"
        >
          link3
        </Link>
        <Link key={3 + '/adrenalfatigue'}
          to={'/adrenalfatigue'}
          className="button"
        >
          link4
        </Link>
        {isAdmin && (
          <a key={9} className="button" href="/users"><FaUsers
            style={{ color: "#7f5f87" }}
            key={'FaUsers'}

          />

          </a>
        )}



        {(this.props.auth && isOnDashboard === false && isGuest === false) &&
          <Link key={3+"dashboard"}
            to={'/dashboard'}
            className="button"
          >
            <AiOutlineAudio
              style={{ color: "#7f5f87" }}
              key={'AiOutlineAudio'}
            />
          </Link>}
        {(this.props.auth && isOnBoard === false && isGuest === false) &&
          <Link key={3+ 'board'}
            to={'/board'}
            className="button"
          >
            <BsPencil
              style={{ color: "#7f5f87" }}
              key={'BsPencilkey'}
            />
          </Link>}
        {isHome === false &&
          <Link key={3 + 'nothome'}
            to={'/'}
            className="button"
          >
            <AiOutlineHome
              style={{ color: "#7f5f87" }}
              key={'AiOutlineHome'}
            />
          </Link>}
        {(this.props.auth ) &&
          <a key={4+ "logout"} className="button" href="/api/logout"><AiOutlineLogout
            style={{ color: "#7f5f87" }}
            key={'AiOutlineLogoutkey'}
          /></a>}
        {(!this.props.auth && isHome) &&
          <a href="/auth/google"><img src="/btn_google_signin_dark_normal_web.png" loading="lazy" title="sign in with google" alt="sign in with google" /></a>
        }
      </div>

    );


  }
  render() {
    const { cookie } = this.props;

    return (
      <div className="header">
        
       <Logo />

        {cookie === true && <span>{this.renderContent()}</span>}
        {cookie === true && <span><MenuButton /></span>}
      </div>

    );
  }
}
function mapStateToProps({ auth, cookie }) {
  return { auth, cookie }
};
export default withRouter(connect(mapStateToProps, { fetchCookieValue })(Header));

