import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Nav.scss";

class Nav extends Component {
 
    render() { 
        return ( 
            <div>
                <nav>
                    <div>
                        <img src="" alt="logo"/>
                    </div>
                    <div className="nav-links">
                        <Link to="/home"><p>Home</p></Link>
                        <Link to="/profile"><p>Profile</p></Link>
                        <Link to="/matches"><p>Matches</p></Link>
                    </div>
                    <div className="nav-photo-div">
                        <img src="https://via.placeholder.com/150" alt="user photo"/>
                    </div>
                </nav>
            </div>
         );
    }
}
 
export default Nav;