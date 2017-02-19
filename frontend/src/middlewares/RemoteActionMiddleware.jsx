export default socket => store => next => action => {

	switch(action.type){
		case 'SEND_CODE_REMOTE':
			socket.emit('add_code', action.payload);
		case 'REMOVE_CODE':		
			socket.emit('remove_code', action.payload);					
	}

	return next(action);
}