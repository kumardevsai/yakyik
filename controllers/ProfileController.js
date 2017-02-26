// the goal of the controllers is to make is as
// pure of a javascript file as possbile.  Besides require and
// module.exports it should no nothing about node, express, etc.

var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');

module.exports = {
    
    find: function(params, callback) {
        
        Profile.find(params, function(err, profiles) {
            if (err) {
                callback(err, null)
                return
            }
            
            callback(null, profiles);
        })
    },
    
    findById: function(id, callback) {
        Profile.findById(id, function(err, profile) {
            // check for error
            if (err) {
                callback(err, null);
                return
            }
            // if no error run callback
            callback(null, profile);
        })
    },
    
    create: function(params, callback) {
        params.password = bcrypt.hashSync(params.password, 10);

        Profile.create(params, function(err, profile) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, profile);
        });
    },
    
    update: function(id, params, callback) {
        Profile.findByIdAndUpdate(id, params, {new: true}, function(err, profile) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, profile);
        });
    },
    
    destroy: function(id, callback) {
        Zone.findByIdAndRemove(id, function(err) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, null);
        })
    } 
    
};