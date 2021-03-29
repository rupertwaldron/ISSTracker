import React from 'react';

import classes from './WeatherDetails.module.css';
import Icon from '../../elements/Icon/Icon';
import Temperature from './Temperature/Temperature';
import Description from './Description/Description';
import Date from './Date/Date';

const weatherDetails = (props) => {
    return <>
    {
        props.selected.location && (
            <div className={classes.WeatherDetailsWrapper}>
                <div className={classes.WeatherIconWrapper}>
                    <Icon type={props.selected.weather.desc}/>
                </div>
                <div className={classes.WeatherDataWrapper}>
                    <Temperature degrees={props.selected.weather.temp}/>
                    <Description type={props.selected.name}/>
                    <Date/>
                </div>
            </div>
        )
    }
    </>
}

export default weatherDetails;
