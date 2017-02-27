import {generateColor} from 'gen-random-colors'

export function addStockRemote(stock){			
	stock.color = generateColor(3);
	return {
		type: 'ADD_STOCK_REMOTE',	
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

export function removeStockRemote(code){
	return {
		type: 'REMOVE_STOCK_REMOTE',
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

