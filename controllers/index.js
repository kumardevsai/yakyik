var ZoneController = require('./ZoneController');
var CommentController = require('./CommentController');
var ProfileController = require('./ProfileController');
// key are named after resource
module.exports = {
    comment: CommentController,
    zone: ZoneController,
    profile: ProfileController    
};