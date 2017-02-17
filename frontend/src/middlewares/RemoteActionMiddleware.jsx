
export default socket => store => next => action => {
	if(action.type=='SEND_CODE_REMOTE'){		
		socket.emit('add_code', action.payload);
	}

	return next(action);
}