import React, {Component} from 'react';
import "./Home.scss";
import Search from "./Search";
import {connect} from 'react-redux';
import {getProfile} from '../../redux/reducer';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

        //bumps back to login after edits /no user info
    componentDidMount(){
        axios.get('/auth/checkuser')
            .then()
            .catch( () => this.props.history.push('/'));

        this.getProfileInfo();
    }

    getProfileInfo = () => {
        axios.get(`/api/profile`)
        .then(res => {
            this.props.getProfile(res.data);
        })
    }

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

export default connect(mapStateToProps, {getProfile})(Home);
