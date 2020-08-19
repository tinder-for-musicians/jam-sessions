import React, {Component} from 'react';
import "./Home.scss";
import Search from "./Search";
import {connect} from 'react-redux';

class Home extends Component {

    render() { 
        return ( 
            <div className="home-wrapper">
                <div className="home-wrapper2">
                    <div>
                        <Search />
                    </div>
                    <div>
                        <section>
                            Musician Profile
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Home);
