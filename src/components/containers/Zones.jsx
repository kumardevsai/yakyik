import React, {Component} from 'react';
import Zone from '../presentations/Zone';
import ZoneCreate from '../presentations/ZoneCreate';
// helps with loading data from api
import { APIManager } from '../../utils';

class Zones extends Component {
    
    constructor() {
        super()
        
        this.state = {
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
    
    updateZoneList(zone) {
        
        // save zoneList state and save to mongo
        APIManager.post('/api/zone', zone, (err, response) => {
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
            let updatedZoneList = Object.assign([], this.state.zoneList);
            updatedZoneList.unshift(result);
            this.setState({
                zoneList: updatedZoneList
            });
        });
    }
    
    render() {
        
        const listItems = this.state.zoneList.map((x) => {
            return (
                <li key= { x._id }
                    style={{listStyle: 'none'}}>
                    <Zone zonePropsObj={ x } 
                          clickHandler={() => this.props.clickHandler(x.name)} />
                </li>
            );
        });
        
        return (
            <div>
                <ZoneCreate updateZoneList={this.updateZoneList.bind(this)} />
                <ul>
                    { listItems }
                </ul>
            </div>
        );
    }
}

export default Zones;