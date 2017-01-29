import React, { Component } from 'react';
import Zones from '../containers/Zones';
import Comments from '../containers/Comments';

class Home extends Component {
    
    constructor() {
        super()
        
        this.state = {
            currentZone: "Zone 1"
        }
    }
    
    zoneClickHandler(zoneName) {
        this.setState({currentZone: zoneName});
    }
    
    render() {
        return (
            <div className='container'>
                <div className='col-sm-6'>
                    <Zones clickHandler={this.zoneClickHandler.bind(this)} />
                </div>
                <div className='col-sm-6'>
                    <Comments currentZone={this.state.currentZone}/>
                </div>
            </div>
        );
    }
}

export default Home;