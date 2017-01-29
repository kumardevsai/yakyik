import React, {Component} from 'react';
import Zone from '../presentations/Zone';
import ZoneAdd from '../presentations/ZoneAdd';
// helps with loading data from api
import superagent from 'superagent';

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
        
        superagent
            .get('/api/zone')
            .query(null)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    alert('ERROR: ' + err);
                    return
                }
                
                let results = response.body.results;
                
                this.setState({
                    zoneList: results
                })
                
            });
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
        newZone.timestamp = new Date();
        
        this.setState({
            zoneList: this.state.zoneList.concat(newZone)
        });
        
        // save zone to mongo
        superagent
            .post('/api/zone')
            .send(newZone)
            .set('Accept', 'application/json')
            .end((err, res) => {
               if (err) {
                   alert('ERROR: ZONE POST ' + err);
                   return
               } 
               console.log('SUCCESS: ZONE POST');
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