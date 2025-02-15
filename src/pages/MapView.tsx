import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useGetData} from "../hooks/useGetData.ts";
import type {hotel} from "@type/hotel.ts";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {useEffect, useState} from "react";

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const {data: hotels} = useGetData<hotel[]>('hotels', 'GetHotelList');

    if (!isClient) {
        return <div>Loading map...</div>
    }
    return (
        <MapContainer
            center={[35.6892, 51.389]}
            zoom={12}
            scrollWheelZoom={false}
            style={{height: "90vh", width: "100vw"}}
        >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotels?.map((hotel) => (
                <Marker key={hotel.id} position={[hotel.location.lat, hotel.location.long]}>
                    <Popup>{hotel.name} <br/>
                        {hotel.description}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
