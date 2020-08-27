import React, { useState, useEffect, useRef } from 'react';
import "./Profile.scss";
import Instruments from "./Instruments";
import ProfileCard from "./ProfileCard";
import { Button} from 'semantic-ui-react'
import { storage } from "../Firebase/index";
import {connect} from 'react-redux';
import {getUser, updateInstruments} from '../../redux/reducer';
import axios from 'axios';

const Profile = (props) => {


    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [instruments, setInstruments] = useState([])
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState("")

     // BUTTONS //

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


    const sortedInstruments = instruments.map((index, i) => (
        <Instruments
        key={i}
        instrument={index[0]}
        years={index[1]}
        proficiency={index[2]}
        deleteInstrument={deleteInstrument}
        />
    ))
    

    useEffect(()=> {
        // renderInstruments();
        setInstruments(props.instruments)
   
    }, [props.instruments])



    const addInstrument = (instrument) => {
        props.getProfile({user_instruments: [...props.user_instruments, instrument]})
    }

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

    const editBio = (boolean) => {
        // const bio = document.getElementsByClassName("description")
        // if (boolean) {
        //     return <div>
        //         <textarea></textarea>
        //     </div>
        
        // document.getElementsByClassName("description").click();
    }


    // END OF FIREBASE + PICTURE UPLOAD //

    return (

        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <div className="profile-img-div">
                    <ProfileCard 
                    imageAsUrl={imageAsUrl}
                    firstName={firstName}
                    lastName={lastName}
                    username={username}
                    editBio={editBio} />
                    <Button color='grey' onClick={uploadPic} >Add Profile Photo</Button>
                    <input type="file" hidden id="selectImg" onChange={handleImageAsFile} />
                    <Button color='grey' onClick={handleFireBaseUpload}>Submit</Button>
                    <Button color='grey' onClick={addInstrument}>Add Instrument</Button>
                    <Button color='grey' onClick={editBio(true)}>Edit Bio</Button>
                </div>
            </div>
            <div className="bio-div" >
                {sortedInstruments}
            </div>
            <div>
                
            </div>

        </div>
    );
}



const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser, updateInstruments})(Profile);