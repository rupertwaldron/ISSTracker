import React, { useState } from 'react'

const Location = props => {
    const [name, setName] = useState("Rupert");

    const biteMe = () => {
        setName("Bite Me!")
    }

    return <div>
        <p>The location is... <span>{props.lat} </span> {name} </p>
        <button onClick={biteMe}>Bite Me</button>
    </div>
}

export default Location;
