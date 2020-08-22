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
            level: ['hobbyist', 'beginner', 'intermediate', 'advanced'],
            yearsExp: [1, 3, 5, 10],
            location: [5, 10, 20],
            search: '',
            filteredInstruments: [],
            dropdownView1: false,
            dropdownView2: false,
            dropdownView3: false,
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

    toggleDropdown1 = () => {
        this.setState({dropdownView1: !this.state.dropdownView1})
    }
    toggleDropdown2 = () => {
        this.setState({dropdownView2: !this.state.dropdownView2})
    }
    toggleDropdown3 = () => {
        this.setState({dropdownView3: !this.state.dropdownView3})
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

    // handleClick = (match) => {
    //     axios.post('/api/match')
    // }

    handleReset = () =>{
        this.setState({search: ''})
        this.setState({filteredInstruments: []})
        this.setState({yearsExp: []})
        this.setState({level: []})
        this.setState({location: []})
      };

    getInstruments = () => {
        axios.get('api/search')
            .then(res => this.setState({ instruments: res.data.user_instruments[0], level: res.data.user_instruments[1], yearsExp: res.data.user_instruments[2]
             }))
            // console.log(this.state.instruments)
            .catch(err => console.log(err))
    }

    render() {
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
                            ToastsStore.success("Matched!")
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
                <p className='intro'> Search Profiles by Instrument, Skill Level, Years of Experience and Location</p>
                <section className='searchcontainer'>
                    <input
                        type='text'
                        className='searchinput'
                        placeholder='Search by instrument'
                        // onChange={(e) => this.handleSearch(e)}  
                        //uncomment ^ to search as user types 
                    />
                    <div className = 'dropdown1' onClick = {this.toggleDropdown1}>Skill Level</div>
                    {this.state.dropdownView1 ? (
                        <nav>
                            <ul>
                            {this.state.level}
                            </ul>
                        </nav>
                    )
                    : null}
                    <div className = 'dropdown2' onClick = {this.toggleDropdown2}> Years of Experience</div>
                    {this.state.dropdownView2 ? (
                        <nav>
                            <ul>
                            {this.state.yearsExp}
                            </ul>
                        </nav>
                    )
                    : null}
                    <div className = 'dropdown3' onClick = {this.toggleDropdown3}>Location</div>
                    {this.state.dropdownView3 ? (
                        <nav>
                            <ul>
                            {this.state.location}
                            </ul>
                        </nav>
                    )
                    : null}
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
