var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    body: {
        type: String,
        default: '' 
    },
    timestamp: {
        type: Date, 
        default: new Date()
    },
    zone: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('CommentSchema', CommentSchema);