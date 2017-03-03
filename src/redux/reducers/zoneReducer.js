import constants from '../constants'

var initialState = {
    zoneList: [],
    selectedZone: null,
    appStatus: 'ready'
}

export default (state = initialState, action) => {

    let updated = Object.assign({}, state);
    switch (action.type) {

        case constants.ZONES_RECEIVED:
            updated['zoneList'] = action.zones;
            updated['appStatus'] = 'ready';
            // equivalent to running this.setState({zoneList: updated}) in react
            return updated 
        
        case constants.ZONE_CREATE:
            //console.log('ZONE_CREATE: ' + JSON.stringify(action.zone));
            let updatedList = Object.assign([], updated['zoneList']);
            updatedList.push(action.zone);
            updated['zoneList'] = updatedList;
            return updated;
        
        case constants.ZONE_SELECTED:
            console.log('ZONE_SELECTED: ' + JSON.stringify(action.selectedZone))
            updated.selectedZone = action.selectedZone;
            return updated;
        
        case constants.APPLICATION_STATE:
            updated['appStatus'] = action.status;
            return updated;

        default:
            return state
    }

}