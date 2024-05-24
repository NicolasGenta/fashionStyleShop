import * as L from "leaflet";
import { useEffect } from "react";
export const Map = () => {

    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map)

        return () => {
            map.remove();
        }
    },[])

    return(
        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
    )
}