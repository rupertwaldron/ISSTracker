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
        setMarkers([ {
            name: "new",
            lat: location.lat + 10.0,
            lng: location.lng - 10.0,
            draggable: true
        } , ...markers ]);
        console.log(markers);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    })

    const onDrag = loc => {
        setSelected({
            ...selected,
            lat: 0.0,
            long: 0.0,
            name: "updated RR"
        });
        console.log(selected.location);
    }

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
                                draggable={true}
                                onDragEnd={loc => onDrag(loc)}
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
