import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from "./Marker";

const containerStyle = {
    width: '1600px',
    height: '800px'
};

const center = {
    lat: 51.4769,
    lng: 0.0005
};

function MyComponent() {

    const [issLocation, setIssLocation] = useState(
        {
            issLocation: {
                issLatitude: 0,
                issLongitude: 0
            }
        })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBFx6XeW-AJcXeNBOYYi-NJerP2hv5tisk'
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <Marker
                // lat={-100}
                // lng={-100}
                name="My Marker"
                color="green"
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)
