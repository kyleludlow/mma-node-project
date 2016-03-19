// BASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://kyleludlow:Chiodos1432!@ds023098.mlab.com:23098/mma-node-project');




// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fighterRoutes = require('./routes/fighters');
var trainerRoutes = require('./routes/trainers');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/fighters', fighterRoutes);
app.use('/api/trainers', trainerRoutes);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port '  + port);