module.exports = {	
	//handle internal errors
	handleError: function(response, error, type=''){
		console.log(error.stack);
		
		if(type=='QUANDL'){			
			response.status(400);
			response.json({error: "error: YELP api error"});						
		}
		else{
			response.status(500);
			response.json({error: "error: internal server error"});		
		}
	},	
	
	requestQuandl: function() {
		return null;
	}
}