import axios from 'axios';
import {browserHistory} from 'react-router';
import moment from 'moment';

export function addCodeRemoteOrigin(code){	
	return function(dispatch){		
		console.log('addCodeRemoteOrigin')
		
		var endDate = moment().format('YYYY-MM-DD');		
		var startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');		
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+code+'.json?start_date=' + startDate + '&end_date=' + endDate+'&column_index=4&api_key=Lvs5Ew9zxZa_m6FTLsSw';				
		return axios.get(url)
			.then(response=>{				
				var {data, name} = response.data.dataset;
				var code = response.data.dataset.dataset_code;				
				dispatch({
					type: 'ADD_CODE_REMOTE_ORIGIN',	
					payload: {data, name, code}
				})		
			})
			.catch(error=>{				
				dispatch(setError('Something went wrong. We are working on it.'));	
			});		
	}		
}

export function setNewCodes(codes){					
	return function(dispatch){
		var endDate = moment().format('YYYY-MM-DD');		
		var startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');			
		var calls = codes.map(codeObj=>{
			var url = `https://www.quandl.com/api/v3/datasets/WIKI/${codeObj.code}.json?start_date=${startDate}&end_date=${endDate}&column_index=4&api_key=Lvs5Ew9zxZa_m6FTLsSw`;			
			return axios.get(url);
		})		
		return axios.all(calls)
			.then(function (res) {
				var result = res.map((r)=>{
					return {
						name: r.data.dataset.name,
						code: r.data.dataset.dataset_code,
						data: r.data.dataset.data
					}	
				});				
				dispatch({
					type: 'SET_NEW_CODES',
					payload: result
				});
			})
			.catch((error)=>{				
				dispatch(setError('Something went wrong. We are working on it.'))
			});
	}
	return {
		type: 'SET_NEW_CODES',
		payload: codes.map(entry=>entry.code)
	}
}


export function sendCodeRemote(code){	
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

