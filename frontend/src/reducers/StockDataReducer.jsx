export default function(state=[], action){	
	switch(action.type){
		
		case 'ADD_CODE_REMOTE_ORIGIN':
			return [...state, action.payload];			

		case 'SET_NEW_CODES':
			return action.payload;

		case 'REMOVE_CODE':
			var index = state.map(x=>x.code).indexOf(action.payload);
			if(index>=0){				
				return [
					...state.slice(0, index),
	    			...state.slice(index + 1)
				]		
			}	
	}
	return state;	
}