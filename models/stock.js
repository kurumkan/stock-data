var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stockSchema = new Schema({
	code: {type:String, unique:true, lowercase: true, trim: true}	
});

module.exports = mongoose.model('stock', stockSchema);

 
