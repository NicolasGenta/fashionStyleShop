import { useWindowSize } from "../../hooks/useWindowSize";

export const Banner = ()=> {
    return(
        <section className="container-video">
            <video src="/src/assets/video/video_chica.mp4" autoPlay muted loop></video>
            <div className="position-absolute">
                <p>Compra local</p>
                <span>By EMPRENDE</span>
            </div>
        </section>
    )
}