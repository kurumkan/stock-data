var express = require("express");
var app = express();

var path =require("path");
var {requestQuandl} = require("./util_helpers.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stock-data");
var Stock = require('./models/stock');


var server = app.listen(process.env.PORT||8080, function(){
	console.log("Server started");
});


var io = require('socket.io').listen(server);
var clients = [];

io.on('connect', function(socket){
	//fetch all stock codes from db
	//send it to the new user(user will make api calls to the quandl)
	//socket.emit('foo', sequence++);
	clients.push(socket);
	Stock.find({}, function(error, stocks){
		if(error){
			console.log(error)
			socket.emit('set_error', 'Internal Server Error');
		}else{
			console.log('set_new_codes', stocks)
			socket.emit('set_new_codes', stocks);
		}
	})


	// When socket disconnects, remove it from the list:
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index>=0) {
            clients.splice(index, 1);
            console.log('Client gone (id=' + socket.id + ').');
        }
    });

	//we got new code from client
	socket.on('add_code', function(newCode){
		console.log('received new code', newCode)
		//we make test call to quandl - if code is not ok:
		//send error message to the author	

		requestQuandl({stockCode: newCode}, function(error, res, body){
			if(error){
				console.log(error)
				socket.emit('set_error', 'Internal Server Error');
			}else{
				body = JSON.parse(body);								
				if(body.quandl_error){					
					console.log('uqndle error')
					socket.emit('set_error', 'Incorrect or not existing stock code');
				}else{					
					//if ok:
					//we send that new code to everyone + add it to the db		
					Stock.create({code: newCode}, function(error, code){
						if(error){
							console.log(error)
							//if duplicate error - skip it
							if(error.code!='11000')
								socket.emit('set_error', 'Internal Server Error');																		
						}	
						else
							io.emit('spread_new_code', newCode);								
					})		
				}
			}
		});
	});
});

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

