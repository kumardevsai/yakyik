import React, {Component} from 'react';
import Zone from '../presentations/Zone';
import ZoneAdd from '../presentations/ZoneAdd';
// helps with loading data from api
import { APIManager } from '../../utils';

class Zones extends Component {
    
    constructor() {
        super()
        
        this.state = {
            zone: {
                name: '',
                zipCodes: ''
            },
            
            zoneList: []
        }
    }
    
    componentDidMount() {
        
        APIManager.get('api/zone', null, (err, response) => {
            if (err) {
                alert('ERROR ZONE FIND: ' + err.message);
                return
            }
                
            this.setState({
                zoneList: response.results
            });
        })
    }
    
    // handles updates for both zone.name and zone.zipCodes
    updateZoneHandler(event) {
        let updatedZone = Object.assign({}, this.state.zone);
        updatedZone[event.target.id] = event.target.value;
        
        this.setState({
            zone: updatedZone
        });
    }
    
    submitHandler(event) {
        event.preventDefault();
        
        let newZone = this.state.zone;
        // zips is a string of zip codes
        let zips = newZone.zipCodes;
        let zipsArray = zips.split(',');
        
        // trim possible white space around the zip codes
        let newZips = [];
        zipsArray.forEach(function(zipCode) {
            newZips.push(zipCode.trim());
        });
        
        newZone.zipCodes = newZips;
        
        // save comment to mongo
        APIManager.post('/api/zone', newZone, (err, response) => {
            if (err) {
                console.log("ERROR ZONE POST: " + err.message, null);
                return
            }
            
            const result = response.result;
            
            console.log("SUCCESS: ZONE CREATED " +
                        JSON.stringify(result));
                        
            // set the state
            // result has been processed by the API, so the default
            // timestamp has been added to the object
            this.setState({
                zoneList: this.state.zoneList.concat(result)
            });
        });
    }
    
    render() {
        
        const listItems = this.state.zoneList.map((x, i) => {
            return (
                <li key= { i }
                    style={{listStyle: 'none'}}>
                    <Zone zonePropsObj={ x } 
                          clickHandler={() => this.props.clickHandler(x.name)} />
                </li>
            );
        });
        
        return (
            <div>
                <ZoneAdd submitHandler={this.submitHandler.bind(this)}
                         updateZoneHandler={this.updateZoneHandler.bind(this)} />
                <ul>
                    { listItems }
                </ul>
            </div>
        );
    }
}

export default Zones;