import constants from './constants';
import APIManager from '../utils/APIManager';

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
    },

    fetchZones: (params) => {
        return (dispatch) => {
            
            dispatch({
                type: constants.APPLICATION_STATE,
                status: 'loading'
            })
            
            APIManager.get('/api/zone', params, (err, response) => {
                if (err) {
                    alert('ERROR ZONE FIND: ' + err.message);
                    return
                }

                const zones = response.results;
                dispatch({
                    type: constants.ZONES_RECEIVED,
                    zones: zones
                })
                //setTimeout(() => {
                //    dispatch({
                //        type: constants.ZONES_RECEIVED,
                //        zones: zones
                //    })
                //}, 3000)
            })
        }
    },

    updateUser: (id, updatedUser) => {
        return (dispatch) => {
            
            const endpoint = '/account/user/' + id;
            
            APIManager.put(endpoint, updatedUser, (err, response) => {
                if (err) {
                    alert('ERROR USER PROFILE UPDATE: ' + err.message);
                    return;
                }

                const updatedUser = response.user;
                dispatch({
                    type: constants.USER_PROFILE_UPDATED,
                    user: updatedUser
                })

                //console.log('Profile Updates: ' + JSON.stringify(response));
            })
        }
    }
}