import React from 'react';

import classes from './Icon.module.css';
// import clouds from './Clouds.svg';
// import rain from '../../assets/images/Rain.svg'

const icon = (props) => {
    return(
        <>
        <img 
            src={require(`./../../assets/images/${props.type}.svg`).default}
            alt={props.type}
            className={classes.Icon} />
            <span>hello</span>
        </>
    );
}

export default icon;
