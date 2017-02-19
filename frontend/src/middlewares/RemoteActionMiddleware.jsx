export default socket => store => next => action => {

	switch(action.type){
		case 'SEND_CODE_REMOTE':
			socket.emit('add_code', action.payload);
			break;
		case 'REMOVE_CODE':				
			socket.emit('remove_code', action.payload);					
			break;
	}

	return next(action);
}