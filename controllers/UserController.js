// the goal of the controllers is to make is as
// pure of a javascript file as possbile.  Besides require and
// module.exports it should no nothing about node, express, etc.

var User = require('../models/User');
var bcrypt = require('bcrypt');

module.exports = {
    
    find: function(params, callback) {
        
        User.find(params, function(err, users) {
            if (err) {
                callback(err, null)
                return
            }
            
            callback(null, users);
        })
    },
    
    findById: function(id, callback) {
        User.findById(id, function(err, user) {
            // check for error
            if (err) {
                callback(err, null);
                return
            }
            // if no error run callback
            callback(null, user);
        })
    },
    
    create: function(params, callback) {
        params.password = bcrypt.hashSync(params.password, 10);

        User.create(params, function(err, user) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, user);
        });
    },
    
    update: function(id, params, callback) {
        User.findByIdAndUpdate(id, params, {new: true}, function(err, user) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, user);
        });
    },
    
    destroy: function(id, callback) {
        User.findByIdAndRemove(id, function(err) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, null);
        })
    } 
    
};