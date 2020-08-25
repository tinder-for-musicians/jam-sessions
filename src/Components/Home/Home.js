import React, { useState, useEffect } from 'react';
import "./Home.scss";
import Search from "./Search";
import { connect } from 'react-redux';
import { getProfile } from '../../redux/reducer';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';


const Home = (props) => {
    const [instrumentOptions, setInstrumentOptions] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [experienceOptions, setExperienceOptions] = useState([]);
    const [distanceOptions, setDistanceOptions] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [distance, setDistance] = useState('');

    useEffect(() => {
        //bumps back to login after edits /no user info
        axios.get('/auth/checkuser')
        .then()
        .catch(() => props.history.push('/'));

        // query all profiles within 15 miles on initial render
        axios.get(`/api/search`)
        .then(res => {
            // console.log(res.data);
            setFilteredMatches(res.data);
        })
        .catch(err => console.log(err));

        // query all dropdown attributes on initial render
        axios.get('api/search/attributes')
        .then(res => {
            setInstrumentOptions(res.data.instruments);
            setLevelOptions(res.data.levels);
            setExperienceOptions(res.data.experience_years);
            setDistanceOptions(res.data.distances)
        })
        .catch(err => console.log(err));
    }, [])

    const mappedMatches = filteredMatches
        .map((match) => {
            const { user_id, username, profile_pic, bio, distance_away_mi } = match
            return (
                <div key={user_id}>
                    <span
                        onClick={() => {
                            handleClick();
                            ToastsStore.success("Matched!")
                        }}
                        className='tooltip'>
                        <ToastsContainer store={ToastsStore} />
                        <div className = 'tooltiptext'>Click to Match</div>
                        <img src={profile_pic} alt={username} width="100" height ="100"/>
                        <p>{username}</p>
                        <p>{bio}</p>
                        <p>{Math.ceil(distance_away_mi)} mi</p>
                    </span>
                </div>
            )
        })

    const handleSearch = () => {
        // TO-DO
    }

    const handleClick = () => {
        // TO-DO
    }

    const handleReset = () => {
        // TO-DO
    }

    const setField = (field) => {
        // TO-DO
    }

    const mappedInstrumentOptions = [{
        key: 'select instrument',
        text: 'select instrument',
        value: '',
    }];
    instrumentOptions.forEach((instrument, index) => {
        mappedInstrumentOptions.push({
                key: index,
                text: instrument,
                value: instrument,
            }
        )
    })

    const mappedLevelOptions = [{
        key: 'select level',
        text: 'select level',
        value: '',
    }];
    levelOptions.forEach((level, index) => {
        mappedLevelOptions.push({
                key: index,
                text: level,
                value: level,
            }
        )
    })

    const mappedExperienceOptions = [{
        key: 'select experience',
        text: 'select experience',
        value: '',
    }];
    experienceOptions.forEach((experience, index) => {
        mappedExperienceOptions.push({
                key: index,
                text: experience,
                value: experience,
            }
        )
    })

    const mappedDistanceOptions = [{
        key: 'select distance',
        text: 'select distance',
        value: '',
    }];
    distanceOptions.forEach((distance, index) => {
        mappedDistanceOptions.push({
                key: index,
                text: distance,
                value: distance,
            }
        )
    })

    return (
        <div className='home-body'>
            <p className='intro'>Search people to jam with</p>
            <section className='searchcontainer'>
                <Dropdown
                    className='options-instrument'
                    placeholder='Select Instrument'
                    fluid
                    onChange={() => setField("instrument")}
                    search
                    selection
                    options={mappedInstrumentOptions}
                />
                <Dropdown
                    placeholder='Select Level'
                    fluid
                    onChange={() => setField('level')}
                    search
                    selection
                    options={mappedLevelOptions}
                />
                <Dropdown
                    placeholder='Select Experience'
                    fluid
                    onChange={() => setField('experience')}
                    search
                    selection
                    options={mappedExperienceOptions}
                />
                <Dropdown
                    placeholder='Select Distance'
                    fluid
                    onChange={() => setField('distance')}
                    search
                    selection
                    options={mappedDistanceOptions}
                />
                <button onClick={handleSearch}
                    className='srchbtn'>Search</button>
                <button
                    onClick={handleReset}
                    className='resetbtn'>Reset</button>
            </section>
            <section className='dashboard-profile-view'>
                {mappedMatches}
            </section>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getProfile })(Home);
