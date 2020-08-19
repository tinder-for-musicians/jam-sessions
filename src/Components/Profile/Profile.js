import React, { useState } from 'react';
import "./Profile.scss";
import Bio from "./Bio";
import ProfileCard from "./ProfileCard";
import { Button } from 'semantic-ui-react'
import {storage} from "../Firebase/index";

const Profile = () => {

    const [username, setUsername] = useState("");

    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState("");



    const uploadPic = () => {
        document.getElementById("selectImg").click();
    }

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
      console.log('start of upload')
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
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
             console.log(fireBaseUrl)
            setImageAsUrl(e => ({...e, imageAsUrl: fireBaseUrl}))
         })
      })
      }

    return (
        
        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <div className="profile-img-div">
                    <ProfileCard imgUrl={imageAsUrl} /> 
                    <Button color='orange' onClick={uploadPic} >Add Profile Photo</Button>
                    <input type="file" hidden id="selectImg" onChange={handleImageAsFile}/>
                    <Button color='orange' type="submit" onClick={handleFireBaseUpload}>Submit</Button>
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



export default Profile;