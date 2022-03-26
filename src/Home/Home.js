import React, {useState, useEffect} from "react";
import axios from 'axios';
import { observer } from 'mobx-react';
import RootStore from "../stores/RootStore";
import './Home.css'
import JoinComponentCard from "../components/JoinComponentCard";
import NurseLogo from '../static/nurse.png'
import DoctorLogo from '../static/doctor.png'
import FamilyLogo from '../static/family.png'
import Bvlos from '../static/bvlos.png'
import CAS from '../static/cas.png'
import ComputationImg from '../static/computation.png'
import Location from '../static/location.png'
import AksharaImg from '../static/Akshara.png'
import HarshImg from '../static/Harsh.png'
import YashImg from '../static/Yash.png'
import GauravImg from '../static/Gaurav.png'
import KailashImg from '../static/Kailash.png'
import SimratImg from '../static/Simrat.png'

const Home = observer(() => {
    return (
        <div className="homewrapper">
            <div className="homewrapper__banner">
                <div className="homewrapper__nav">
                    <div className="homewrapper__nav__header">
                        Drobulance
                    </div>
                    <div className="homewrapper__nav__tabs">
                        <div className="homewrapper__nav__tabitem">
                            <a href="#features">Features</a>
                        </div>
                        <div className="homewrapper__nav__tabitem">
                            <a href="#team__row">Our Team</a>
                        </div>
                    </div>
                </div>
                <div className="homewrapper__banner__text">
                    Automated and Secure transportation system to save the life of your loved ones!
                    We promise you safe and professional assistance throughout the flight.
                </div>
                <div className="homewrapper__banner__usercardrow">
                    <JoinComponentCard
                        image={NurseLogo}
                        role="NURSE"
                        ctaText="JOIN"
                    />
                    <JoinComponentCard
                        image={DoctorLogo}
                        role="DOCTOR"
                        ctaText="MONITOR"
                    />
                    <JoinComponentCard
                        image={FamilyLogo}
                        role="FAMILY"
                        ctaText="JOIN"
                    />
                </div>
            </div>
            <div id="features">
                <div className="features__header">
                    F<span>EATURE</span>S
                </div>
                <div className="features__row">
                    <div className="features__row__element">
                        <div className="features__row__element__image">
                            <img src={Bvlos} alt="" />
                        </div>
                        <div className="feature__row__element__text">
                            Beyond visual line of sight access(BVLOS)
                        </div>
                    </div>
                    <div className="features__row__element">
                        <div className="features__row__element__image">
                            <img src={ComputationImg} alt="" />
                        </div>
                        <div className="feature__row__element__text">
                            Zero off-boarding computing
                        </div>
                    </div>
                </div>
                <div className="features__row" style={{marginTop: '100px'}}>
                    <div className="features__row__element">
                        <div className="features__row__element__image">
                            <img src={CAS} alt="" />
                        </div>
                        <div className="feature__row__element__text">
                            Robust collision avoidance system(CAS).
                        </div>
                    </div>
                    <div className="features__row__element">
                        <div className="features__row__element__image">
                            <img src={Location} alt="" />
                        </div>
                        <div className="feature__row__element__text">
                            Fully autonomous navigation between user-defined waypoints.
                        </div>
                    </div>
                </div>
            </div>
            <div className="team__row__header">
                O<span>UR TEA</span>M
            </div>
            <div id="team__row">
                <div className="team__row__element">
                    <img src={KailashImg} alt="" />
                    <div className="team__row__element__header">
                        Kailash Natarajan
                    </div>
                    <div className="team__row__element__subheader">
                        Avionics Engineer
                    </div>
                </div>
                <div className="team__row__element">
                    <img src={GauravImg} alt="" />
                    <div className="team__row__element__header">
                        Gaurav Pampana
                    </div>
                    <div className="team__row__element__subheader">
                        Avionics Engineer
                    </div>
                </div>
                <div className="team__row__element">
                    <img src={SimratImg} alt="" />
                    <div className="team__row__element__header">
                        Simrat Singh
                    </div>
                    <div className="team__row__element__subheader">
                        Avionics Engineer
                    </div>
                </div>
                <div className="team__row__element">
                    <img src={YashImg} alt="" />
                    <div className="team__row__element__header">
                        Yash Srivastava
                    </div>
                    <div className="team__row__element__subheader">
                        Avionics Engineer
                    </div>
                </div>
                <div className="team__row__element">
                    <img src={AksharaImg} alt="" />
                    <div className="team__row__element__header">
                        Akshara Pramod
                    </div>
                    <div className="team__row__element__subheader">
                        Web Developer
                    </div>
                </div>
                <div className="team__row__element">
                    <img src={HarshImg} alt="" />
                    <div className="team__row__element__header">
                        Harsh Naicker
                    </div>
                    <div className="team__row__element__subheader">
                        Web Developer
                    </div>
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

export default Home;