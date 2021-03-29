import React from 'react';

import classes from './Preview.module.css';

const preview = (props) => {
    return(
        <div>
            <p>This is the weather</p>
            <img
                src={require('../../assets/images/Preview.svg').default}
                alt="Weather App Icon"
                className={classes.Preview} />
        </div>

    );
}

export default preview;
