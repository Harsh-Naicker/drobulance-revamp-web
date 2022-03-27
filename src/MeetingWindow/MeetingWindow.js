import React, {useState, useEffect} from "react";
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import './MeetingWindow.css'
import { DyteMeeting } from "dyte-client";
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

const MeetingWindow = observer ((props) => {
    const [authToken, setAuthToken] = useState(null);
    const [roomName, setRoomName] = useState(null);
    const [meetingId, setMeetingId] = useState(null);

    const orgId = process.env.REACT_APP_DYTE_ORG_ID;
    const apiKey = process.env.REACT_APP_DYTE_API_KEY;
    const baseURL = process.env.REACT_APP_DYTE_BASE_URL; 

    useEffect(() => {

        const getMeetingDetails = async () => {
            const meetingDetailsRef = doc(db, 'monitor-patient-meeting', 'meeting-params');
            const meetingDetails = await getDoc(meetingDetailsRef);
            const data = meetingDetails.data();
            console.log(data)
            if (data.meetingId) {
                console.log("triggered");
                setMeetingId(data.meetingId);
            }
            if (data.roomName) {
                setRoomName(data.roomName);
            }
        }
        
        if(!roomName) getMeetingDetails();

        const joinAsParticipant = async () => {
            const resp = await axios.post(`${baseURL}/v1/organizations/${orgId}/meetings/${meetingId}/participant`, {
                clientSpecificId: Math.random().toString(36).substring(7),
                userDetails: {
                    "name": "Participant" + Math.random().toString(36).substring(2)
                },
            }, {
                headers: {
                    'Authorization': `APIKEY ${apiKey}`
                }
            });
    
            const authResponse = resp.data.data.authResponse;
            setAuthToken(authResponse.authToken);
        }

        if(!authToken)joinAsParticipant();

        console.log(roomName);
        console.log(meetingId);
        console.log(authToken);

    }, [apiKey, baseURL, orgId, roomName, meetingId, authToken]);

    return (
        <div className="meetingwindow">
            <div className="meetingwindow__banner">
                <div className="meetingwindow__nav">
                    <div className="meetingwindow__nav__header">
                        Ongoing Video Call
                    </div>
                    <div className="meetingwindow__nav__tabs">
                        <div className="meetingwindow__nav__tabitem">
                            <a href="/">Back to Home</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="meetingwindow__meetscreen">
                {authToken && roomName? (
                    <DyteMeeting
                        onInit={(meeting) => {
                            meeting.on(meeting.Events.meetingEnded, () => {
                                props.navigation("/");
                                setAuthToken(null);
                                setRoomName(null);
                                setMeetingId(null);
                            });
                            meeting.on(meeting.Events.disconnect, () => {
                                props.navigation("/");
                                setAuthToken(null);
                                setRoomName(null);
                                setMeetingId(null);
                            })
                        }}
                        clientId={`orgId || clientId`}
                        meetingConfig={{
                            roomName: roomName,
                            authToken: authToken,
                        }}
                        uiConfig={props.RootStore.uiConfigOptions}
                    />
                ) : (
                    <div className="meetingwindow__meetscreen__error">
                        <h1>Patient Monitoring Not Initiated</h1>
                    </div>
                )}
                
            </div>
            <div className="footer">
                <div className="footer__text">
                    © Copyright Team Drobulance
                </div>
            </div>
        </div>
    )
})

export default inject("RootStore")(MeetingWindow);