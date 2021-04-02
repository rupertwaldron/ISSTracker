import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import Card from './elements/Card/Card';
import Markers from './components/Markers/Markers';
import Preview from './components/Preview/Preview';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';

const MapContainer = () => {
    const API_KEY_LOCATION = 'd1b3defe6f361952579dfa1f3a7d9aa5';
    const LOCATION_BASE_URL = 'http://api.positionstack.com/v1/reverse';
    const GOOGLE_MAP_API = 'AIzaSyBFx6XeW-AJcXeNBOYYi-NJerP2hv5tisk';

    // const locations = [
    //     {
    //         name: "Location 1",
    //         location: {
    //             lat: 10.3954,
    //             lng: 2.162
    //         },
    //         weather: {
    //             desc: "Preview",
    //             temp: "1"
    //         }
    //     },
    //     {
    //         name: "Location 2",
    //         location: {
    //             lat: 20.3917,
    //             lng: 2.1649
    //         },
    //         weather: {
    //             desc: "Preview",
    //             temp: "2"
    //         }
    //     },
    //     {
    //         name: "Location 3",
    //         location: {
    //             lat: 30.3773,
    //             lng: 2.1585
    //         },
    //         weather: {
    //             desc: "Preview",
    //             temp: "3"
    //         }
    //     },
    //     {
    //         name: "Location 4",
    //         location: {
    //             lat: 41.3797,
    //             lng: 2.1682
    //         },
    //         weather: {
    //             desc: "Preview",
    //             temp: "4"
    //         }
    //     },
    //     {
    //         name: "Location 5",
    //         location: {
    //             lat: 50.4055,
    //             lng: 2.1915
    //         },
    //         weather: {
    //             desc: "Preview",
    //             temp: "5"
    //         }
    //     }
    // ];

    const [ selectedIndex, setSelectedIndex ] = useState(0);

    const [ httpStatus, setHttpStatus ] = useState(200);

    const [ selected, setSelected ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const [ currentPosition, setCurrentPosition ] = useState({lat: 0.0, lng: 0.0});

    const [ homePosition, setHomePosition ] = useState({lat: 0.0, lng: 0.0});

    const [ markers, setMarkers ] = useState([]);

    const mapStyles = {
        height: "100vh",
        width: "90%",
        display: "inline-block",
        float: "left"
    };

    const onSelect = (item, index) => {
        const API_KEY = 'b3c1945cea140e1598a3fc529c90b7f1';
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        const url = API_URL + `?lat=${item.location.lat}&lon=${item.location.lng}&appid=${API_KEY}&units=metric`;
        setLoading(true);
        setSelectedIndex(index);
        setSelected(() => {
            fetch(url)
                .then(res => {
                    setHttpStatus(res.status);
                    return res.json();
                })
                .then(data => {
                    if (httpStatus === 200) {
                        const newItem = {
                            ...item,
                            weather: {
                                temp: data.main.temp,
                                desc: data.weather[0].main
                            }
                        }
                        setSelected(newItem);
                        updateMarker(newItem, index);
                        setLoading(false);
                    } else {
                        throw httpStatus;
                    }
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        });
        console.log(item.name)
    }

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
                            },
                            weather: {
                                desc: "Preview",
                                temp: "0"
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

    const updateMarker = (markerToUpdate, index) => {
        const markerArray = [...markers];
        markerArray.splice(index, 1, markerToUpdate);
        setMarkers([...markerArray]);
    }

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_MAP_API}>
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
                        />
                    )
                })
                {
                    !loading && (
                        <Markers
                            selectedIndex={selectedIndex}
                            markers={markers}
                            onClick={onSelect}
                            onRightClick={deleteItem}
                        />
                    )
                }
                {/*{*/}
                {/*    !loading && (*/}
                {/*        <InfoDisplay*/}
                {/*            selected={selected}*/}
                {/*            onCloseClick={setSelected}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}
            </GoogleMap>
            {
                !loading && markers.map((item, index) => {
                        return (
                            <Card
                            color={selectedIndex === index ? 'LightYellow' : 'gainsboro'}
                            >
                                <MarkerInfo
                                    key={index}
                                    selected={item}
                                />
                            </Card>
                        )
                    }
                )
            }

        </LoadScript>
    )
}

export default MapContainer;
