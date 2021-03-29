import React from 'react';

import classes from './Preview.module.css';

const preview = (props) => {
    return (<>

                <img
                    src={require('../../assets/images/Preview.svg').default}
                    alt="Weather App Icon"
                    className={classes.Preview}/>

            <div className={classes.TempWrapper}>
                Temp: ºC
            </div>

        </>
        // <p>Location:</p>

    );
}

export default preview;
