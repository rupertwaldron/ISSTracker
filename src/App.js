import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {
    const API_KEY_LOCATION = 'd1b3defe6f361952579dfa1f3a7d9aa5';
    const LOCATION_BASE_URL = 'http://api.positionstack.com/v1/reverse';

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

    const [ httpStatus, setHttpStatus ] = useState(200);

    const [ selected, setSelected ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const onSelect = item => {
        setSelected(item);
        console.log(item.name)
    }

    const [ currentPosition, setCurrentPosition ] = useState({lat: 0.0, lng: 0.0});
    const [ homePosition, setHomePosition ] = useState({lat: 0.0, lng: 0.0});

    const [ markers, setMarkers ] = useState([...locations]);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const success = position => {
        setHomePosition({
            ...homePosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
        setCurrentPosition({
            ...currentPosition,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    };

    const addMarker = location => {
        const tempMarker = {
            name: "Rupert",
            location: {
                lat: 50,
                lng: 50
            }
        }
        setMarkers(bob => [...bob, tempMarker]);
        console.log(markers);
    }

    const addMarker2 = location => {
        const url = LOCATION_BASE_URL + `?access_key=${API_KEY_LOCATION}&query=${location.lat},${location.lng}`;
        setLoading(true);
        setCurrentPosition({
            ...currentPosition,
            lat: location.lat,
            lng: location.lng
        });
        setMarkers( () => {
            fetch(url)
                .then(res => {
                    setHttpStatus(res.status);
                    return res.json();
                })
                .then(data => {
                    if (httpStatus === 200) {
                        const newMarker = {
                            name: data.data[0].label,
                            location: {
                                lat: location.lat,
                                lng: location.lng
                            }
                        }
                        setMarkers([...markers, newMarker]);
                        setLoading(false);
                    } else {
                        throw httpStatus;
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        })
        console.log(markers);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    const deleteItem = index => {
        const markerArray = [...markers];
        markerArray.splice(index, 1);
        setMarkers([...markerArray]);
    }

    if (loading) {
        return (
            <h1>Getting marker address...</h1>
        )
    } else {
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
                        homePosition.lat && (
                                <Marker
                                    position={homePosition}
                                    // onClick={() => addMarker(currentPosition)}
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
                                    onRightClick={() => deleteItem(index)}
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
}

export default MapContainer;
