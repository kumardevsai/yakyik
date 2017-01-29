var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '' 
    },
    body: {
        type: String,
        default: '' 
    },
    timestamp: {
        type: Date, 
        default: new Date()
    },
    zoneID: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('CommentSchema', CommentSchema);