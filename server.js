// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://kyleludlow:Chiodos1432!@ds023098.mlab.com:23098/mma-node-project');

var Fighter = require('./models/fighter');


// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /fighters
//----------------------------------------------------------
router.route('/fighters')

    // create a fighter (accessed at POST http://localhost:8080/api/fighters
    .post(function(req, res) {

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
router.route('fighters/:fighter_id')

    // get the fighter with that id (accessed at GET http://localhost:8080/api/fighters/:fighter_id)
    .get(function(req, res) {
        Fighter.findById(req.params.fighter_id, function(err, fighter) {
            if (err)
                res.send(err);
            res.json(fighter);
        });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);