import axios from 'axios';
import {browserHistory} from 'react-router';

export function addCodeRemoteOrigin(code){	
	console.log('inside addCodeRemoteOrigin', code)
	//replace code with actual data from quandl 
	//make a single request to quandl
	return {
		type: 'ADD_CODE_REMOTE_ORIGIN',
		payload: code
	}
}

export function setNewCodes(codes){			
	//make a bulk request to quandl
	return {
		type: 'SET_NEW_CODES',
		payload: codes.map(entry=>entry.code)
	}
}


export function sendCodeRemote(code){
	console.log('inside addCode', code)
	return function(dispatch){
		dispatch({
			type: 'SEND_CODE_REMOTE',
			payload: code
		});
		dispatch(removeError());
	}			
}


export function setError(error){	
	console.log(error)
	return {
		type: 'SEND_ERROR',
		payload: error
	}
}

export function removeError(){	
	return {
		type: 'REMOVE_ERROR'		
	}
}

