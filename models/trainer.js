var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrainerSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Trainer', TrainerSchema);