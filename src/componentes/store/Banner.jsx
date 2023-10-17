export const Banner = ()=> {
    return(
        <section>
            <video src="/src/assets/video/video_chica.mp4" autoPlay muted loop></video>
            <div className="position-absolute">
                <p>Viste con estilo, define tu actitud</p>
                <span>By Fashion Style</span>
                <button>COMPRAR</button>
            </div>
        </section>
    )
}