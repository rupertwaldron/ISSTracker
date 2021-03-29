import {Marker} from "@react-google-maps/api";

const Markers = (props) => {
    return <>
        {
            props.markers.map((item, index) => {
                return (
                    <Marker
                        key={index}
                        position={item.location}
                        draggable={true}
                        onClick={() => props.onClick(item)}
                        onRightClick={() => props.onRightClick(index)}
                    />
                )
            })
        }
    </>;
}

export default Markers;
