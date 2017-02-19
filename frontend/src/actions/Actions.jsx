export function addCodeRemoteOrigin(stock){			
	return {
		type: 'ADD_CODE_REMOTE_ORIGIN',	
		payload: stock
	}
}

export function setNewCodes(stocks){	
	console.log('setnewcodes', stocks)
	return {
		type: 'SET_NEW_CODES',
		payload: stocks
	}
}

export function removeCode(code){	
	console.log('removecode')
	return {
		type: 'REMOVE_CODE',
		payload: code
	}
}

export function sendCodeRemote(code){	
	console.log('sendcoderemote')
	return function(dispatch){
		dispatch({
			type: 'SEND_CODE_REMOTE',
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

