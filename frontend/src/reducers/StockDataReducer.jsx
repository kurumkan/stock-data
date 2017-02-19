export default function(state=[], action){	
	switch(action.type){
		
		case 'ADD_STOCK_REMOTE_ORIGIN':
			return [...state, action.payload];			

		case 'SET_NEW_STOCKS':
			return action.payload;

		case 'REMOVE_STOCK':
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