import React from "react";
import { observer } from 'mobx-react';
import './JoinComponentCard.css'

const JoinComponentCard = observer((props) => {
    return (
        <div className="card__wrapper">
            <img src={props.image} alt=""/>
            <div className="card__text">
                {props.role}
            </div>
            <div className="card__cta" onClick={props.handleClick}>
                {props.ctaText}
            </div>
        </div>
    )
})

export default JoinComponentCard;