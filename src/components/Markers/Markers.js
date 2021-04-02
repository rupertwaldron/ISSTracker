import {Marker} from "@react-google-maps/api";
import yellow_dot from "../../assets/images/markers/yellow-dot.png"
import red_dot from "../../assets/images/markers/red-dot.png"

const Markers = (props) => {
    return <>
        {

            props.markers.map((item, index) => {
                const dot_color = (props.selectedIndex === index) ? yellow_dot : red_dot;
                if (props.selectedIndex === index) {

                }
                return (
                    <Marker
                        key={index}
                        position={item.location}
                        draggable={true}
                        icon={dot_color}
                        onClick={() => props.onClick(item, index)}
                        onRightClick={() => props.onRightClick(index)}
                    />
                )
            })
        }
    </>;
}

export default Markers;
