import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Nav.scss";
import axios from 'axios';
import { connect } from 'react-redux';
import logo from "./jam-session-logo.png";
import { Icon } from 'semantic-ui-react';
import { getProfile, clearUser } from '../../redux/reducer';

const Nav = (props) => {

    const [hidden, setHidden] = useState(true)

    const toggleDropdown = () => {
        setHidden(!hidden)
    }

    const handleLogout = () => {
        axios.get('/auth/logout')
            .then(() => {
                this.props.clearUser();
                this.props.history.push("/");
            })
            .catch(err => console.log(err));
    }


    return (
        <div id='nav-wrapper'>
            <nav id="navbar">
                <div id="logo-div"
                    className='header-container'>
                    <img src={logo} alt="logo" />
                    <div className='desktop-nav'>
                        <div className="nav-links">
                            <Link to="/dash"><p>Home</p></Link>
                            <Link to="/profile"><p>Profile</p></Link>
                            <Link to="/matches"><p>Matches</p></Link>
                        </div>
                        <div className="nav-btn-div"><button className="nav-btn" onClick={handleLogout}>Logout</button></div>
                    </div>
                    <div className="nav-photo-div">
                        <img src={props.profile.profile_pic} alt="user face" />
                    </div>
                </div>
                <div className='dropdown' onClick={toggleDropdown}>
                    <Icon
                        onClick={toggleDropdown}
                        name='sidebar'
                        size='small'
                        color='black'></Icon>
                </div>
                {hidden
                    ? (
                        <div className='parent-menu'>
                            <div className='mobile-menu'>
                                <ul>
                                    <div className="nav-links">
                                        <Link to="/dash"><p>Home</p></Link>
                                        <Link to="/profile"><p>Profile</p></Link>
                                        <Link to="/matches"><p>Matches</p></Link>
                                    </div>
                                    <div className="nav-btn-div"><button className="nav-btn" onClick={handleLogout}>Logout</button></div>
                                </ul>
                            </div>
                        </div>
                    )
                    : null}


                {/* <div className="nav-btn-div"><button className="nav-btn" onClick={handleLogout}>Logout</button></div>
                    <div className="nav-photo-div">
                        <img src={props.profile.profile_pic} alt="user face"/>
                    </div> */}
            </nav>
        </div>
    );

}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { getProfile, clearUser })(Nav);