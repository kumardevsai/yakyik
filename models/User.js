var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '' 
    },
    password: {
        type: String,
        default:'' 
    },
    gender: {
        type: String,
        default:'' 
    },
    city: {
        type: String,
        default:'' 
    },
    image: {
        type: String,
        default:''
    },
    timestamp: {
        type: Date, 
        default: new Date()
    }
});

module.exports = mongoose.model('UserSchema', UserSchema);