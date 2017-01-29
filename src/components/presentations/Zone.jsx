import React from 'react';

import styles from './zone-styles';

const Zones = (props) => {
    
    let timestamp = props.zonePropsObj.timestamp;
    if (typeof timestamp == 'string') {
        timestamp = new Date(timestamp);
    }
    
    return(
        <div style={ styles.container }>
            <h2 style={ styles.header }>
                <a style={ styles.title } 
                   onClick={ props.clickHandler }
                   href="#">
                   { props.zonePropsObj.name }
                </a>
                <br/>
            </h2>
            <span>{ props.zonePropsObj.zipCodes }</span>
            <br />
            <span>{ timestamp.toDateString() }</span>
        </div>         
    );    
}

export default Zones;