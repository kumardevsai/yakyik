var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '' 
    },
    password: {
        type: String,
        default:'' 
    },
    timestamp: {
        type: Date, 
        default: new Date()
    }
});

module.exports = mongoose.model('ProfileSchema', ProfileSchema);