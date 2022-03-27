import axios from "axios";
import { makeAutoObservable } from "mobx";
import { db } from "../firebase";
import { getDoc, doc, setDoc } from 'firebase/firestore';

class RootStore {
    meetingName = '';
    orgId = process.env.REACT_APP_DYTE_ORG_ID;
    apiKey = process.env.REACT_APP_DYTE_API_KEY;
    baseURL = process.env.REACT_APP_DYTE_BASE_URL;

    meeting = null;
    roomName = null;
    meetingId = null;

    authToken = null;

    uiConfigOptions = {
        dimensions: {
          mode: "fillParent"
        },
        colors: {
            primary: "#11483E",
            secondary: "#11483E",
            textPrimary: "#FFFFFF",
            videoBackground: "#FFFFFF"
        },
        logo: 'https://i.ibb.co/6tQyq8F/logo-1.png'
    }

    constructor() {
        makeAutoObservable(this)
    }

    setMeetingName = (name) => {
        this.meetingName = name;
    }

    createMeeting = async () => {
        if(!this.meetingId && !this.roomName) {
            const resp = await axios.post(`${this.baseURL}/v1/organizations/${this.orgId}/meeting`, {
                title: this.meetingName || "New test meeting",
            }, {
                headers: {
                  'Authorization': `APIKEY ${this.apiKey}`
                }
            });
            this.meeting = resp.data.data.meeting;
            this.roomName = this.meeting.roomName;
            this.meetingId = this.meeting.id;

            const meetingDetailsRef = doc(db, 'monitor-patient-meeting', 'meeting-params');
            await setDoc(meetingDetailsRef, {
                meetingId: this.meetingId,
                roomName: this.roomName 
            })

        }
        this.joinAsHost();
    }

    joinAsHost = async () => {
        const resp = await axios.post(`${this.baseURL}/v1/organizations/${this.orgId}/meetings/${this.meetingId}/participant`, {
            clientSpecificId: Math.random().toString(36).substring(7),
            userDetails: {
                "name": "Host" + Math.random().toString(36).substring(2)
            },
            roleName: "host"
        }, {
            headers: {
                'Authorization': `APIKEY ${this.apiKey}`
            }
        });
        const authResponse = resp.data.data.authResponse;
        this.authToken = authResponse.authToken;
    }

    cleanUp = async () => {
        this.meeting = null;
        this.roomName = null;
        this.meetingId = null;
        this.authToken = null;
        this.meetingName = '';

        const meetingDetailsRef = doc(db, 'monitor-patient-meeting', 'meeting-params');
        await setDoc(meetingDetailsRef, {
            meetingId: this.meetingId,
            roomName: this.roomName
        })
    }

    getFirebaseData = async () => {
        const meetingDetailsRef = doc(db, 'monitor-patient-meeting', 'meeting-params');
        const meetingDetails = await getDoc(meetingDetailsRef);
        const data = meetingDetails.data();
        if(data.meetingId) {
            this.meetingId = data.meetingId;
        }
        if(data.roomName) {
            this.roomName = data.roomName;
        }
    }

}

export default new RootStore()