// the goal of the controllers is to make is as
// pure of a javascript file as possbile.  Besides require and
// module.exports it should no nothing about node, express, etc.

var Zone = require('../models/Zone');

module.exports = {
    
    find: function(params, callback) {
        // find is a mongoose function that was
        // atached to Zone when we defined it in
        // the Zone model
        Zone.find(params, function(err, zones) {
            if (err) {
                callback(err, null)
                return
            }
            // error is null so run function
            // on desired data `zones`
            callback(null, zones);
        })
    },
    
    findById: function(id, callback) {
        Zone.findById(id, function(err, zone) {
            // check for error
            if (err) {
                callback(err, null);
                return
            }
            // if no error run callback
            callback(null, zone);
        })
    },
    
    create: function(params, callback) {
        
        Zone.create(params, function(err, zone) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, zone);
        });
    },
    
    update: function(id, params, callback) {
        Zone.findByIdAndUpdate(id, params, {new: true}, function(err, zone) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, zone);
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