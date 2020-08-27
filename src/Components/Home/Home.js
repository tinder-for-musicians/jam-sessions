import React, { useState, useEffect } from 'react';
import "./Home.scss";
import { connect } from 'react-redux';
import { getProfile, updateInstruments } from '../../redux/reducer';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';


const Home = (props) => {
    // component state variables
    const [instrumentOptions, setInstrumentOptions] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [experienceOptions, setExperienceOptions] = useState([]);
    const [distanceOptions, setDistanceOptions] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [distance, setDistance] = useState('');


    // initial mount effects
    useEffect(() => {
        //bumps back to login after edits /no user info
        axios.get('/auth/checkuser')
        .then()
        .catch(() => props.history.push('/'));

         // DO NOT DELETE OTHERWISE VERA WILL FIND YOU ...
         // sets store to user profile
         axios.get('/api/profile')
         .then(res => {
             props.getProfile(res.data);
             props.updateInstruments(res.data.user_instruments);
         })
         // I AM DEAD SERIOUS

        // query all profiles within 15 miles on initial render
        axios.get(`/api/search`)
        .then(res => setFilteredMatches(res.data))
        .catch(err => console.log(err));

        // // query all dropdown attributes on initial render
        axios.get('api/search/attributes')
        .then(res => {
            setInstrumentOptions(res.data.instruments);
            setLevelOptions(res.data.levels);
            setExperienceOptions(res.data.experience_years);
            setDistanceOptions(res.data.distances)
        })
        .catch(err => console.log(err));
    }, [])

    // query dropdowns
    useEffect(() => {
        if (!(instrumentOptions && levelOptions && experienceOptions && distanceOptions)) {
            axios.get('api/search/attributes')
            .then(res => {
                setInstrumentOptions(res.data.instruments);
                setLevelOptions(res.data.levels);
                setExperienceOptions(res.data.experience_years);
                setDistanceOptions(res.data.distances)
            })
            .catch(err => console.log(err));
        }
    }, [instrumentOptions, levelOptions, experienceOptions, distanceOptions])

    // event handlers
    const handleSearch = () => {
        axios.post(`/api/search`, {distance, instrument, level, experience})
        .then(res => setFilteredMatches(res.data))
        .catch(err => console.log(err));
    }

    const handleReset = () => {
        for(let i = 0; i <= 1; i++) {
            setDistance('');
            setInstrument('');
            setLevel('');
            setExperience('');
        }
    }

    const handleClick = () => {
        // TO-DO
    }

    // if no fields populated, re-render default search (e.g., after Reset)
    useEffect(() => {
        if (!(instrument || level || experience || distance)) {
            handleReset();
            handleSearch();
        }
    }, [instrument, level, experience, distance])

    // map filtered matches
    const mappedMatches = filteredMatches
    .map((match) => {
        const { user_id, username, profile_pic, bio, distance_away_mi, instrument, experience, level } = match
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
                    <img 
                    className = 'profile-pic'
                    src={profile_pic} alt={username} width="100" height ="100"/>
                    <p className = 'username'>{username}</p>
                    <p className = 'distance'>{`${Math.ceil(distance_away_mi)} mile(s) away`}</p>
                    <p className = 'bio'>{bio}</p>
                    <p className = 'instruments'>{instrument}</p>
                    <p className = 'level'>{level}</p>
                    <p className = 'experience'>{experience}</p>
                </span>
            </div>
        )
    })

    // populate dropdown options via mapping
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
                    onChange={(_e, { value }) => setInstrument(value)}
                    value={instrument}
                    search
                    selection
                    clearable
                    options={mappedInstrumentOptions}
                />
                <Dropdown
                    className='options-level'
                    placeholder='Select Level'
                    fluid
                    onChange={(_e, { value }) => setLevel(value)}
                    value={level}
                    search
                    selection
                    clearable
                    options={mappedLevelOptions}
                />
                <Dropdown
                    className='options-experience'
                    placeholder='Select Experience'
                    fluid
                    onChange={(_e, { value }) => setExperience(value)}
                    value={experience}
                    search
                    selection
                    clearable
                    options={mappedExperienceOptions}
                />
                <Dropdown
                    className='options-distance'
                    placeholder='Select Distance'
                    fluid
                    onChange={(_e, { value }) => setDistance(value)}
                    value={distance}
                    search
                    selection
                    clearable
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

export default connect(mapStateToProps, { getProfile, updateInstruments })(Home);
