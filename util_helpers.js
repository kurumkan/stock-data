var axios = require('axios');
var moment = require('moment');

module.exports = {		
	requestQuandl: function(stockCode, callback) {						
		var endDate = moment().format('YYYY-MM-DD');		
		var startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');	
		
		var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?start_date=${startDate}&end_date=${endDate}&column_index=4&api_key=Lvs5Ew9zxZa_m6FTLsSw`;					
		axios.get(url)
			.then(function(result){
				callback(null, result)
			})
			.catch(function(error){
				callback(error, null)
			})
	},

	requestQuandlBulk: function(codes, callback) {
		var endDate = moment().format('YYYY-MM-DD');		
		var startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');	

		var calls = codes.map(codeObj=>{
			var url = `https://www.quandl.com/api/v3/datasets/WIKI/${codeObj.code}.json?start_date=${startDate}&end_date=${endDate}&column_index=4&api_key=Lvs5Ew9zxZa_m6FTLsSw`;			
			return axios.get(url);
		});						

		axios.all(calls)
		.then(function(result){
			callback(null,result)	
		})
		.catch(function(error){
			callback(error, null)	
		});
	}
}


