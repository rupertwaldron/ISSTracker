import React from 'react';

import classes from './Preview.module.css';

const preview = (props) => {
    return(
        <div>
            <img
                src={require('../../assets/images/Preview.svg').default}
                alt="Weather App Icon"
                className={classes.Preview} />
            <p>Temp: ºC</p>
            <p>Location:</p>
        </div>

    );
}

export default preview;
