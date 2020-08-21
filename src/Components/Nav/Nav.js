import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Nav.scss";
import axios from 'axios';
import {connect} from 'react-redux';
import {getProfile} from '../../redux/reducer';

class Nav extends Component {

    handleLogout = () => {
        axios.get('/auth/logout')
        .then(() => {
            this.props.clearUser();
            this.props.history.push("/");
        })
        .catch(err => console.log(err));
    }
 
    render() { 
        return ( 
            <div>
                <nav id="navbar">
                    <div id="logo-div">
                        <img src="https://via.placeholder.com/150" alt="logo"/>
                        <div className="nav-links">
                            <Link to="/dash"><p>Home</p></Link>
                            <Link to="/profile"><p>Profile</p></Link>
                            <Link to="/matches"><p>Matches</p></Link>
                        </div>
                    </div>

                    
                    <div className="nav-btn-div"><button className="nav-btn" onClick={this.handleLogout}>Logout</button></div>
                    <div className="nav-photo-div">
                        <img src={this.props.profile.profile_pic} alt="user face"/>
                    </div>
                </nav>
            </div>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getProfile})(Nav);