var express    = require('express');
var Fighter = require('../models/fighter');

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});




// more routes for our API will happen here

// on routes that end in /fighters
//----------------------------------------------------------
router.route('/')

    // create a fighter (accessed at POST http://localhost:8080/api/fighters
    .post(function(req, res) {
        console.log('test');
        var fighter = new Fighter();    // create a new instance of the Fighter model
        fighter.name = req.body.name;   // set the fighters name (comes from request)

        // save the fighter and check for errors
        fighter.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Fighter created!' });
        });
    })

    // get all the fighters (accessed at GET http://localhost:8080/api/fighters)
    .get(function(req, res) {
        Fighter.find(function(err, fighters) {
            if (err)
                res.send(err);

            res.json(fighters);
        });
    });

// on routes that end in /fighters/:fighter_id
//----------------------------------------------------------
router.route('/:fighter_id')

    // get the fighter with that id (accessed at GET http://localhost:8080/api/fighters/:fighter_id)
    .get(function(req, res) {
        console.log('Fighter ID route');
        console.log(req.params.fighter_id);
        Fighter.findById(req.params.fighter_id, function(err, fighter) {
            if (err)
                res.send(err);
            res.json(fighter);
        });
    })

    //update the fighter with this id
    .put(function(req,res) {

    // use our Fighter model to find the fighter we want
        Fighter.findById(req.params.fighter_id, function(err, fighter) {
            if (err)
                res.send(err);

            fighter.name = req.body.name;   //update fighter info

            //save info
            fighter.save(function(err) {
                if (err)
                res.send(err);


                res.json({ message: 'Fighter updated!'});
            });
        });
    })

// delete the fighter with this id
    .delete(function(req, res) {
        Fighter.remove({
            _id: req.params.fighter_id
        }, function(err, fighter) {
            if(err)
                res.send(err);

            res.json({ message: 'Successfully deleted fighter.'});
        });
    });

// on routes that end in /fighters/:name
//----------------------------------------------------------
router.route('/name/:name')

    .get(function(req, res) {
        console.log('Fighter name route');
        console.log(req.params.name);
    });

module.exports = router;