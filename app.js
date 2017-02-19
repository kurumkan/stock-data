var express = require("express");
var app = express();
var cors = require('cors');

var path =require("path");
var {requestQuandl, requestQuandlBulk} = require("./util_helpers.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stock-data");
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

var stocks=[];

function updateStocks(){
	Stock.find({}, function(error, codes){
		if(error){
			console.log(error)
		}else{		
			requestQuandlBulk(codes, function(error, result){			
				if(error){
					console.log(error)
				}else{				
					stocks = result.map((r)=>{
						return {
							name: r.data.dataset.name,
							code: r.data.dataset.dataset_code,
							data: r.data.dataset.data
						}	
					});							
				}
			});
		}
	});
}
updateStocks();

var CronJob = require('cron').CronJob;
new CronJob('0 0 0 * * *', function() {
	updateStocks();  	
}, null, true, 'America/New_York');


var io = require('socket.io').listen(server);
var clients = [];

io.on('connect', function(socket){	
	clients.push(socket);		
	socket.emit('set_new_codes', stocks);

	// When socket disconnects, remove it from the list:
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index>=0) {
            clients.splice(index, 1);            
        }
    });

	//we got new code from client
	socket.on('add_code', function(newCode){
		requestQuandl(newCode, function(error, result){
			if(error){					
				if(error.response&&error.response.status==404)
					socket.emit('set_error', 'Incorrect or not existing stock code');
				else
					socket.emit('set_error', 'Internal Server Error');
			}else{				
				Stock.create({code: newCode}, function(error, stock){
					if(error){					
					console.log('2',error)	
						//if duplicate error - skip it
						if(error.code!='11000')
							socket.emit('set_error', 'Internal Server Error');																		
					}else{							
						var newStock = {
							name: result.data.dataset.name,
							code: result.data.dataset.dataset_code,
							data: result.data.dataset.data
						}						
						stocks.push(newStock)
						io.emit('spread_new_code', newStock);	
					}
				})				
			}
		});
	});

	//we got new code from client
	socket.on('remove_code', function(code){
		console.log('removecode', code)
		clients.map(function(client){			
			console.log('*****out if')
			if(client!=socket){
				console.log('*****in if')
				client.emit('remove_code', code);
			}
		});	
		Stock.findOneAndRemove({code: code}, function(error, result){
			if(error){
				console.log('error',error)
				socket.emit('set_error', 'Internal Server Error');																		
			}else{				
				var index = stocks.map(x=>x.code).indexOf(code);
				console.log('success', index)
				if(index>-1)
					stocks.splice(index,1);
			}
		});		
	});
});



