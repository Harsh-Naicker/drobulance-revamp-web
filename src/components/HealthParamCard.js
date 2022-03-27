import React from "react";
import { observer } from 'mobx-react';
import "./HealthParamCard.css"

const HealthParamCard = observer((props) => {
    return (
        <div className="healthparamwrapper">
            <div className="healthparam__headersection">
                <div className="healthparam__headersection__text">
                    {props.paramName}
                </div>
            </div>
            <iframe src={props.widgetLink}></iframe>
        </div>
    )
})

export default HealthParamCard;