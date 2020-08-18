import React, { useState } from 'react';
import "./Profile.scss";
import Upload from "../Firebase/Upload";

const Profile = () => {

    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");

    return (
        <div className="profile-wrapper">
            <div className="profile-img-wrapper">
                <div className="profile-img-div">
                    <img src="https://via.placeholder.com/150" alt="profile image"/>
                    {/* This button should link to upload functionality */}
                    <button className="profile-btn">Add picture</button> 
                    <Upload/>
                </div>
                <div className="profile-user-info">
                    <p>Username:</p>
                    <p>Location:</p>
                </div>
            </div>

                <div className="profile-info">
                        <p> Bio placed here!</p>
                        <p>Related info</p>
                        <p>Instruments</p>
                        <p>Etc</p>
                </div>
                <div>
                    <button className="profile-btn">Add instrument</button>
                </div>

        </div>
    );
}

export default Profile;