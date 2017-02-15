var express = require("express");
var app = express();
var path =require("path");
var mongoose = require("mongoose");

var {handleError, requestQuandl} = require("./util_helpers.js");

mongoose.connect("mongodb://localhost/stock-data");

var Spot = require('./models/spot');

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));

//index route
app.get("/api/stockdata", function(request, response){			
	requestQuandl('', function(error, res, body){
		if(error){
			handleError(response, error, 'YELP');
		}else{
			body = JSON.parse(body);						
			if(body.errors){
				var error = {
					stack: body.errors
				}
				handleError(response, error, 'QUANDL');
			}else{
				response.json({data: body.dataset.data})				
			}
		}
	});
});

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})