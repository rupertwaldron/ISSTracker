import {InfoWindow} from "@react-google-maps/api";


const InfoDisplay = (props) => {
    return <>
        {
            props.selected.location && (
            <InfoWindow
                position={props.selected.location}
                clickable={true}
                onCloseClick={() => props.onCloseClick({})}
            >
                <p>{`
                                Name: ${props.selected.name} 
                                | Weather: ${props.selected.weather.desc}
                                | Temp: ${props.selected.weather.temp} ºC
                                `}</p>
            </InfoWindow>
        )
    }
    </>
}

export default InfoDisplay;
