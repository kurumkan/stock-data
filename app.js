var express = require("express");
var app = express();
var cors = require('cors');
require('dotenv').config()

var path =require("path");
var {requestQuandl, requestQuandlBulk} = require("./util_helpers.js");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI);
var Stock = require('./models/stock');

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(cors());

app.use(express.static(__dirname + '/frontend/public'));

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

var server = app.listen(process.env.PORT||8080, function(){
	console.log("Server started");
});

function updateStocks(){
	Stock.find({}, function(error, stocks){
		if(error){
			console.log(error)
		}else{		
			var codes = stocks.map(stock=>stock.code)			
			requestQuandlBulk(codes, function(error, result){			
				if(error){
					console.log('************requestBulk')
					console.log(error)
				}else{			
					var newStocks = result.map((r)=>{
						return {
							name: r.data.dataset.name,
							code: r.data.dataset.dataset_code,
							data: r.data.dataset.data
						}	
					});	
					Stock.remove({}, (error, removeResult)=>{
						if(error)console.log(error);
						else{
							Stock.create(newStocks, (error, createResutl)=>{
								if(error)console.log(error);
								else console.log('Stocks have been updated');
							})						
						}		
					});	
					
					
				}
			});
		}
	});
}
updateStocks();

var CronJob = require('cron').CronJob;
//every midnight new york time
new CronJob('0 0 0 * * *', function() {
	updateStocks();  	
}, null, true, 'America/New_York');


var io = require('socket.io').listen(server);
var clients = [];

io.on('connect', function(socket){	
	clients.push(socket);		
	Stock.find({}, (error, stocks)=>{
		if(error){
			console.log(error);
			socket.emit('set_error', 'Internal Server Error');
		}
		else	
			socket.emit('set_new_stocks', stocks);	
	});

	// When socket disconnects, remove it from the list:
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index>=0) {
            clients.splice(index, 1);            
        }
    });

	//we got new code from client
	socket.on('add_stock', function(newCode){
		requestQuandl(newCode, function(error, result){
			if(error){					
				console.log(error);
				if(error.response&&error.response.status==404)
					socket.emit('set_error', 'Incorrect or not existing stock code');
				else{						
					socket.emit('set_error', 'Internal Server Error');
				}
			}else{				
				var newStock = {
					name: result.data.dataset.name,
					code: result.data.dataset.dataset_code,
					data: result.data.dataset.data
				}				
				Stock.create(newStock, function(error, stock){
					if(error){
						console.log(error)						
						//if duplicate error - skip it
						if(error.code!='11000')
							socket.emit('set_error', 'Internal Server Error');																		
					}else{																			
						io.emit('spread_new_stock', newStock);	
					}
				})				
			}
		});
	});

	//we got new code from client
	socket.on('remove_stock', function(code){			
		clients.map(function(client){												
			if(client.id!=socket.id)							
				client.emit('remove_stock_remote', code);			
		});			
		Stock.findOneAndRemove({code: code}, function(error, result){
			if(error){				
				console.log(error);
				socket.emit('set_error', 'Internal Server Error');																		
			}else{				
				console.log('stock <'+code+'> has been removed')
			}
		});		
	});
});



