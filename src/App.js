import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: 51.00, lng: 0.0005
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
                            <Marker key={item.name} position={item.location}/>
                        )
                    })
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;






// import React, { useState } from 'react'
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
//
// const containerStyle = {
//     width: '1600px',
//     height: '800px'
// };
//
// const center = {
//     lat: 51.4769,
//     lng: 0.0005
// };
//
// function MyComponent(props) {
//
//     const [issLocation, setIssLocation] = useState(
//         {
//             issLocation: {
//                 issLatitude: 0,
//                 issLongitude: 0
//             }
//         })
//
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyBFx6XeW-AJcXeNBOYYi-NJerP2hv5tisk'
//     })
//
//     const [map, setMap] = React.useState(null)
//
//     const onLoad = React.useCallback(function callback(map) {
//         const bounds = new window.google.maps.LatLngBounds();
//         map.fitBounds(bounds);
//         setMap(map)
//     }, [])
//
//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])
//
//     return isLoaded ? (
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={2}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//         >
//             {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//         </GoogleMap>
//     ) : <></>
// }
//
// export default React.memo(MyComponent)
