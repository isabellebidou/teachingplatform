import React from "react";

import UserData from './UserData';

import AudioList from "./audios/AudioList";
import AudioRecorder from "./audios/AudioRecorder";

import Buttons from './Buttons';
import StarReview from './StarReview';
//import Landing from './Landing';





const Dashboard = () => {
    return (
        <div className="page">
            <StarReview />
            <Buttons />
            <AudioRecorder />
            <AudioList />

            <UserData />
        
        </div>
    )

}

export default Dashboard;