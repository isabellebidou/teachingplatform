
import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
//import Payments from "./Payments";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
//import MenuButton from "./MenuButton";
import { fetchCookieValue } from "../actions";
import { AiOutlineLogout } from "react-icons/ai";
//import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";// <BsPencil />
import { AiOutlineAudio } from "react-icons/ai";//<AiOutlineAudio />
import { IoDocumentsOutline } from "react-icons/io5";//<IoDocumentsOutline />
import { MdOutlineSchool } from "react-icons/md";//<MdOutlineSchool />
import { FaUsers } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import $ from 'jquery';




class MobileMenu extends Component {

    navClick() {
        $("#mobilemenu").slideToggle();
    }

    renderMobileMenu() {
    const auth = this.props.auth;
    const isAdmin = auth && this.props.auth.type === 'admin';
    const isGuest = auth && this.props.auth.type === 'guest';
    const isOnDashboard = this.props.location.pathname === '/dashboard';
    const isOnDocuments = this.props.location.pathname === '/documents';
    const isHome = this.props.location.pathname === '/';
    const isOnBoard = this.props.location.pathname === '/board';
    const isOnExercice = this.props.location.pathname === '/exercice';

        return (
            <ul id="mobilemenuul">
                {!auth && isHome &&
                    <a key={`${6}gg`} href="/auth/google"><img src="/btn_google_signin_dark_normal_web.png" alt="sign in with google" /></a>
                }
                {(auth && isAdmin) &&
                    <li><Link key={`6users`} to="/users" className="mobilemenuli button" >
                        <FaUsers
                            style={{ color: "#7f5f87" }}
                            key={'FaUsers'}
                        />
                    </Link></li>}
                {auth && !isOnDashboard && !isGuest &&//ok
                    <li><Link key={`${6}dashboard`} to="/dashboard" className="mobilemenuli button" >
                        <AiOutlineAudio
                            style={{ color: "#7f5f87" }}
                            key={'FaUsers'}
                        />
                    </Link></li>}
                {auth && !isOnDocuments && !isGuest &&//
                    <li><Link key={`${2}docs`} to="/documents" className="mobilemenuli button" >
                        <IoDocumentsOutline
                            style={{ color: "#7f5f87" }}
                            key={'IoDocumentsOutline'}
                        />
                    </Link></li>}
                {!isHome &&
                    <li><Link key={`${3}home`}
                        to={'/'}
                        className="mobilemenuli button"
                    >
                        <AiOutlineHome
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineHome'}
                        />
                    </Link></li>}

                {auth && isOnBoard === false && isGuest === false &&
                    <li>
                        <Link key={`${9}board`} to="/board" className="mobilemenuli button" >
                        <BsPencil
                            style={{ color: "#7f5f87" }}
                            key={'FaUBsPencils'}

                        /></Link></li>  
                    }

                 {auth && !isOnExercice  && !isGuest &&
                    <li>
                        <Link key={8+`exercice`} className="mobilemenuli button" to="/exercice"><MdOutlineSchool
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineAudio'}
                        /></Link>

                    </li>}
                {auth &&
                    <li>
                        <a key={5+`4logout`} className="mobilemenuli button" href="/api/logout"><AiOutlineLogout
                            style={{ color: "#7f5f87" }}
                            key={'AiOutlineLogout'}
                        /></a>
                    </li>}

                {/*<li><Link key={3 + '/parasitedetox'}
                    to={'/parasitedetox'}
                    className="mobilemenuli button"
                >
                    link1
                </Link></li>*/}
                
            </ul>
        )
    }

    render() {
        return (
            <div>
                <div data-role="navbar" id="mobilemenu" onClick={this.navClick}>

                    {this.renderMobileMenu()}

                </div>
            </div>
        );
    }

}
function mapStateToProps({ auth, userdata }) {
    return { auth, userdata };
}

export default withRouter(connect(mapStateToProps)(MobileMenu));

