// the goal of the controllers is to make is as
// pure of a javascript file as possbile.  Besides require and
// module.exports it should no nothing about node, express, etc.

var Comment = require('../models/Comment');

module.exports = {
    
    find: function(params, callback) {
        
        Comment.find(params, function(err, comments) {
            if (err) {
                callback(err, null)
                return
            }
            // error is null so run function
            // on desired data `zones`
            callback(null, comments);
        })
    },
    
    findById: function(id, callback) {
        Comment.findById(id, function(err, comment) {
            // check for error
            if (err) {
                callback(err, null);
                return
            }
            // if no error run callback
            callback(null, comment);
        })
    },
    
    create: function(params, callback) {
        
        
        Comment.create(params, function(err, comment) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, comment);
        });
    },
    
    update: function(id, params, callback) {
        Comment.findByIdAndUpdate(id, params, {new: true}, function(err, comment) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, comment);
        });
    },
    
    destroy: function(id, callback) {
        Comment.findByIdAndRemove(id, function(err) {
            if (err) {
                callback(err, null);
                return
            }
            
            callback(null, null);
        })
    } 
    
};