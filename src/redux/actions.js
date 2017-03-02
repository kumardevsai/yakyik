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
    },

    currentUserReceived: (user) => {
        return {
            type: constants.CURRENT_USER_RECEIVED,
            user: user
        }
    },

    userReceived: (user) => {
        return {
            type: constants.USER_RECEIVED,
            user: user
        }
    }
}