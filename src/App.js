import React, {useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 11.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 31.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 51.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 61.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 81.4055,
                lng: 2.1915
            },
        }
    ];

    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
        setSelected(item);
        console.log(item.name)
    }

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 51.4105, lng: 0.8339
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBFx6XeW-AJcXeNBOYYi-NJerP2hv5tisk'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={3}
                center={defaultCenter}>
                {
                    locations.map(item => {
                        return (
                            <Marker
                                key={item.name}
                                position={item.location}
                                onClick={() => onSelect(item)}
                            />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
