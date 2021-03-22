import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from "./Marker";

const containerStyle = {
    width: '1800px',
    height: '800px'
};

const center = {
    lat: 10,
    lng: 92.9
};

function MyComponent() {
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
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <Marker
                lat={center.lat}
                lng={center.lng}
                name="My Marker"
                color="blue"
            />
        </GoogleMap>
    ) : <></>
}

export default React.memo(MyComponent)
