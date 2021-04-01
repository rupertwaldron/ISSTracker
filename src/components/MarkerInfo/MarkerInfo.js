import React from 'react';

import classes from './MarkerInfo.module.css';

const markerInfo = (props) => {
    return ( <>
        {
            props.selected.location && (<>
                    <img
                        src={require(`../../assets/images/${props.selected.weather.desc}.svg`).default}
                        alt="Weather App Icon"
                        className={classes.Preview}
                    />

                    <div className={classes.TempWrapper}>
                        {props.selected.weather.temp} ºC
                    </div>
                    <div className={classes.NameWrapper}>
                        {props.selected.name}
                    </div>

                </>
            )
        }
    </>
    )
}

export default markerInfo;
