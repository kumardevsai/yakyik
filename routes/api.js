var express = require('express');
var router = express.Router();
// index is default file if no file specified
var controllers = require('../controllers');

// return array of all zones or comments
router.get('/:resource', function(req, res, next) {
    
    var resource = req.params.resource;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    controller.find(req.query, function(err, results) {
        if (err) {
            // always want to keep communication with the 
            // browser (e.g. req, res) in the routes
            // send callback to controller
            res.json({
                confirmation: 'fail',
                message: err
            });
                
            return
        }
        
        // if no error we return the successful mongoose query
        res.json({
            confirmation: 'success',
            results: results
        });
    });  
});


// return single zone or comment
router.get('/:resource/:id', function(req, res, next) {
    
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    // result is the payload
    controller.findById(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'Not Found'
            })
            return
        }
            
        res.json({
            confirmation: 'success',
            result: result
        });
    });
    
});

// add a new zone or comment to database
router.post('/:resource', function(req, res, next) {

    var resource = req.params.resource;
    var controller = controllers[resource];    
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    controller.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'error',
                message: err                    
            });
            return
        }
            
        res.json({
            confirmation: 'success',
            result: result
        });
    });
});

// delete a zone or comment to database
router.delete('/:resource/:id', function(req, res, next) {
    
    var resource = req.params.resource;
    var id = req.params.id;
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource Request: ' + resource
        });
        return
    }
    
    // result is the payload
    controller.destroy(id, function(err) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: 'Not Found'
            })
            return
        }
            
        res.json({
            confirmation: 'success',
            id: id
        });
    });
    
});

module.exports = router;