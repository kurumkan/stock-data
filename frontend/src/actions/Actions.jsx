export function addStockRemoteOrigin(stock){			
	return {
		type: 'ADD_STOCK_REMOTE_ORIGIN',	
		payload: stock
	}
}

export function setNewStocks(stocks){		
	return {
		type: 'SET_NEW_STOCKS',
		payload: stocks
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

