var express    = require('express');
var Trainer = require('../models/trainer');

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});




// more routes for our API will happen here

// on routes that end in /trainers
//----------------------------------------------------------
router.route('/')

    // create a trainer (accessed at POST http://localhost:8080/api/trainers
    .post(function(req, res) {
        console.log('test');
        var trainer = new Trainer();    // create a new instance of the trainer model
        trainer.name = req.body.name;   // set the trainers name (comes from request)

        // save the trainer and check for errors
        trainer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Trainer created!' });
        });
    })

    // get all the trainers (accessed at GET http://localhost:8080/api/trainers)
    .get(function(req, res) {
        Trainer.find(function(err, trainers) {
            if (err)
                res.send(err);

            res.json(trainers);
        });
    });

// on routes that end in /trainers/:trainer_id
//----------------------------------------------------------
router.route('/:trainer_id')

    // get the trainer with that id (accessed at GET http://localhost:8080/api/trainers/:trainer_id)
    .get(function(req, res) {
        console.log('Trainer ID route');
        console.log(req.params.trainer_id);
        Trainer.findById(req.params.trainer_id, function(err, trainer) {
            if (err)
                res.send(err);
            res.json(trainer);
        });
    })

    //update the trainer with this id
    .put(function(req,res) {

        // use our trainer model to find the trainer we want
        Trainer.findById(req.params.trainer_id, function(err, trainer) {
            if (err)
                res.send(err);

            trainer.name = req.body.name;   //update trainer info

            //save info
            trainer.save(function(err) {
                if (err)
                    res.send(err);


                res.json({ message: 'trainer updated!'});
            });
        });
    })

    // delete the trainer with this id
    .delete(function(req, res) {
        Trainer.remove({
            _id: req.params.trainer_id
        }, function(err, trainer) {
            if(err)
                res.send(err);

            res.json({ message: 'Successfully deleted trainer.'});
        });
    });

// on routes that end in /trainers/:name
//----------------------------------------------------------
router.route('/name/:name')

    .get(function(req, res) {
        console.log('Trainer name route');
        console.log(req.params.name);
    });

module.exports = router;