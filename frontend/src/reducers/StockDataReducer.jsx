export default function(state=[], action){	
	switch(action.type){
		
		case 'ADD_CODE_REMOTE_ORIGIN':
			return [...state, action.payload];			

		case 'SET_NEW_CODES':
			return action.payload;

		default:
			return state;	
	}
}