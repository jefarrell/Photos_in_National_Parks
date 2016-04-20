var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
	name: String,
	val: Number,
	date: { type: Date, default: Date.now},
});

module.exports = mongoose.model('test', testSchema);