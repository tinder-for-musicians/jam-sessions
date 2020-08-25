import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import "./Nav.scss";
import axios from 'axios';
import {connect} from 'react-redux';
import logo from "./jam-session-logo.png"
import {getProfile, clearUser} from '../../redux/reducer';
import "../../App.scss";
import { Button} from 'semantic-ui-react'

const Nav = (props) => {

    const [isHidden, setHidden] = useState(true);

    const handleLogout = () => {
        axios.get('/auth/logout')
        .then(() => {
            this.props.clearUser();
            this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
 
 
    return ( 
        <div>
            <nav id="navbar">
                <div id="logo-div">
                    <img src={logo} alt="logo"/>
                    <div className="nav-links">
                        <Link to="/dash"><p className="nav-ps">Home</p></Link>
                        <Link to="/profile"><p className="nav-ps">Profile</p></Link>
                        <Link to="/matches"><p className="nav-ps">Matches</p></Link>
                    </div>
                </div>

                
                <div className="nav-btn-div"><Button className="nav-btn" onClick={handleLogout}>Logout</Button></div>
                <div className="nav-photo-div">
                    <img src={props.profile.profile_pic} alt="user face"/>
                </div>
            </nav>
        </div>
        );
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getProfile, clearUser})(Nav);