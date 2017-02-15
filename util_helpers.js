var request = require('request');  

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
	
	requestQuandl: function(parameters, callback) {
		var stockCode = 'AAPL';
		var startDate = '1997-05-01';
		var endDate = '1997-07-01';		
		var columnIndex = 4;		
		var params = 'start_date=' + startDate + '&end_date=' + endDate + '&column_index=' + columnIndex + '&api_key=' + process.env.API_KEY;		
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
		var apiURL = url + stockCode + '.json?' + params;		
		
		console.log(apiURL)		
		request(apiURL, function(error, response, body){
			return callback(error, response, body);	
		});		
	}
}