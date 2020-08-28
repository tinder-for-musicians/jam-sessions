import React, { useState, useEffect, useRef } from 'react';
import "./Profile.scss";
import Instruments from "./Instruments";
import ProfileCard from "./ProfileCard";
import { Button, Dropdown} from 'semantic-ui-react'
import { storage } from "../Firebase/index";
import {connect} from 'react-redux';
import {getUser, updateInstruments, addInstrument} from '../../redux/reducer';
import axios from 'axios';

const Profile = (props) => {

    // consts for dropdowns
    const [instrumentOptions, setInstrumentOptions] = useState([]);
    const [levelOptions, setLevelOptions] = useState([]);
    const [experienceOptions, setExperienceOptions] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');

    //consts for instruments array and toggle view
    const [instruments, setInstruments] = useState([])
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState("")
    const [view, setView] = useState(false);

     // BUTTONS //


     // delete button
     const deleteInstrument = (instrument) => {
        console.log("the button is working")
        // const instrument = props.instruments;
        console.log(instrument)

        axios.delete(`/api/profile/instrument`, {data : {instrument}})
        .then(res => {
          // this.props.updateInstruments(res.data)
          axios.get('/api/profile')
          .then(res => {
            props.updateInstruments(res.data.user_instruments);
          })
        })
        .catch(err => console.log(err));
      }

      // add button
      const handleAdd = () => {
          if (instrument && level && experience) {
            props.addInstrument(instrument, level, experience);
            setView(false);
            handleReset();
          }

        axios.get('/api/profile')
        .then(res => {
            props.updateInstruments(res.data.user_instruments)
        })
        .catch(err => console.log(err));
        
    }

    const handleReset = () => {
        for(let i = 0; i <= 1; i++) {
            setInstrument('');
            setLevel('');
            setExperience('');
        }
    }

    // map function for rendering Instruments
    const sortedInstruments = instruments.map((index, i) => 
        {
            return (
                <Instruments
                key={i}
                instrument={index[0]}
                experience={index[1]}
                level={index[2]}
                deleteInstrument={deleteInstrument}
                />
            )
        }
    )
    
    // useEffect listener for instruments array from redux
    useEffect(()=> {
        // renderInstruments();
        setInstruments(props.instruments)
   
    }, [props.instruments])

    useEffect(() => {
    axios.get('api/search/attributes')
        .then(res => {
            setInstrumentOptions(res.data.instruments);
            setLevelOptions(res.data.levels);
            setExperienceOptions(res.data.experience_years);
        })
        .catch(err => console.log(err));
    }, []);


    // logic for dropdowns [taken from home component]
    // generate dropdown options via mapping
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


    // FIREBASE FUNCTIONALITY FOR PICTURE UPLOAD //

    const uploadPic = () => {
        document.getElementById("selectImg").click();
    }

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setImageAsUrl(e => ({ ...e, imageAsUrl: fireBaseUrl}))
                        console.log(imageAsUrl)
                        uploadImgDb(fireBaseUrl)
                    })
            })
    }

    const uploadImgDb = (profile_pic) => {
        console.log(props.user);
        axios.put(`/api/profile/picture`, {profile_pic})
        .then(res => {
            props.getUser(res.data)
        })
    }

    // END OF FIREBASE + PICTURE UPLOAD //

    const editBio = (boolean) => {
        // const bio = document.getElementsByClassName("description")
        // if (boolean) {
        //     return <div>
        //         <textarea></textarea>
        //     </div>
        
        // document.getElementsByClassName("description").click();
    }

    

    return (

        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <div className="profile-img-div">
                    <ProfileCard 
                    imageAsUrl={imageAsUrl}
                    firstName={props.profile.first_name}
                    lastName={props.profile.last_name}
                    username={props.profile.username}
                    editBio={editBio} />
                    <Button color='grey' onClick={uploadPic} >Add Profile Photo</Button>
                    <input type="file" hidden id="selectImg" onChange={handleImageAsFile} />
                    <Button color='grey' onClick={handleFireBaseUpload}>Submit</Button>
                    {!view 
                    ? 
                    (<Button color='grey' onClick={() => setView(!view)}>Add Instrument</Button>)
                    : 
                    (<div>
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
                </section>
                        <Button color='grey' onClick={handleAdd}>Add Instrument</Button>
                    </div>) 
                    }
                    <Button color='grey' onClick={editBio(true)}>Edit Bio</Button>
                </div>
            </div>
            <div className="bio-div" >
                {sortedInstruments}
            </div>

        </div>
    );
}



const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, updateInstruments, addInstrument})(Profile);