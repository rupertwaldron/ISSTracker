import React from 'react'

import classes from './Card.module.css';

const card = (props) => {
    return(
        <div style={{backgroundColor: props.color}} className={classes.Card}>
            {props.children}
        </div>
    );
}

export default card;
