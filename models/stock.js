var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockSchema = new Schema({
	code: {type:String}	
});

module.exports = mongoose.model('stock', stockSchema);

 
