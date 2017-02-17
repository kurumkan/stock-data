var request = require('request');  
var moment = require('moment');

module.exports = {		
	requestQuandl: function(parameters, callback) {
		var stockCode = parameters.stockCode;		
		var columnIndex = 4;		
		var API_KEY = 'Lvs5Ew9zxZa_m6FTLsSw';
		var endDate = moment().format('YYYY-MM-DD');		
		var startDate = moment().subtract(2, 'day').format('YYYY-MM-DD');		
		
		var params = 'column_index=' + columnIndex + '&api_key=' + API_KEY + '&start_date='+startDate+'&end_date='+endDate;		
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
		var apiURL = url + stockCode + '.json?' + params;		
				
		request(apiURL, function(error, response, body){
			return callback(error, response, body);	
		});		
	}
}


