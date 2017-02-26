import React, { Component } from 'react';

import styles from './zone-styles';

class Zones extends Component {
    
    clickHandler(event) {
        event.preventDefault();
        this.props.zoneClickHandler(event.target.id);
    }

    render() {
        let timestamp = this.props.zonePropsObj.timestamp;
        if (typeof timestamp == 'string') {
            timestamp = new Date(timestamp);
        }
        
        const title = (this.props.isSelected) 
            ? (
                <a style={ styles.title } 
                    id={ this.props.zoneID }
                    onClick={ this.clickHandler.bind(this) }
                    href="#">
                    { this.props.zonePropsObj.name }
                </a>
              )
            : (
                <a onClick={ this.clickHandler.bind(this) }
                    id = { this.props.zoneID }
                    href="#">
                    { this.props.zonePropsObj.name }
                </a>
              );
        
        return(
            <div style={ styles.container }>
                <h2 style={ styles.header }>
                    { title }
                    <br/>
                </h2>
                <p>{ title }</p>
                <span>{ this.props.zonePropsObj.zipCodes }</span>
                <br />
                <span>{ timestamp.toDateString() }</span>
            </div>         
        );
    }    
}

export default Zones;