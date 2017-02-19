var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockSchema = new Schema({
	code: {type: String, unique:true, uppercase: true, trim: true},
	name: {type: String},
	data: [[{type: String}]]	
});

module.exports = mongoose.model('stock', stockSchema);

 
