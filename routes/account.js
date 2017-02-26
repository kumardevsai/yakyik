var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var bcrypt = require('bcrypt');

router.get('/:action', function(req, res, next) {

    var action = req.params.action;    
    
    if (action == 'logout') {
        req.session.reset();
        res.json({
            confirmation: 'success',
            message: 'Bye!'
        })
    }

    if (action == 'currentuser') {
        
        if (req.session == null) {
            res.json({
                confirmation: 'fail',
                message: 'User not logged in'
            });
            return;
        }
        // if there are sessions other than user
        // e.g. session for a shopping cart
        if (req.session.user == null) {
            res.json({
                confirmation: 'fail',
                message: 'User not logged in'
            })
            return;
        }

        ProfileController.findById(req.session.user, function(err, result) {
            if (err) {
                res.json({
                    confirmation: 'fail',
                    message: err
                });

                return;
            }

            res.json({
                confirmation: 'success',
                user: result 
            });
        })

        
    }
});

router.post('/:action', function(req, res, next) {

    var action = req.params.action;    
    
    // registers a new profile and logs the user in
    if (action == 'profile') {
        ProfileController.create(req.body, function(err, result) {
            if (err) {
                res.json({
                    confirmation: 'fail',
                    message: err.message
                });
                return;
            }
            // logs into session after registering
            req.session.user = result._id;

            res.json({
                confirmation: 'success',
                user: result
            });
        })
    }

    if (action == 'login') {
        var params = {username: req.body.username}; 
        ProfileController.find(params, function(err, results) {
            if (err) {
                console.log('ERR: ' + err);
                res.json({
                    confirmation: 'FAIL',
                    message: err.message
                });
                return;
            }

            // check that username exists
            if (results.length === 0) {
                console.log('ERR: username not found');
                res.json({
                    confirmation: 'FAIL',
                    message: 'username not found'
                });
                return;
            }

            // grab the user
            // TODO: add check that this is unique username
            var profile = results[0];
        
            // check password
            var isPasswordCorrect = bcrypt.compareSync(
                req.body.password, 
                profile.password);
            
            // track id in session to track logged in user
            req.session.user = profile._id

            if (!isPasswordCorrect) {
                console.log('ERR: incorect password');
                res.json({
                    confirmation: 'fail',
                    message: 'incorrect password'
                });
                return;
            }


            res.json({
                confirmation: 'success',
                profile: profile
            });
        });
    }

    

});

module.exports = router;