import React, { useState, useEffect } from 'react';
import "./Profile.scss";
import Bio from "./Bio";
import ProfileCard from "./ProfileCard";
import { Button} from 'semantic-ui-react'
import { storage } from "../Firebase/index";
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';

const Profile = (props) => {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [instruments, setInstruments] = useState([])
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState("")

    const uploadPic = () => {
        document.getElementById("selectImg").click();
    }

    useEffect(()=> {
        console.log(props.user)
        axios.get(`/api/profile`)
        .then(res => {
            props.getUser(res.data)
            console.log(res.data)
            setInstruments(res.data.user_instruments)
            setUsername(res.data.username)
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setImageAsUrl(res.data.profile_pic)
            console.log(props.user)
        })
        .catch(err => console.log(err))
    },[])

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
            console.log(res.data)
            props.getUser(res.data)
            
        })
    }


    return (

        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <div className="profile-img-div">
                    <ProfileCard 
                    imageAsUrl={imageAsUrl}
                    firstName={firstName}
                    lastName={lastName}
                    username={username} />
                    <Button color='orange' onClick={uploadPic} >Add Profile Photo</Button>
                    <input type="file" hidden id="selectImg" onChange={handleImageAsFile} />
                    <Button color='orange' onClick={handleFireBaseUpload}>Submit</Button>
                </div>
            </div>
            <div className="bio-div" >
                <Bio />
            </div>
            <div>
                <Button color='orange'>Add instrument</Button>
            </div>

        </div>
    );
}



const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getUser})(Profile);