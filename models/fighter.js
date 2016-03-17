var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FighterSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Fighter', FighterSchema);