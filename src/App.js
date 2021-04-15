import React, {useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, LoadScript, Marker, Polyline} from '@react-google-maps/api';
import Card from './elements/Card/Card';
import Markers from './components/Markers/Markers';
import MarkerInfo from './components/MarkerInfo/MarkerInfo';
import iss from './assets/images/markers/iss.png';

const MapContainer = () => {
    const API_KEY_LOCATION = process.env.REACT_APP_LOCATION_API_KEY;
    const LOCATION_BASE_URL = 'http://api.positionstack.com/v1/reverse';
    const GOOGLE_MAP_API = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

    const [ selectedIndex, setSelectedIndex ] = useState(0);

    const [ httpStatus, setHttpStatus ] = useState(200);

    const [ selected, setSelected ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const [ currentPosition, setCurrentPosition ] = useState({lat: 0.0, lng: 0.0});

    const [ homePosition, setHomePosition ] = useState({lat: 0.0, lng: 0.0});

    const [ markers, setMarkers ] = useState([]);

    const [ issObj, setIssObj ] = useState({
        name: "ISS",
        location: {
            lat: 10.3954,
            lng: 2.162
        },
        weather: {
            desc: "Preview",
            temp: "1"
        },
        infoSelected: true,
        visibility: ""
    });

    const [journey, setJourney] = useState([]);

    const mapStyles = {
        height: "100vh",
        width: "90%",
        display: "inline-block",
        float: "left"
    };


    const updateIssLocation = () => {
        const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
        setLoading(true);
        setIssObj(() => {
            fetch(ISS_URL)
                .then(res => {
                    setHttpStatus(res.status);
                    return res.json();
                })
                .then(data => {
                    if (httpStatus === 200) {
                        setIssObj({
                            ...issObj,
                            location: {
                                lat: data.latitude,
                                lng: data.longitude
                            },
                            visibility: data.visibility
                        })
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
        console.log(journey);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateIssLocation();
            setJourney(
                journey1 => [...journey1, {
                    lat: issObj.location.lat,
                    lng: issObj.location.lng
                }])
            console.log("Timer called")
        }, 10000);
        return () => clearInterval(interval);
    })

    const onSelect = (item, index) => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
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
        // console.log(item.name)
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
        // console.log(markers);
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
        const newMarkers = markers.slice();
        newMarkers[index] = markerToUpdate;
        setMarkers(newMarkers);
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
                    homePosition.lat && !loading && (
                        <Marker
                            position={homePosition}
                            // onClick={updateIssLocation}
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
                {
                    !loading && (
                        <Marker
                            position={issObj.location}
                            icon={iss}
                            onClick={() => setIssObj({
                                ...issObj,
                                infoSelected: true
                            })}
                        />
                    )

                }
                {
                    !loading && issObj.infoSelected &&
                    (
                        <InfoWindow
                            position={{lat: issObj.location.lat + 2, lng: issObj.location.lng + 2}}
                            clickable={true}
                            onCloseClick={() => setIssObj({
                                ...issObj,
                                infoSelected: false
                            })}
                        >
                            <p>{issObj.name} lat: {issObj.location.lat} lng: {issObj.location.lng} visibility: {issObj.visibility}</p>
                        </InfoWindow>
                    )
                }
                <Polyline
                    path={journey.slice(1) }
                    options={{
                        strokeColor: 'red',
                        strokeOpacity: 0.5,
                        strokeWeight: 1,
                        icons: [{
                            icon: iss,
                            offset: '0',
                            repeat: '10px'
                        }],
                    }}
                />
            </GoogleMap>
            {
                !loading && markers.map((item, index) => {
                        return (
                            <Card
                                key={index}
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
