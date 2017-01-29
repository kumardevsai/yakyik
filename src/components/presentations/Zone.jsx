import React from 'react';

import styles from './zone-styles';

const Zones = (props) => {
    
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
            <span>{ props.zonePropsObj.zipCodes }</span><br />
            <span>{ props.zonePropsObj.timestamp }</span>
        </div>         
    );    
}

export default Zones;