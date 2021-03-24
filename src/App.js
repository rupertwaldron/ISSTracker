import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {


    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 41.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 41.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 41.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 41.4055,
                lng: 2.1915
            },
        }
    ];

    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
        setSelected(item);
        console.log(item.name)
    }

    const [ currentPosition, setCurrentPosition ] = useState({lat: 0.0, lng: 0.0});

    const [ markers, setMarkers ] = useState([...locations]);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const success = position => {
        setCurrentPosition({
            ...currentPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    };

    const addMarker = location => {
        setMarkers([ {name: "new", location: location} , ...markers ]);
        console.log(markers);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBFx6XeW-AJcXeNBOYYi-NJerP2hv5tisk'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={5}
                center={currentPosition}>
                {
                    currentPosition.lat && (
                            <Marker
                                position={currentPosition}
                                onClick={() => addMarker(currentPosition)}
                            />
                        )
                    })
                }
                {
                    markers.map((item, index) => {
                        return (
                            <Marker
                                key={index}
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
