import React, {Component} from 'react';
import Zone from '../presentations/Zone';
import ZoneCreate from '../presentations/ZoneCreate';
// helps with loading data from api
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
//import store from '../../redux/store'

class Zones extends Component {
    
    componentDidMount() {
        this.props.fetchZones(null);
    }
    
    updateZoneList(zone) {
        // save zoneList state and save to mongo
        APIManager.post('/api/zone', zone, (err, response) => {
            if (err) {
                console.log("ERROR ZONE POST: " + err.message, null);
                return;
            }
            // result has been processed by the API, so the default
            // timestamp has been added to the object
            const zone = response.result;

            this.props.zoneCreate(zone);           
        });
    }

    zoneClickHandler(zoneID) {
        this.props.zoneSelected(zoneID);
    }

    render() {

        const listItems = this.props.zoneList.map((x) => {
            let selected = (x._id == this.props.selectedZone);
            return (
                <li key= { x._id }
                    style={{listStyle: 'none'}}>
                    <Zone zonePropsObj={ x }
                          isSelected={ selected }
                          zoneID = { x._id } 
                          zoneClickHandler={ this.zoneClickHandler.bind(this) } />
                </li>
            );
        });
        
        let content = null;
        if (this.props.appStatus == 'loading') {
            content = <h3>LOADING...</h3>;
        } else if (this.props.appStatus == 'ready') {
            content = <div>
                <ZoneCreate updateZoneList={this.updateZoneList.bind(this)} />
                <ul>
                    { listItems }
                </ul>
            </div>
        }

        return content;
    }
}

const stateToProps = (state) => {
    return {
        zoneList: state.zone.zoneList,
        selectedZone: state.zone.selectedZone,
        appStatus: state.zone.appStatus
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchZones: (params) => dispatch(actions.fetchZones(params)),
        // moved into redux with fetchZones
        //zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
        zoneCreate: (zone) => dispatch(actions.zoneCreate(zone)),
        zoneSelected: (zoneIndex) => dispatch(actions.zoneSelected(zoneIndex))
    }
}

export default connect(stateToProps, dispatchToProps)(Zones);