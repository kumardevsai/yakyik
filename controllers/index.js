var ZoneController = require('./ZoneController');
var CommentController = require('./CommentController');
var UserController = require('./UserController');
// key are named after resource
module.exports = {
    comment: CommentController,
    zone: ZoneController,
    user: UserController    
};