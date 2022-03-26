import React, {useState, useEffect} from "react";
import axios from 'axios';
import { observer } from 'mobx-react';
import RootStore from "../stores/RootStore";
import './JoinComponentCard.css'

const JoinComponentCard = observer(({image=null, role=null, ctaText=null, meetLink=null, handleClick}) => {
    return (
        <div className="card__wrapper">
            <img src={image} alt=""/>
            <div className="card__text">
                {role}
            </div>
            <div className="card__cta" onClick={handleClick}>
                {ctaText}
            </div>
        </div>
    )
})

export default JoinComponentCard;