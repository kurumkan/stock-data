export function addStockRemoteOrigin(stock){			
	stock.color = generateColor(3);
	return {
		type: 'ADD_STOCK_REMOTE_ORIGIN',	
		payload: stock
	}
}

export function setNewStocks(stocks){		
	var newStocks = stocks.map(stock=>{
		stock.color = generateColor(3);
		return stock;
	});

	return {
		type: 'SET_NEW_STOCKS',
		payload: newStocks
	}
}

export function removeStock(code){		
	return {
		type: 'REMOVE_STOCK',
		payload: code
	}
}

export function sendStockRemote(code){		
	return function(dispatch){
		dispatch({
			type: 'SEND_STOCK_REMOTE',
			payload: code
		});
		dispatch(removeError());
	}			
}


export function setError(error){		
	return {
		type: 'SET_ERROR',
		payload: error
	}
}

export function removeError(){	
	return {
		type: 'REMOVE_ERROR'		
	}
}


function generateColor(brightness){
	// Six levels of brightness from 0 to 5, 0 being the darkest
	var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
}