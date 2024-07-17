import { useWindowSize } from "../../hooks/useWindowSize";
import React from 'react';
import './Store.css';

export const Banner = ()=> {
    return(
        <section className="container-video">
            <video src= './src/assets/video/1109295_1080p_4k_2k_1920x1080.mp4' autoPlay muted loop></video>
            <div className="position-absolute">
                <p>Compra local</p>
                <span>By EMPRENDE</span>
            </div>
        </section>
    )
}