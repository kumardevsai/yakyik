var zoneController = require('./ZoneController');
var CommentController = require('./CommentController');
// key are named after resource
module.exports = {
    comment: CommentController,
    zone: zoneController    
};