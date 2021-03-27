import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {


    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 10.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 20.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 30.3773,
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
                lat: 50.4055,
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
        const newMarker = {
            name: "Rupert",
            location: {
                lat: 50,
                lng: 50
            }
        }
        setMarkers(bob => [...bob, newMarker]);
        console.log(markers);
    }

    const addMarker2 = location => {
        const newMarker = {
            name: "New",
            location: {
                lat: location.lat,
                lng: location.lng
            }
        }
        setMarkers(bob => [...bob, newMarker]);
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
                center={currentPosition}
                onDblClick={(event) => addMarker2({lat: event.latLng.lat(), lng: event.latLng.lng()})}
            >
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
                                draggable={true}
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
