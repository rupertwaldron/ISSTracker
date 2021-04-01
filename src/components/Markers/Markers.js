import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import Card from "../../elements/Card/Card";
import MarkerInfo from "../MarkerInfo/MarkerInfo";
import * as url from "url";

const Markers = (props) => {
    const green_icon = 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png';

    return <>
        {

            props.markers.map((item, index) => {
                return (
                    <Marker
                        key={index}
                        position={item.location}
                        draggable={true}
                        icon={green_icon}
                        onClick={() => props.onClick(item, index)}
                        onRightClick={() => props.onRightClick(index)}
                    />
                )
            })
        }
    </>;
}

export default Markers;
