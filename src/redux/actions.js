import constants from './constants';

export default {

    zonesReceived: (zones) => {
        return {
            type: constants.ZONES_RECEIVED,
            zones: zones
        }
    },

    zoneCreate: (zone) => {
        return {
            type: constants.ZONE_CREATE,
            zone: zone
        }
    },

    zoneSelected: (zoneID) => {
        return {
            type: constants.ZONE_SELECTED,
            selectedZone: zoneID
        }
    }
}