import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';


export const Mapa = () => {


    return (
        //<></>
        <MapContainer center={[-36.0144023763216, -59.101051962804824]}  zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
            url='https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'/>
        </MapContainer>
    );
};
