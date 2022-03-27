import React, {useEffect} from "react";
import { inject, observer } from 'mobx-react';
import './Monitor.css'
import HealthParamCard from "../components/HealthParamCard";
import { DyteMeeting } from "dyte-client";

const Monitor = observer ((props) => {
    useEffect(() => {
        props.RootStore.getFirebaseData();
    }, []);
    return (
        <div className="monitorpatient">
            <div className="monitorpatient__banner">
                <div className="monitorpatient__nav">
                    <div className="monitorpatient__nav__header">
                        Monitor Patient
                    </div>
                    <div className="monitorpatient__nav__tabs">
                        <div className="monitorpatient__nav__tabitem">
                            <a href="/">Back to Home</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="monitorpatient__page">
                <div className="monitorpatient__page__healthparams">
                    <HealthParamCard
                        paramName="Heart Rate"
                        widgetLink="https://thingspeak.com/channels/1668276/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line"
                    />
                    <HealthParamCard
                        paramName="Temperature"
                        widgetLink="https://thingspeak.com/channels/1668276/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line"
                    />
                    <HealthParamCard
                        paramName="Blood Pressure"
                        widgetLink="https://thingspeak.com/channels/1668276/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line"
                    />
                    
                </div>
                <div className="monitorpatient__page__videocall">
                    {props.RootStore.authToken && props.RootStore.roomName ? (
                        <DyteMeeting
                            onInit={(meeting) => {
                                meeting.on(meeting.Events.meetingEnded, () => {
                                    props.navigation("/");
                                    props.RootStore.cleanUp();
                                });
                                meeting.on(meeting.Events.disconnect, () => {
                                    props.navigation("/");
                                    props.RootStore.cleanUp();
                                })
                             }}
                            clientId={`orgId || clientId`}
                            meetingConfig={{
                                roomName: props.RootStore.roomName,
                                authToken: props.RootStore.authToken,
                            }}
                            uiConfig={props.RootStore.uiConfigOptions}
                        />
                    ) : (
                            <div className="monitorpatient__page__videocall__form">
                                <div className="monitorpatient__page__videocall__form__header">
                                    Create Meeting
                                </div>
                                <input type="text" name="meetingName" value={props.RootStore.meetingName} onChange={(event) => props.RootStore.setMeetingName(event.target.value)} placeholder="Meeting Name" />
                                <div 
                                    className="monitorpatient__page__videocall__form__cta"
                                    onClick={() => {
                                        props.RootStore.createMeeting();
                                    }}
                                >
                                    Create
                                </div>
                            </div>
                    )}
                    
                </div>
            </div>
            <div className="footer">
                <div className="footer__text">
                    © Copyright Team Drobulance
                </div>
            </div>
        </div>
    )
})

export default inject("RootStore")(Monitor);