import React, { Component } from 'react';
import "./Home.scss";
import Search from "./Search";
import { connect } from 'react-redux';
import { getProfile } from '../../redux/reducer';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instrument: [],
            level: [],
            experience: [],
            distance: [],
            setInstrument: '',
            setExperience: '',
            setLevel: '',
            setDistance: '',
            filteredMatches: [],
        }
    }

    //bumps back to login after edits /no user info
    componentDidMount() {
        axios.get('/auth/checkuser')
            .then()
            .catch(() => this.props.history.push('/'));

        // this.getProfileInfo();
        this.getMatchesInfo()
        this.getInstruments();

    }

    toggleDropdown1 = () => {
        this.setState({ dropdownView1: !this.state.dropdownView1 })
    }
    toggleDropdown2 = () => {
        this.setState({ dropdownView2: !this.state.dropdownView2 })
    }
    toggleDropdown3 = () => {
        this.setState({ dropdownView3: !this.state.dropdownView3 })
    }

    getMatchesInfo = () => {
        axios.get(`/api/search`)
            .then(res => {
                this.setState({
                    filteredMatches: res.data
                })
            })
    }

    handleSearch = () => {
        const { setInstrument, setLevel, setExperience, setDistance } = this.state
        axios.post('api/search', { instrument: setInstrument, level: setLevel, experience: setExperience, distance: setDistance })
            .then(res => {
                this.setState({
                    filteredMatches: res.data
                })
            })
    };

    handleSetInstrument = (e, {value}) => {
        this.setState({ setInstrument: value })
        console.log(this.state.setInstrument)
    }

    handleSetLevel = (e, {value}) => {
        this.setState({ setLevel: value })
        console.log(this.state.setLevel)
    }

    handleSetExperience = (e, {value}) => {
        this.setState({ setExperience: value })
        console.log(this.state.setExperience)
    }


    // handleClick = () => {
    //     axios.post('/api/search')
    // }

    handleReset = () => {
        
        this.setState({ setExperience: '' })
        this.setState({ setLevel: ''})
        this.setState({ setDistance: '' })
        this.setState({ setInstrument: '' })
    };

    getInstruments = () => {
        axios.get('api/search/attributes')
            .then(res => {
                // console.log(res.data)
                    this.setState({
                        instrument: res.data.instruments,
                        level: res.data.levels,
                        experience: res.data.experience_years,
                        distance: res.data.distances
                    })
                }
            )
            .catch(err => console.log(err))
    }

    render() {
        const { instrument, level, distance, experience } = this.state;
        const mappedMatches = this.state.filteredMatches
            .map((match) => {
                const { user_id, username, profile_pic, bio, distance_away_mi } = match
                console.log(match)
                return (
                    <div key={user_id}>
                        <span
                            onClick={() => {
                                this.handleClick(match);
                                ToastsStore.success("Matched!")
                            }}
                            className='tooltip'>
                            <ToastsContainer store={ToastsStore} />
                            <div className = 'tooltiptext'>Click to Match</div>


                        </span>
                        <p>{username}</p>

                        <p>{bio}</p>

                    </div>
                )


            })
        console.log(instrument)
        const instrumentOptions = []
        instrument.forEach(instrument => {
            console.log(instrument)
            instrumentOptions.push(
                {
                    key: instrument,
                    text: instrument,
                    value: instrument,

                }
            )
        })
        const levelOptions = [{
            key: 'select level',
            text: 'select level',
            value: '',
        }]
        level.forEach(level => {
            console.log(level)
            levelOptions.push(
                {
                    key: level,
                    text: level,
                    value: level,

                }
            )
        })
        const experienceOptions = []
        experience.forEach(experience => {
            console.log(experience)
            experienceOptions.push(
                {
                    key: experience,
                    text: experience,
                    value: experience,

                }
            )
        })
        console.log(instrumentOptions)
        console.log(levelOptions)
        console.log(experienceOptions)
        return (
            <div className=
                'home-body'>
               <p className = 'intro'>Search people to jam with</p>
                <section className='searchcontainer'>
                    
                    <Dropdown
                        placeholder='Select Instrument'
                        fluid
                        onChange={this.handleSetInstrument}
                        search
                        selection
                        options={instrumentOptions}
                    />

                    <Dropdown
                        placeholder='Select Level'
                        fluid
                        onChange={this.handleSetLevel}
                        search
                        selection
                        options={levelOptions}
                    />

                    <Dropdown
                        placeholder='Select Experience'
                        fluid
                        onChange={this.handleSetExperience}
                        search
                        selection
                        options={experienceOptions}
                    />


                    <button onClick={this.handleSearch}
                        className='srchbtn'>Search</button>

                    <button
                        onClick={this.handleReset}
                        className='resetbtn'>Reset</button>

                </section>

                <section className='dashboard-profile-view'>
                    {mappedMatches}
                </section>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getProfile })(Home);
