import React, { Component } from 'react';
import "./Home.scss";
import Search from "./Search";
import { connect } from 'react-redux';
import { getProfile } from '../../redux/reducer';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            search: '',
            filteredInstruments: []

        }
    }

    //bumps back to login after edits /no user info
    componentDidMount() {
        axios.get('/auth/checkuser')
            .then()
            .catch(() => this.props.history.push('/'));

        this.getProfileInfo();

        this.getInstruments();
    }

    getProfileInfo = () => {
        axios.get(`/api/profile`)
            .then(res => {
                this.props.getProfile(res.data);
            })
    }

    handleSearch = (e) => {
        let keyword = e.target.value;
        this.setState({ search: keyword })
    };

    handleReset = () =>{
        this.setState({search: ''})
        this.setState({filteredInstruments: []})
      };

    getInstruments = () => {

        axios.get('api/instruments')
            .then(res => this.setState({ instruments: res.data.user_instruments[0] }))
            // console.log(this.state.instruments)
            .catch(err => console.log(err))
    }

    render() {
        // console.log(Stocks)
        // console.log(this.state.symbols)
        let filteredByInstruments = this.state.instruments.filter((data) => {
            if (this.state.search == '')
                return false
            else if (data.toLowerCase().includes(this.state.search.toLowerCase())) {
                return true
            }
            else return false
        }).map((data) => {
            return (
                <div>
                    <span
                        onClick={() => {
                            this.handleClick(data);
                            ToastsStore.success("Added to Your Instruments")
                        }}
                        className='tooltip'>
                        <ToastsContainer store={ToastsStore} />

                        {data}
                    </span>

                </div>

            )
        })

        return (
            <div className=
                'home-body'>
                <p className='intro'> Search Profiles by Instrument</p>
                <section className='searchcontainer'>
                    <input
                        type='text'
                        className='searchinput'
                        placeholder='search here... click to add'
                        // onChange={(e) => this.handleSearch(e)}  
                        //uncomment ^ to search as user types 
                    />
                    <button onClick={(e) => this.handleSearch(e)}
                        className='srchbtn'>Search</button>
                    <button
                        onClick={this.handleReset}
                        className='resetbtn'>Reset</button>

                </section>

                <section className='dashboard-profile-view'>
                    {filteredByInstruments}
                </section>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getProfile })(Home);
