import {LoadScript, Marker} from "@react-google-maps/api";
import Card from "../../elements/Card/Card";
import MarkerInfo from "../MarkerInfo/MarkerInfo";

const Markers = (props) => {
    return <>
        {
            props.markers.map((item, index) => {
                return (
                    <Marker
                        key={index}
                        position={item.location}
                        draggable={true}
                        onClick={() => props.onClick(item, index)}
                        onRightClick={() => props.onRightClick(index)}
                    />
                )
            })
        }
    </>;
}

export default Markers;
